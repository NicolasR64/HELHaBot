// code by guideBot
// Easily set your terminal text color & styles.
const { cyan, red, gray, yellow, white, green, bold, underline } = require('colorette');
// For an easier way to code with time
const { Timestamp } = require('@sapphire/time-utilities');

// Default value is log
exports.log = (content, type = 'log') => {
  const timestamp = `[${green(new Timestamp('YYYY-MM-DD HH:mm:ss'))}]:`;

  switch (type) {
    // Log in gray
    case 'log': return console.log(`${timestamp} ${gray(type.toUpperCase())} ${content} `);
    // Warn in yellow
    case 'warn': return console.log(`${timestamp} ${bold(yellow(type.toUpperCase()))} ${content} `);
    // Error in red
    case 'error': return console.log(`${timestamp} ${underline(bold(red(type.toUpperCase())))} ${content} `);
    // Command in white
    case 'cmd': return console.log(`${timestamp} ${white(type.toUpperCase())} ${content}`);
    // When smth is Ready
    case 'ready': return console.log(`${timestamp} ${cyan(type.toUpperCase())} ${content}`);
    // Other
    default: throw new TypeError('Logger type must be warn, log, ready, cmd or error.');
  }
};

// Command to be more clear
exports.warn = (...args) => this.log(...args, 'warn');
exports.error = (...args) => this.log(...args, 'error');
exports.cmd = (...args) => this.log(...args, 'cmd');
exports.ready = (...args) => this.log(...args, 'ready');