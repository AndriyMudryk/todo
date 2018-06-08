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
    return state.findOne({
        _id: model.id
    }).then(
        (obj) => {
            console.log(obj);
            console.log(model.item);
            obj.items.push(model.item);
            console.log(obj);
            obj.save(function (err, data) {
                res.send({state : state});
                if (err)
                { 
                return handleError(err);
                }
            });
        })
      .catch((err) =>{res.send(err);});
}

