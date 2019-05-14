const c = require('ansi-colors');

module.exports.debugLog = label => {
    console.log(`${c.yellow('[DEBUG]')} ${label}`);
}

module.exports.jsonLog = json => {
    console.log(JSON.stringify(json, null, 4));
}
