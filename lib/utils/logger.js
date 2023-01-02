import chalk from 'chalk'

export function info(message) {
  console.log(chalk.gray(`[naut] ${message}`))
}
export function success(message) {
  console.log(chalk.gray`[naut] ` + chalk.green`${message}`)
}
export function error(message) {
  console.log(chalk.gray`[naut] ` + chalk.red(message))
}
export function time(subject, start) {
  const timeDiff = process.hrtime(start)
  const duration = Math.floor(timeDiff[0] * 1000 + timeDiff[1] / 1e6)
  console.log(chalk.gray('[naut] ') + chalk.green(`${subject} in ${duration}ms.`))
}

export default {
  info,
  success,
  error,
  time,
}
