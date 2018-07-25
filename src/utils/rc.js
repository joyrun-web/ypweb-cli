// read config

import ini from 'ini'
import { readFile, writeFile, exists } from 'mz/fs'
import { defaults, dirs } from './defs'
import rmfr from 'rmfr'

const emptyValues = {
  undifined: true,
  null: true,
  0: true
}

async function apply (k, v, remove) {
  let config, content, setting;
  const isExist = await exists(dirs.rc)

  // delete config value
  if (remove) {
    config = ini.parse(await readFile(dirs.rc, 'utf-8'))
    if (config[k]) {
      delete config[k]
      setting = Object.assign({}, config, { [k]: v || null })
      await writeFile(dirs.rc, ini.stringify(setting))
    } else {
      await rmfr(`${dirs.rc}`)
    }
    return true
  }

  // write default setting to home rc path
  if (!k || k.length === 0) {
    if (!isExist) {
      content = ini.stringify(defaults)
      await writeFile(dirs.rc, content)
      return content
    }
    return ini.parse(await readFile(dirs.rc, 'utf-8'))
  }

  // get config value
  if (!v || v.length == 0) {
    if (!isExist) return defaults[k]
    config = ini.parse(await readFile(dirs.rc, 'utf-8'))
    return emptyValues[config[k]] ? defaults[k] : config[k]
  }

  // set config value
  if (k.length > 0 && v.length > 0) {
    if (!isExist) {
      config = {}
    } else {
      config = ini.parse(await readFile(dirs.rc, 'utf-8'))
    }

    setting = Object.assign({}, config, { [k]: v })
    await writeFile(dirs.rc, ini.stringify(setting))
  }
}

export default apply
