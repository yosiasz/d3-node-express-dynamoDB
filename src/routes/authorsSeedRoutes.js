var cors = require('cors'),
    fs = require('fs'),
    express = require('express'),
    authorRoute = express.Router(),
    //http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/GettingStarted.NodeJs.03.html
    AWS = require("aws-sdk");
AWS.config.update({accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
                           secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                           region: 'us-west-2',
                           endpoint: 'http://localhost:8000'});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();
var TableName = 'authors';

var p_CreateTable = {
    TableName : "authors",
    KeySchema: [
        { AttributeName: "id", KeyType: "HASH"},  //Partition key
        { AttributeName: "authorname", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "id", AttributeType: "N" },
        { AttributeName: "authorname", AttributeType: "S" }
    ],

    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

var p_deleteTable = {
    TableName: 'authors'
};

authorRoute.all('*', cors());
        
var seedAuthors = function () {
    authorRoute.route('/')    
        .get(function(req,res){
            //delete table
            dynamodb.deleteTable(p_deleteTable, function(err, data) {
                if (err) {
                    console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
                    
                } else {
                        //createTable 
                        dynamodb.createTable(p_CreateTable, function(err, data) {
                            if (err) {
                                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                            } else {
                                 var allData = JSON.parse(fs.readFileSync('./sampledata/authors.json', 'utf8'));
                                    allData.forEach(function(author) {
                                        console.log(author);
                                        var p_SeedTable = {
                                            TableName: TableName,
                                            Item: {
                                                "id":  author.author,
                                                "authorname": author.authorname,
                                                "date":  author.date,
                                                "linkclicks": author.linkclicks
                                            }
                                        };    
                                        //console.log("Created table. Table description JSON:", JSON.stringify(p_SeedTable, null, 2));  
                                        //seed Table 
                                        docClient.put(p_SeedTable, function(err, data) {
                                            if (err) {
                                                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                                            } else {
                                                console.log("Added items");
                                                //res.send(data)
                                            }
                                        });            
                                        //console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                                        
                                    });
                                    
                            }   //else
                        });              
                }
            });
        
    });
    console.log("Are we done?")
    return seedAuthors;    
}

module.exports = {
  seedAuthors: seedAuthors
};