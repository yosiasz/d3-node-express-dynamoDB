var cors = require('cors'),
    express = require('express'),
    populationRouter = express.Router(),
    //http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.03.html
    AWS = require("aws-sdk");
AWS.config.update({accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
                           secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                           region: 'us-west-2',
                           endpoint: 'http://localhost:8000'});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

populationRouter.all('*', cors());

var getAuthors = function () {
    populationRouter.route('/')
        .get(function (req, res) {
        
        docClient.scan({
            TableName : 'authors',
            ProjectionExpression: "#dt, #nm, linkclicks",
            ExpressionAttributeNames: {
                    "#dt": "date",
                    "#nm": "name"
                },            
            Limit : 50
        }, function(err, data) {
            if (err) { console.log(err); return; }
            
            res.send(data.Items);
        }); 
    });
    
    return populationRouter;
        
};

module.exports = {
  getAuthors: getAuthors
};
                         
var cors = require('cors'),
    express = require('express'),
    populationRouter = express.Router(),
    //http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.03.html
    AWS = require("aws-sdk");
AWS.config.update({accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
                           secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                           region: 'us-west-2',
                           endpoint: 'http://localhost:8000'});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

populationRouter.all('*', cors());

var getAuthors = function () {
    
    populationRouter.route('/')
        .get(function (req, res) {
        
        docClient.scan({
            TableName : 'authors',
            Limit : 50
        }, function(err, data) {
            if (err) { console.log(err); return; }
            res.send(data.Items);
        }); 
    });
    
    return populationRouter;
        
};

module.exports = {
  getAuthors: getAuthors
};

                         