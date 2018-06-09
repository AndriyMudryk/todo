const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const server = app.listen(process.env.PORT || 5000, () => {
    console.log(server.address().port);
});

let dashboardDao = require('./dashboardDao');

app.post('/addState/:tittle', function(req, res){
    return dashboardDao.createState(req.params, res);
});

app.delete('/removeState/:id', function(req, res){
    return dashboardDao.removeStateById(req.params.id, res);
})

app.get('/dashboard',function(req,res){
    return dashboardDao.getAllStates(req.body, res);
})

app.post('/addItem/:id/:tittle/:description', function(req,res){
    return dashboardDao.addItem(req.params, res);
})

app.delete('/removeItem/:state/:item', function(req, res){
    return dashboardDao.removeItemById(req.params, res);
})

app.put('/editStateTittle/:id/:newTittle', function(req, res){
    return dashboardDao.updateStateTittle(req.params, res);
})

app.put('/editItem/:id/:item/:tittle/:description', function(req, res){
    return dashboardDao.updateItem(req.params, res);
})

app.get('*', function(req, res) {
    res.sendFile('./view/index.html', {
        root: __dirname
    });
});

