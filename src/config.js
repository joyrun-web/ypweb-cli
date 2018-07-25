/**
 * command config
 * ypweb config               // init confg or get default config
 * ypweb config remove <key>  // set key map value null
 * ypweb config get <key>     // get key map value
 */

import rc from './utils/rc'
import chalk from 'chalk'
import inquirer from 'inquirer'

async function apply (action, k, v) {
  let config

  switch (action) {
    case 'get':
      config = await rc(k)
      if (!k) {
        Object.keys(config).forEach(key => console.log(`${chalk.green(key)}=${chalk.yellow(config[key])}`))
      } else {
        console.log(chalk.yellow(config))
      }
      break;
    case 'remove':
      if (k) {
        await rc(k, v, true)
      } else {
        // remove config file
        let answer = await inquirer.prompt([
          {
            type    : 'confirm',
            name    : 'ok',
            message : 'Do you want to remove config file?',
          }
        ])
        if (answer.ok) {
          await rc(k, v, true)
        }
      }
      break;
    case 'set':
      await rc(k, v)
      return true
    case 'list':
      config = await rc()
      Object.keys(config).forEach(key => console.log(`${chalk.green(key)}=${chalk.yellow(config[key])}`))
      break
    default:
      // new config
      await rc()
  }
}

export default apply
