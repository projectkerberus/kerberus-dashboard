var fs = require('fs')
var path = require('path')
var colors = require('colors')

const copyFile = (sourceFile, destinationPath, message, log = true) => {
  try {
    fs.copyFileSync(sourceFile, destinationPath)
    if (log) console.log(`- ${message}`.green)
  } catch (err) {
    if (log) console.log(`- ${message}`.red)
  }
}

const copyContentFolder = (
  sourceFolder,
  destinationPath,
  message,
  log = true
) => {
  try {
    const files = fs.readdirSync(sourceFolder)
    files.forEach((f) => {
      if (!f.startsWith('.')) {
        copyFile(
          path.join(sourceFolder, f),
          path.join(destinationPath, f),
          null,
          false
        )
      }
    })
    if (log) console.log(`- ${message}`.green)
  } catch (err) {
    if (log) console.log(`- ${message}`.red)
  }
}

const createFolder = (folder, message, log = true) => {
  try {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    if (log) console.log(`- ${message}`.green)
  } catch (err) {
    if (log) console.log(`- ${message}`.red)
  }
}

const mergeFiles = (sourceFile, appendFile, message, log = true) => {
  try {
    const sourceData = fs.readFileSync(sourceFile, 'utf8')
    const appendData = fs.readFileSync(appendFile, 'utf8')
    fs.writeFileSync(sourceFile, `${sourceData}\n${appendData}`)
    if (log) console.log(`- ${message}`.green)
  } catch (err) {
    if (log) console.log(`- ${message}`.red)
  }
}

exports.copyFile = copyFile
exports.copyContentFolder = copyContentFolder
exports.createFolder = createFolder
exports.mergeFiles = mergeFiles
