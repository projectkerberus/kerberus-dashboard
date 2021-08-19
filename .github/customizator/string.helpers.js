var fs = require('fs');
var path = require('path');
var colors = require('colors');

const replaceString = (file, list, message, log = true) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    var result = data;
    list.forEach(element => {
      const rex = new RegExp(escapeRegExp(element.s), 'ig');
      if (!rex.test(result)) {
        result = result.replace(rex, element.r);
      }
    });
    fs.writeFileSync(file, result, 'utf8');
    if (log) console.log(`- ${message}`.green);
  } catch (err) {
    if (log) console.log(`- ${message}`.red);
  }
};

const concatString = (file, list, message, log = true) => {
  try {
    const data = fs.readFileSync(file, 'utf8');
    var result = data;
    list.forEach(element => {
      let newCode = `${element.s}\n${element.r}`;
      if (element.b) {
        newCode = `${element.r}\n${element.s}`;
      }
      const rex = new RegExp(escapeRegExp(element.s), 'ig');
      if (!rex.test(result)) {
        result = result.replace(rex, newCode);
      }
    });
    fs.writeFileSync(file, result, 'utf8');
    if (log) console.log(`- ${message}`.green);
  } catch (err) {
    if (log) console.log(`- ${message}`.red);
  }
};

const escapeRegExp = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

exports.replaceString = replaceString;
exports.concatString = concatString;
exports.escapeRegExp = escapeRegExp;
