let state = require('./stateSchema');

exports.createState = (model, res) => {
    let tittle = model.tittle;
    return state.create({
        tittle : tittle
    }).then(
        (state) => {
            res.send({state : state});
        }
    ).catch(
        (err)=>{ 
            res.send(err);
        }
    );
}

exports.removeStateById = (model, res) => {
    let id = model;
    return state.findOneAndRemove({
        _id : id
    }).then(
        (response) => {
            console.log(response);
            res.send({state : response});
        }
    ).catch(
        (err) => {
            res.send(err);
        }
    );
}

exports.getAllStates = (model, res) => {
    return state.find().then(
        (response) => {
            console.log(response);
            res.send({states : response})
        }
    ).catch(
        (err) => {
            res.send(err);
        }
    )
}

exports.addItem = (model, res) => {
    item = {
        tittle : model.tittle,
        description : model.description
    }
    return state.findOne({
        _id: model.id
    }).then(
        (obj) => {
            obj.items.push(item);
            console.log(obj.items);
            obj.save(function (err, data) {
                res.send({state : state});
                if (err)
                { 
                throw err;
                }
            });
        })
      .catch((err) =>{res.send(err);});
}

exports.removeItemById = (model, res) => {
    return state.findOneAndUpdate({
        _id : model.state
      }, {$pull : {items : {_id : model.item}}},function(err, response) {
            console.log(response)
            res.send({items : response.items});
            if (err)
            { 
                throw err;
            }
      })
      .catch((err) =>{res.send(err);});
}

exports.updateStateTittle = (model, res) => {
    return state.findOneAndUpdate({
        _id : model.id
    }, {$set : {tittle : model.newTittle}}, function(err, response) {
        console.log(response)
        res.send({resp : "state updated succesfully."});
        if (err)
        { 
          throw err;
        }
    })
    .catch((err) =>{res.send(err);});   
}

exports.updateItem = (model, res) => {
    return state.findOneAndUpdate({
        _id : model.id, "items._id" : model.item
    }, {$set : {"items.$.tittle" : model.tittle, "items.$.description" : model.description}} ,function(err, response) {
        console.log(response)
        res.send({resp : "item updated succesfully."});
        if (err)
        { 
          throw err;
        }
    })
    .catch((err) =>{res.send(err);});   
}
