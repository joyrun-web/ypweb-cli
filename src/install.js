/**
 * ypweb install
 */

import inquirer from 'inquirer'
import loading from './utils/loading'
import { repoList, tagsList, download } from './utils/git'
import chalk from 'chalk'
import logger from './utils/logger'

async function apply () {
  let loader, choices, answers, version;

  loader = loading('repo list fetching...')
  const repos = await repoList()
  loader.succeed()

  if (repos.length === 0) {
    const registry = await rc('registry')
    logger.error(`There is no any scaffolds in https://github.com/${registry}. Please create and try`)
  }

  // Object choices, name for display in list,
  // value for save in answers hash, short for display after selection
  choices = repos.map(({ name, description }) => {
    let result = {}
    result.name = ` ${chalk.yellow('★')}  ${name} - ${description}`
    result.value = name
    result.short = name
    return result
  })

  answers = await inquirer.prompt([
    {
      type   : 'list',
      name   : 'repo',
      message: 'which repo do you want to install?',
      choices
    }
  ])

  const repo = answers.repo
  loader = loading('tag list fetching', repo)
  const tags = await tagsList(repo)
  loader.succeed()

  if (tags.length === 0) {
    version = ''
  } else {
    choices = tags.map(({ name }) => name);

    answers = await inquirer.prompt([
      {
        type   : 'list',
        name   : 'version',
        message: 'which version do you want to install?',
        choices
      }
    ])
    version = answers.version
  }

  loader = loading('downloading', repo)
  await download([repo, version].join('@'))
  loader.succeed(`downloaded ${repo}`)
}

export default apply
