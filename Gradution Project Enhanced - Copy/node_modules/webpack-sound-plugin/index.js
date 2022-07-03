const exec = require('child_process').exec;
const path = require('path');

class SoundAlert {
  constructor (sounds) {
    this.sounds = sounds;
  }

  apply (compiler) {
    compiler.plugin('done', stats => {
      const errors = stats.hasErrors();
      const warnings = stats.hasWarnings();

      const code = !errors && !warnings ? 'ok' : errors ? 'error' : 'warning';
      this.playAlertSound(this.sounds[code], code);
    });
  }

  playAlertSound (sound, key) {
    let player = '';
    let filePath = null;

    if (process.platform === 'win32') {
      player = path.resolve(__dirname, './dlcplayer/dlc') + ' -p';
    } else if (process.platform === 'darwin') {
      player = 'afplay';
    } else {
      player = 'mpg123 -q';
    }

    if (sound === true) {
      filePath = `./sounds/${key}.mp3`;
    } else if (typeof sound === 'string') {
      filePath = `../../${sound}`;
    }

    if (filePath) {
      exec(`${player} ${path.resolve(__dirname, filePath)}`);
    }
  }
}

module.exports = SoundAlert;
