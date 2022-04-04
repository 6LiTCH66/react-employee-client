var express = require('express')
var app = express();

const path = require('path')
const PORT = process.env.PORT || 6000

app.use(express.static('build'));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', "/index.html"));
})

app.listen(PORT, (err) => {
    if (err) return console.log(err)
    console.log(`Server running on PORT:`, PORT)
})

