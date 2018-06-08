const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(server.address().port);
});

let dashboardDao = require('./dashboardDao');

app.post('/addState', function(req, res){
    return dashboardDao.createState(req.body, res);
});

app.delete('/removeState/:id', function(req, res){
    return dashboardDao.removeStateById(req.params.id, res);
})

app.get('/dashboard',function(req,res){
    return dashboardDao.getAllStates(req.body, res);
})

app.post('/addItem', function(req,res){
    console.log(req.body);
    return dashboardDao.addItem(req.body, res);
})

app.get('*', function(req, res) {
    res.sendFile('./view/index.html', {
        root: __dirname
    });
});

