
import downloadGit from 'download-git-repo'
import request from 'request'
import { basename } from 'path'
import rc from './rc'
import { dirs, userAgent } from './defs'
import logger from './logger'

function fetch (api) {
  return new Promise((resolve, reject) => {
    request({
      url: api,
      method: 'GET',
      headers: {
        'User-Agent': `${userAgent}`
      }
    }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        const data = JSON.parse(body)
        if (data.message === 'Not Found') {
          logger.error(`${api} not found`)
        } else {
          resolve(data)
        }
      }
    })
  })
}

export const repoList = async () => {
  const { type, registry } = await rc()
  const api = `https://api.github.com/${type}s/${registry}/repos`
  return await fetch(api)
}

const getGitInfo = async (repo) => {
  let template = repo;
  let [scaffold] = template.split('@')

  scaffold = basename(scaffold);

  template = template.split('@').filter(Boolean).join('#')
  const registry = await rc('registry')
  const url = `${registry}/${template}`
  return {
    url,
    scaffold
  }
}

export const tagsList = async (repo) =>{
  const { url, scaffold } = await getGitInfo(repo)
  const api = `https://api.github.com/repos/${url}/tags`
  return fetch(api, scaffold, url)
}

export const searchList = async () => {
  const { type, registry } = await rc();
  let api;

  if (type === 'user') {
    api = `https://api.github.com/users/${registry}/repos?per_page=100&page=1`;
  } else if (type === 'org') {
    api = `https://api.github.com/orgs/${registry}/repos?per_page=100&page=1`;
  } else {
    throw new Error('Type muse be user or org');
  }

  return await fetch(api);
};

export const download = async (repo) => {
  const { url, scaffold } = await getGitInfo(repo)

  return new Promise((resolve, reject) => {
    downloadGit(url, `${dirs.download}/${scaffold}`, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
