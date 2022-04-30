const { GetFiles, ExtractFolder } = require("../not_changing_these/files");

function MakeEntries(
  pattern, 
  outputFolder,
  bundleFileName,
  withSubfolder = false
) {
  let files = GetFiles(pattern);
  let entries = {};

  for (let file of files) {
    let bundleFile = `${outputFolder}`;
    if (withSubfolder) bundleFile += `/${ExtractFolder(file)}`;
    bundleFile += `/${bundleFileName}`;

    if (!entries[bundleFile]) entries[bundleFile] = [];
    entries[bundleFile].push(file);
  }

  return entries;
}

module.exports = MakeEntries;
