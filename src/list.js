/**
 * ypweb list
 */
import { readdir, exists } from 'mz/fs'
import { betterRequire } from './utils/common'
import { dirs } from './utils/defs'
import logger from './utils/logger'

async function apply () {
  if (!await exists(dirs.download)) {
    logger.error(`There is no ${dirs.download}, Please install a template`)
  }

  const list = await readdir(dirs.download)

  let version, info;
  if (list.length === 0) {
    logger.error(`There is no template download in ${dirs.download}`)
  }

  list.forEach(dir => {
    try {
      info = betterRequire(`${dirs.download}/${dir}/package.json`)
      version = info.version
    } catch (e) {
      version = '0.0.0'
    }

    logger.log(`${dir}@${version}`)
  })

}

export default apply
