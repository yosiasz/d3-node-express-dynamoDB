var AWS = require("aws-sdk");

AWS.config.update({accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
                           secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                           region: 'us-west-2',
                           endpoint: 'http://localhost:8000'});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
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
console.log("Scanning population table.");
//docClient.scan(params, onScan);

docClient.scan({
    TableName : 'authors',
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



function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(pop) {
           console.log(
                pop.year + ": ",
                pop.sex + ": ", 
                pop.people);
        });

        // continue scanning if we have more movies
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}