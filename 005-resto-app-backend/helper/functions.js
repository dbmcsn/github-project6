const fs = require("fs");


const writeFile = (res, file, data, message) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send(message);
        }
    })
}

module.exports = { writeFile };