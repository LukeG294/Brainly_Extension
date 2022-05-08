const { glob } = require("glob");

function GetFiles(pattern) {
  return glob.sync(pattern);
}

function ExtractFolder(filePath) {
  let fileSplitted = filePath.split(/\.|\//);
  return fileSplitted[fileSplitted.length - 3];
}

module.exports = { GetFiles, ExtractFolder };