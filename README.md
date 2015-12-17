## Runs rsync in background ##

### Installation ###

`npm i`

### Usage ###

The daemon has cryptic interface which is based on `npm start` script with arguments. It looks like:

  `cd node-rsync-daemon`
  `npm start -- --from=johndoe@johndoe.com:/myserver/myproject --local=~/myproject/`

By default it ignores following files and folders

    .git/
    .DS_Store
    .idea
    node_modules/
    .bower
    .npm
    .iml

It can be replaced by adding the `--exclude` argument.

`--exlucde={.git/,netbeansproject,localconf}`

### Recommended usage ###

To have a usable expirience with daemon you should add a shortcut to you .bash_profile config. It could be done with following command:

`echo 'alias rsync-daemon="npm start -- --from=johndoe@johndoe.net:/myserver/myproject --to=~/myproject/"' >> ~/.profile`

To avoid troubles with folders mapping, don't forget to add `/` at the end of local path. Now daemon can be started from `node-rsync-daemon` folder with `rsync-daemon` command.
