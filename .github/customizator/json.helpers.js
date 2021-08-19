var fs = require('fs')
var path = require('path')
var colors = require('colors')
var nestedProperty = require('nested-property')

const addPropertyToJsonFile = (
  originalJson,
  property,
  value,
  message,
  log = true
) => {
  try {
    const data = fs.readFileSync(originalJson, 'utf8')
    const j = { ...JSON.parse(data) }
    nestedProperty.set(j, property, value)
    fs.writeFileSync(originalJson, JSON.stringify(j, null, 2))
    if (log) console.log(`- ${message}`.green)
  } catch (err) {
    if (log) console.log(`- ${message}`.red)
  }
}

exports.addPropertyToJsonFile = addPropertyToJsonFile
