const sharp = require('sharp')
const fse = require('fs-extra')

class Image {
	constructor (filename) {
		this.image = sharp(filename)
		this.meta = {}

		this.bayer_8x8 = this.bayer_8x8.bind(this)
		this.dither = this.dither.bind(this)
		this.resize = this.resize.bind(this)
		this.save = this.save.bind(this)
	}

	bayer_8x8 (data) {
		const clamp = val => (val < 0 ? 0 : val > 255 ? 255 : val)

		// via http://devlog-martinsh.blogspot.com/2011/03/glsl-8x8-bayer-matrix-dithering.html
		const pattern = [
			[0,  32, 8,  40, 2,  34, 10, 42],   /* 8x8 Bayer ordered dithering  */
			[48, 16, 56, 24, 50, 18, 58, 26],   /* pattern.  Each input pixel   */
			[12, 44, 4,  36, 14, 46, 6,  38],   /* is scaled to the 0..63 range */
			[60, 28, 52, 20, 62, 30, 54, 22],   /* before looking in this table */
			[3,  35, 11, 43, 1,  33, 9,  41],   /* to determine the action.     */
			[51, 19, 59, 27, 49, 17, 57, 25],
			[15, 47, 7,  39, 13, 45, 5,  37],
			[63, 31, 55, 23, 61, 29, 53, 21]
		]

		// performs pattern lookup
		const filter = (x, y, c0) => {
			// dithers to 100% black or white
			if (clamp(c0 + pattern[x % 8][y % 8]) > 127) {
				return 255
			} else return 0
		}

		// given Sharp data object with width, height and raw-formatted uint8 buffer
		for (let y = 0; y < data.height; y++) {
			for (let x = 0; x < data.width; x++) {
				let index = x + y * data.width // get position in 1d buffer array
				data.buffer[index] = filter(x, y, data.buffer[index])
			}
		}

		return data.buffer
	}

	async dither () {
		await this.image
			.normalise()
			.toColourspace('b-w')
			.metadata((err, metadata) => {
				if (err) console.log(err)
				else this.meta = metadata
			})
			.raw()
			.toBuffer()
			.then(async buffer => {
				this.image = await sharp(new Buffer.from(this.bayer_8x8({ ...this.meta, buffer })), {
					raw: {
						width: this.meta.width,
						height: this.meta.height,
						channels: 1,
					}
				})
			})
	}

	async resize () {
		// broken, on('info') event does not fire, nor does this
		await this.image
			.resize(2048, 2048, { fit: sharp.fit.inside, withoutEnlargement: true })
			.toBuffer({ resolveWithObject: true })
			.then(({ info }) => {
				this.meta = { ...this.meta, ...info }
				return this.image
			})
	}

	async save ({ name, dir, subfolder = ''}) {
		fse.ensureDirSync(`${dir}/assets/`)
		await this.image.png().toBuffer().then(data => {
			fse.writeFile(`${dir}/assets/${subfolder + '/'}dither-${name}.png`, data)
		})
	}
}

module.exports = Image
