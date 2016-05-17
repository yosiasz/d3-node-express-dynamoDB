var fs = require('fs'),
    AWS = require("aws-sdk");

AWS.config.update({accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
                           secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                           region: 'us-west-2',
                           endpoint: 'http://localhost:8000'});

var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

var p_CreateTable = {
    TableName : "population",
    KeySchema: [
        { AttributeName: "year", KeyType: "HASH"},  //Partition key
        { AttributeName: "age", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "year", AttributeType: "N" },
        { AttributeName: "age", AttributeType: "N" }
    ],

    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    }
};

var populationid = 0;

var p_deleteTable = {
    TableName: 'population'
};

     
dynamodb.deleteTable(p_deleteTable, function(err, data) {
    if (err) {
        console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));

    } else {
            //createTable 
            dynamodb.createTable(p_CreateTable, function(err, data) {
                if (err) {
                    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                } else {
                     var allData = JSON.parse(fs.readFileSync('./sampledata/population.json', 'utf8'));
                        allData.forEach(function(population) {
                            var p_SeedTable = {
                                TableName: "population",
                                Item: {
                                    "year":  population.year,
                                    "age": population.age,
                                    "sex":  population.sex,
                                    "people": population.people
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