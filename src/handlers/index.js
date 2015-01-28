// Wish we could automate this, but browserify doesn't handle it correcly.
// Browserify seems to do statical analysis of imports to create the bundle's
// module mapping.
module.exports.Trak = require('./trak');
module.exports.Default = require('./default');
module.exports.Inbox = require('./inbox');
module.exports.Ticket = require('./ticket');
