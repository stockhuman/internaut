import sharp from 'sharp'
import fs from 'fs-extra'

class Image {
  constructor(filename, options = {}) {
    this.image = sharp(filename)
    this.width = options.width || 2048
    this.height = options.height || 2048
  }

  bayer_8x8(data) {
    const clamp = val => (val < 0 ? 0 : val > 255 ? 255 : val)

    // via http://devlog-martinsh.blogspot.com/2011/03/glsl-8x8-bayer-matrix-dithering.html
    const pattern = [
      [0, 32, 8, 40, 2, 34, 10, 42] /* 8x8 Bayer ordered dithering  */,
      [48, 16, 56, 24, 50, 18, 58, 26] /* pattern.  Each input pixel   */,
      [12, 44, 4, 36, 14, 46, 6, 38] /* is scaled to the 0..63 range */,
      [60, 28, 52, 20, 62, 30, 54, 22] /* before looking in this table */,
      [3, 35, 11, 43, 1, 33, 9, 41] /* to determine the action.     */,
      [51, 19, 59, 27, 49, 17, 57, 25],
      [15, 47, 7, 39, 13, 45, 5, 37],
      [63, 31, 55, 23, 61, 29, 53, 21],
    ]

    // performs pattern lookup
    const filter = (x, y, c0) => {
      // dithers to 100% black or white
      if (clamp(c0 + pattern[x % 8][y % 8]) > 127) {
        return 255
      } else return 0
    }

    // given Sharp data object with width, height and raw-formatted uint8 buffer
    for (let y = 0; y < data.info.height; y++) {
      for (let x = 0; x < data.info.width; x++) {
        let index = x + y * data.info.width // get position in 1d buffer array
        data.data[index] = filter(x, y, data.data[index])
      }
    }

    return data.data
  }

  async dither() {
    await this.image
      .normalise()
      .toColourspace('b-w')
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(async buffer => {
        this.image = await sharp(new Buffer.from(this.bayer_8x8(buffer)), {
          raw: {
            width: buffer.info.width,
            height: buffer.info.height,
            channels: 1,
          },
        })
      })
  }

  async resize() {
    await this.image
      .resize(this.width, this.height, { fit: sharp.fit.inside, withoutEnlargement: true })
      .toBuffer({ resolveWithObject: true })
      .then(({ info }) => {
        return this.image
      })
  }

  async save({ name, dir, subfolder = '' }) {
    fs.ensureDirSync(`${dir}/assets/`)
    await this.image
      .png()
      .toBuffer()
      .then(data => {
        fs.writeFile(`${dir}/assets/${subfolder + '/'}dither-${name}.png`, data)
      })
  }
}

export default Image
