# express-fs
This simple app takes JSON, and writes it to a temporary directory as a JSON file. It also retrieves all the JSON files from the temp directory, collate it into one big array for a JSON response.

------------------------------------------------------------
## INSTALL
1. Install first:
    `npm i`
2. To start server:
    `npm start`
    The app will be served on port 3000
------------------------------------------------------------
## USAGE - REST METHODS
### GET 
`http://localhost:3000/file/[fileName]`

If no file name is provided, it will return all files in the temp directory. Otherwise, it will return the file that matches the file name.

### POST
`http://localhost:3000/file/[fileName]`

A file name is mandatory. This will create a file from the content provided in the body. If the file already exists, the contents will be replaced.

Body (JSON):
```
    {"sample": "json"}
```
### DELETE
`http://localhost:3000/file/[fileName]`

If no file name is provided, it will delete all files in the temp directory. Otherwise, it will delete the file that matches the file name