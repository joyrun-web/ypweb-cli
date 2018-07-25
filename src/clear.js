/**
 * clear downloaded templates
 */
import { exists, readdir } from 'mz/fs'
import rmfr from 'rmfr'
import inquirer from 'inquirer'
import loading from './utils/loading'
import { dirs } from './utils/defs'
import logger from './utils/logger'

async function apply () {
  if (!await exists(dirs.download)) {
    logger.error(`There is no ${dirs.download}, Please install a template`)
  }

  const list = await readdir(dirs.download)

  if (list.length === 0) {
    logger.error(`There is no any template in your local folder ${dirs.download}, install it`)
  }

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to remove all installed templates?',
      choices: list
    }
  ])

  if (answers.confirm) {
    const loader = loading('removing')
    list.forEach(async dir => await rmfr(`${dirs.download}/${dir}`))
    loader.succeed('removed all')
  }
}

export default apply
