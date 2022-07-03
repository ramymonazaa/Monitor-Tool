# webpack-sound-plugin #

*Plays audio notifications when warnings / errors occured while building with webpack.*

## Installation

```bash
$ npm i webpack-sound-plugin --save-dev
```

```
const SoundAlert = require('webpack-sound-plugin');

plugins: [
  ...
  new SoundAlert({
    warning: 'warning.mp3',
    error: 'error.mp3'
    // ok: 'ok.mp3'
  })
  ...
]
```

## Audio Player Command Line

* __MAC OSX :__ `afplay`

  https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/afplay.1.html

  - `afplay` is build-in command line on macOS; you don't have to do anything for it.

* __UNIX :__ `mpg123`

  http://www.mpg123.de/

```bash
$ sudo apt-get install mpg123
```

* __Windows :__ `dlc`

  http://dlcplayer.jimdo.com/

  - `dlc` is build-in now, so you don't have to install command line by self.
  - You still can download dlcplayer from [here](https://github.com/zlargon/voc/raw/master/dlcplayer.zip) if you want.

## License

MIT
