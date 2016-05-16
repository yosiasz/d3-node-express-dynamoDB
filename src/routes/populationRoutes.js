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

var p_getPopulations2 = {
    TableName: "population",
    ProjectionExpression: "#yr, age, sex, people",
    FilterExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames: {
        "#yr": "year",
    },
    ExpressionAttributeValues: {
         ":start_yr": 1850,
         ":end_yr": 1900 
    }
};

var p_getPopulations3 = {
    TableName: "population",
    ProjectionExpression: "#yr, age, sex, people",
    KeyConditionExpression: "#id between :start_id and :end_id",
    ExpressionAttributeNames:{
        "#id": "id"
    },
    ExpressionAttributeValues: {
        ":start_id":1,
        ":end_id":50
    }
    };


var p_getPopulations = {
    TableName: "population",
    KeyConditionExpression: "#yr between :start_yr and :end_yr",
    ExpressionAttributeNames:{
        "#yr": "year"
    },
    ExpressionAttributeValues: {
        ":start_yr":1850,
        ":end_yr":1900
    }
    };

populationRouter.all('*', cors());

function getChartData() {
    docClient.scan({
        TableName : 'population',
        Limit : 50
    }, function(err, data) {
        if (err) { console.log(err); return; }
        console.log(data.year);

        for (var ii in data.Items) {
            ii = data.Items[ii];
            console.log(ii.year);
            console.log(ii.sex);
            console.log(ii.age);
            console.log(ii.people);
        }
    });
}


var getPopulations = function () {
    
    populationRouter.route('/')
        .get(function (req, res) {
        
        docClient.scan({
            TableName : 'population',
            Limit : 50
        }, function(err, data) {
            if (err) { console.log(err); return; }
            console.log(data.year);

            res.send(data.Items);
        }); 
    });
    
    return populationRouter;
        
};



module.exports = {
  getPopulations: getPopulations
};
                         
                         