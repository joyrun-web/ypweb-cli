# ypweb-cli
A simple CLI for scaffold vue or react projects

### Installation
Prerequisites: [Node.js](https://nodejs.org/en/) (>=8.x preferred), npm version 3+ and [Git](https://git-scm.com/).

``` bash
$ npm install -g ypweb-cli
```

### Usage

First, init config

``` bash
$ ypweb config
```
It will create `.ypwebrc` at your home directory.


### Other Usage
```
ypweb install  // install remote templates from https://github.com/<registry>
ypweb init     // generate a new project from a template
ypweb update   // update the installed template in /yout/root/path/.ypweb
ypweb search   // search the templates from your github organization/user
ypweb uninstall <installed template>  // uninstall a installed template in /yout/root/path/.ypweb
ypweb config set <k> <v>  // set key and value to your config file
ypweb config remove <k> // remove config  file
ypweb config get <k> // get config key from config file
ypweb config list    // list all config key and value
ypweb config help
```

Inspired by [Project-next-cli](https://github.com/ijs/project-next-cli)
