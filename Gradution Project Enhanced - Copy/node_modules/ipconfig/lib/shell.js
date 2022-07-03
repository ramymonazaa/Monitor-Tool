var spawn = require('child_process').spawnSync;

/**
 * exec command string
 * @param {string} cmd
 * @param {string} [cwd]
 * @param {number} [mode] 0 - 继承模式, 1 - 带返回结果, 2 - 静默模式, 1x - shell模式
 */
exports.exec = function(cmd, cwd, mode = 0) {
    if (mode >= 10 && mode < 20) {
        // shell
        return this.spawn(cmd, [], cwd, mode);
    } else {
        var args = cmd.split(/ +/);
        return this.spawn(args.shift(), args, cwd, mode);
    }
};

/**
 *
 * @param {string} cmd
 * @param {string[]} args
 * @param {string|number} [cwd]
 * @param {number} [mode] 0 - 继承模式, 1 - 带返回结果, 2 - 静默模式
 */
exports.spawn = function(cmd, args, cwd, mode = 0) {
    if (typeof cwd === 'number') {
        mode = cwd;
        cwd = process.cwd();
    }

    var options = {};
    options.cwd = cwd || process.cwd();
    options.timeout = 1800000;   // 30分钟

    switch (mode) {
        case 0:
        case 10:
            options.stdio = 'inherit';
            break;
        case 1:
        case 11:
            options.encoding  = 'utf8';
            break;
        case 2:
        case 12:
            break;
    }

    if (mode >= 10 && mode < 20) options.shell = true;

    var ret = spawn(cmd, args, options);

    if (mode === 1 || mode === 11) {
        return ret.stdout.replace(/^\n+|\n+$/, '');
    } else {
        return ret;
    }
};

exports.which = function(app) {
    return this.exec(`which ${app}`, 11);
};
