const express = require('express');
const router = express.Router();

const fs = require('fs');

const TEMP_FILE_DIR = './temp';

/* GET users listing. */
router.get('/', (req, res, next) => {
    console.info('Returning all files');
    const readFiles = new Promise((resolve, reject) => {

    });
    fs.readdir(TEMP_FILE_DIR, (error, fileNames) => {
        if (error) {
            return console.error(error);
        }
        let fileContents = [];
        for (fileName of fileNames) {
            fileContents[fileContents.length] = new Promise((resolve, reject) => {
                fs.readFile(`${TEMP_FILE_DIR}/${fileName}`, 'utf-8', (error, content) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    resolve(JSON.parse(content));
                })
            });
        }

        Promise.all(fileContents)
            .then(fileContents => {
                console.log(fileContents);
                res.send(fileContents)
            })
            .catch(error => console.error('Promise all catch', error));
    })
});
router.post('/', (req, res, next) => {
    const exampleUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/[fileName]';
    res.send(`Please provide a file name in the URL. e.g. ${exampleUrl}`)
})
router.post('/:fileName', (req, res, next) => {
    console.info('fileName', req.params.fileName);
    console.info('fileContents', req.body);

    fs.writeFile(`${TEMP_FILE_DIR}/${req.params.fileName}`, JSON.stringify(req.body), error => {
        if (error) {
            return console.error(error);
        }
        console.info('file saved');
    })
    res.send('POST file response');
});

module.exports = router;