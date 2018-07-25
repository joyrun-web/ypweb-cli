import inquirer from 'inquirer';
import rmfr from 'rmfr';
import { readdir, exists } from 'mz/fs';
import { resolve } from 'path';
import { dirs, interfaces } from './utils/defs';
import rc from './utils/rc';
import { runBash, wrapperAsync, betterRequire } from './utils/common';
import copy from './utils/copy';
import loading from './utils/loading';
import metal from './helper/metal';

export default async function apply () {
  const download = dirs.download;
  const root = process.cwd();

  if (!await exists(download)) {
    logger.error(`There is no ${download}, Please install a template`);
  }

  const list = await readdir(download);

  if (list.length === 0) {
    logger.error(`There is no any scaffolds in your local folder ${download}, install it`);
  }

  if (list[0] == '.DS_Store') {
    // 剔除.DS_Store目录
    list.splice(0, 1)
  }


  const answers = await inquirer.prompt([
    {
      type   : 'list',
      name   : 'scaffold',
      message: 'which scaffold do you want to init?',
      choices: list
    }, {
      type   : 'input',
      name   : 'dir',
      message: 'project name',
      async validate(input) {
        const done = this.async();

        if (input.length === 0) {
          done('You must input project name');
          return;
        }

        const dir = resolve(root, input);

        if (await exists(dir)) {
          done('The project name is already existed. Please change another name');
        }

        done(null, true);
      }
    }
  ]);

  let loader, ask, hook, reply;

  const metalsmith = await rc('metalsmith');
  const scaffold = answers.scaffold;
  const dir = answers.dir;

  if (metalsmith) {
    // if set the interface/ask.js from scaffold, use it
    // else use default ./helper/ask.js
    try {
      ask = betterRequire(`${download}/${scaffold}/${interfaces.ask}`);
    } catch (e) {
      ask = betterRequire(resolve(__dirname, './helper/ask.js'));
    }

    if (typeof ask === 'function') {
      // set default project name is scaffold name
      ask = ask(scaffold, inquirer);
    }

    if (!Array.isArray(ask)) {
      throw new Error(`Please ensure your ${scaffold} ${interfaces.ask} is exported with Array or function that was returned an array`);
    }

    // object, { ask.name: answer }
    reply = await inquirer.prompt(ask);
    loader = loading('generating', resolve(root, dir));
    await metal(
      resolve(download, scaffold),
      resolve(root, dir),
      reply
    );
    // rm dest interfaces
    await rmfr(`${resolve(root, dir, interfaces.dir)}`);
    loader.succeed(`generated ${resolve(root, dir)}`);

    // support hook function after for developer
    try {
      hook = betterRequire(`${download}/${scaffold}/${interfaces.hook}`);
    } catch (e) {
      hook = { after() {} };
    }

    hook.after = wrapperAsync(hook.after);

    try {
      const meta = Object.assign({
        dir: `${root}/${dir}`,
        scaffold
      }, reply);
      await hook.after(meta, { runBash, loader, inquirer });
    } catch (e) {
      throw e;
    }
  } else {
    loader = loading('generating', resolve(root, dir));
    await copy(`${download}/${scaffold}`, dir);
    loader.succeed(`generated ${resolve(root, dir)}`);
  }
}
