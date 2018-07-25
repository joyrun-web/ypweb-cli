import { resolve } from 'path'
import { version } from './utils/defs'
import { checkNodeVersion } from './utils/check'
import { betterRequire } from './utils/common'
import chalk from 'chalk'

if (!checkNodeVersion()) {
  throw new Error(`Node version is invalid. Please use Node ${versions.nodeEngines} `)
}

async function apply (command, ...args) {
  try {
    await betterRequire(resolve(__dirname, `./${command}`))(...args)
  } catch (e) {
    console.log(chalk.red(e))
  }
}

export default apply;
