import program from 'commander'
import ypweb from './index'
import { version } from '../package.json'
import { dirs, alias } from './utils/defs'
import rc from './utils/rc'
import inquirer from 'inquirer'
import chalk from 'chalk'

function help () {
  console.log('')
  console.log('  How to use:')
  console.log(`  First run ${chalk.yellow('ypweb config')} to init config folder:`)
  console.log()
  console.log('    - ypweb install')
  console.log('    - ypweb init')
  console.log('    - ypweb clear')
  console.log('    - ypweb list')
  console.log('    - ypweb update')
  console.log('    - ypweb search')
  console.log('    - ypweb uninstall <installed template>')
  console.log('    - ypweb config set <key> <value>')
  console.log('    - ypweb config remove <key>')
  console.log('    - ypweb config get <key>')
  console.log('    - ypweb config list')
  console.log('    - ypweb config help')
  console.log()
}

function registeredProgram (program, type, typeInfo) {
  program
    .command(type)
    .description(typeInfo[type])
    .alias(alias[type])
    .action(async () => {
      try {
        if (type === 'config') {
          // get config third paramter, eg: ypweb config help -> help
          await ypweb('config', ...process.argv.slice(3))
        } else if (type === 'help') {
          help()
        } else {
          await ypweb(type)
        }
      } catch (e) {
        console.log(e);
      }
    })

  return program
}

try {
  (async function run () {
    const registry = await rc('registry')
    const programTypes = {
      list       : 'list installed template',
      uninstall  : `uninstall a installed template in ${dirs.download}`,
      update     : `update the installed template in ${dirs.download}`,
      search     : 'search the templates from your github organization/user',
      init       : 'generate a new project from a template',
      install    : `install remote templates from https://github.com/${registry}`,
      clear      : 'clear all installed templates',
      help       : 'more help info:',
      config     : `${dirs.rc} config file set and get`,
      '*'        : 'The command is not found'
    }

    program
      .version(version, '-v, --version')
      .usage('<command> [options]')

    // 遍历commander
    Object.keys(programTypes)
      .reduce((pre, type) => registeredProgram(pre, type, programTypes), program)

    program
      .on('-h', help)
      .on('--help', help)
      .parse(process.argv)

    // default
    if (program.args.length < 1) program.help()
  }())
} catch (e) {
  console.log(e)
  help()
}
