const express = require('express');
const app = express();
const http = require('http').Server(app);
const Docker = require('dockerode');
const myParser = require('body-parser');




app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());
app.post('/api/docker/img-pull/', function(req, res) {
    console.log(req.body);
    var ImgName = req.body["image"];
    var docker = new Docker({host:'127.0.0.1'});
    console.log(ImgName);
    console.log(req.body);
    docker.pull(ImgName, function(err, stream){
        docker.modem.followProgress(stream, onFinished, onProgress);
        function onFinished(err, output){
            console.log(output);
            res.json({status:'Finish'});
            if(err){
                console.log(err);
            }
        }
        function onProgress(event) {

        }
    });
});

// !- Server open -! //
app.listen(3000);