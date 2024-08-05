const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const Port = 3000;
const HostName = "localhost";

app.use(express.json());


app.get('/create-file', (req, res) => {
    const now = new Date();
    const timestamp = now.toISOString().replace(/:/g, "-");
    const datetime = timestamp.split(".")[0];

    const filename = `${timestamp}.txt`;
    console.log("before folder add",__dirname)
    const dir = path.join(__dirname, 'Files');
    console.log("After FolderAdd", dir)
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
const filepath = path.join(dir, datetime);
 console.log("After folderadd with File", filepath)
    // Writing to the file
    fs.writeFile(filepath,timestamp, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Error writing file');
        }
        res.send(`File has been saved as ${filename}`);
    });
});

app.get("/",(req,res)=> res.send("Home"))

app.get('/getTextFiles', (req, res) => {
    const folderPath = 'Files';

    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while listing the files from the directory');
        } else {
            for (var file of files){
                console.log(file)
            }
            res.status(200).json(file);
        }
    });
});

app.listen(Port,()=>{
console.log(`App is running in https://${HostName}:${Port}`)
})