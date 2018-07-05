const express = require('express');
const router = express.Router();
const fs = require('fs');

const TEMP_FILE_DIR = './temp';

// GET ALL FILES
router.get('/', (req, res, next) => {
    console.info('Returning all files');
    const readFiles = new Promise((resolve, reject) => {

    });
    fs.readdir(TEMP_FILE_DIR, (error, fileNames) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
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
            .catch(error => {
                console.error('Promise all catch', error)
                res.status(500).send(error);
            });
    })
});
// GET SPECIFIC FILE
router.get('/:fileName', (req, res, next) => {
    console.info(`Returning ${req.params.fileName}`);
    fs.readFile(`${TEMP_FILE_DIR}/${req.params.fileName}`, 'utf-8', (error, content) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        }
        try {
            const parsedContent = JSON.parse(content);
            res.send(parsedContent);
        } catch (error) {
            next(error);
        }
    })
});
// DELETE ALL FILES
router.delete('/', (req, res, next) => {
    console.info('Returning all files');
    const readFiles = new Promise((resolve, reject) => {

    });
    fs.readdir(TEMP_FILE_DIR, (error, fileNames) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        }
        let filesDeleted = [];
        for (fileName of fileNames) {
            filesDeleted[filesDeleted.length] = new Promise((resolve, reject) => {
                fs.unlink(`${TEMP_FILE_DIR}/${fileName}`, (error) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    }
                    resolve(fileName);
                })
            });
        }

        Promise.all(filesDeleted)
            .then(fileContents => {
                console.log(fileContents);
                res.send(`Following files deleted: ${fileContents}`)
            })
            .catch(error => {
                console.error('Promise all catch', error)
                res.status(500).send(error);
            });
    })
});
// DELETE SPECIFIC FILE
router.delete('/:fileName', (req, res, next) => {
    console.info(`Deleting ${req.params.fileName}`);
    fs.unlink(`${TEMP_FILE_DIR}/${req.params.fileName}`, (error) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        }
        res.send(`Deleted ${req.params.fileName}`);
    })
});
// POST DATA
router.post('/:fileName', (req, res, next) => {
    console.info('fileName', req.params.fileName);
    console.info('fileContents', req.body);

    fs.writeFile(`${TEMP_FILE_DIR}/${req.params.fileName}`, JSON.stringify(req.body), error => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        }
        console.info('file saved');
    })
    res.send('POST file response');
});
// ERROR HANDLING
router.post('/', (req, res, next) => {
    const exampleUrl = req.protocol + '://' + req.get('host') + req.originalUrl + '/[fileName]';
    res.status(400).send(`Please provide a file name in the URL. e.g. ${exampleUrl}`)
})


module.exports = router;