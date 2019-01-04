var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectId;

var app = express();

app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json())

var port = 8080;

var db = new mongodb.Db(
    'instagram',
    new mongodb.Server('localhost', 27017, {}),
    {}
);

app.listen(port);

console.log("Servidor HTTP escutando:", port)

app.get('/', function(req, res){
    res.send({msg: 'ola'})
})


//POST
app.post('/api', function(req, res){
    var dados = req.body;
    // res.send(dados);

    db.open(function(err, mongoClient){
        mongoClient.collection('postagens', function(err, collection){
            collection.insert(dados, function(err, records){
                if(err) {
                    res.json(err);
                }else {
                    res.json(records)
                }
                mongoClient.close();
            })
        })
    }); 
})

//GET
app.get('/api', function(req, res){
    var dados = req.body;
    // res.send(dados);

    db.open(function(err, mongoClient){
        mongoClient.collection('postagens', function(err, collection){
            collection.find().toArray(function(err, results){
                if(err) {
                    res.json(err);
                }else {
                    res.json(results);
                }
                mongoClient.close();
            });
        })
    }); 
})

//GET BY ID
app.get('/api/:id', function(req, res){
    var dados = req.body;
    // res.send(dados);

    db.open(function(err, mongoClient){
        console.log(req.params.id)
        mongoClient.collection('postagens', function(err, collection){
            collection.find(objectId(req.params.id)).toArray(function(err, results){
                if(err) {
                    res.json(err);
                }else {
                    res.json(results);
                }
                mongoClient.close();
            });
        })
    }); 
})

//PUT BY ID
app.put('/api/:id', function(req, res){
    var dados = req.body;
    // res.send(dados);

    db.open(function(err, mongoClient){
        console.log(req.params.id)
        mongoClient.collection('postagens', function(err, collection){
            collection.update(
                {_id : (objectId(req.params.id))},
                {$set : {titulo : req.body.titulo}},
                {},
                function(err, records){
                    if(err) {
                        res.json(err)
                    }else {
                        res.json(records)
                    }
                mongoClient.close();    
                }
            );
        })
    }); 
})

//DELET BY ID
app.delete('/api/:id', function(req, res){
    var dados = req.body;
    // res.send(dados);

    db.open(function(err, mongoClient){
        console.log(req.params.id)
        mongoClient.collection('postagens', function(err, collection){
            collection.remove({_id : objectId(req.params.id)},function(err, results){
                if(err) {
                    res.json(err);
                }else {
                    res.json(results);
                }
                mongoClient.close();
            });
        })
    }); 
})