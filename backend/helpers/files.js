const fsPromises = require('fs').promises;

const getJsonFromFile = (filePath) => fsPromises.readFile(filePath, { encoding: 'utf8' })
  .then((file) => JSON.parse(file))
  .catch(() => {
    throw new Error({ message: 'File is missing' });
  });

module.exports = { getJsonFromFile };
