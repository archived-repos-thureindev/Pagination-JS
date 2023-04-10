
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static(__dirname + "/public/"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pagination.html');
});

app.get('/ajax-route', (req, res) => {
    
    field = req.query.promptField;
    text = req.query.promptText;

    // Your server response // ------ --------- --------
    content = [];
    for (let i = 1; i <= 100; i ++) {
        content.push({
            'field': `${field} #${i}`,
            'text': `${text} #${i}}`
        });
    }
    // ------ --------- -------- // ------ --------- --------
    res.json({'content': content});
});


app.listen(3000, () => {
    console.log('Server running at port 3000');
});
