var fs = require('fs')
var path = require('path')
var colors = require('colors')
var { execSync } = require('child_process')

const runNodeCommand = (command) => {
  try {
    execSync(command)
  } catch (err) {
    console.log(err)
  }
}

exports.runNodeCommand = runNodeCommand
