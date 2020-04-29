var MongoClient = require('mongodb').MongoClient;
var http = require('http');
var url = require('url');
var dbUrl = "mongodb://localhost:27017";

http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query;
    // switch(q.name){
    //     case "Mutandissimi":
    //         console.log("letto correttamente");
    //         break;
    // }
    res.end("Mutandissimi");
}).listen(8080);

MongoClient.connect(dbUrl, (err,db)=>{
    if(err) throw err;
    var dbo = db.db("permesso");
    var obj = {name: "Mutandissimi", queue_size: 0}
    dbo.collection("shops").insertOne(obj, function(){
        if (err) throw err;
        console.log("1 document inserted");
        db.close()
    });
});

// MongoClient.connect(dbUrl, (err,db)=>{
//     if(err) throw err;
//     var dbo = db.db("mallti");
//     dbo.collection("shops").find({}).toArray(function(err, result){
//         if (err) throw err;
//         console.log(result);
//         res.write(result[0].name); //write a response to the client
//         res.end(); //end the response
//         db.close()
//     });
// });