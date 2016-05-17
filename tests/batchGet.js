var AWS = require("aws-sdk");

AWS.config.update({accessKeyId: 'AKIAIOSFODNN7EXAMPLE',
                           secretAccessKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
                           region: 'us-west-2',
                           endpoint: 'http://localhost:8000'});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    RequestItems: { // map of TableName to list of Key to get from each table
        population: {
            Keys: [ // a list of primary key value maps
                {
                    "year": 1850, //(string | number | boolean | null | Binary)
                    // ... more key attributes, if the primary key is hash/range
                },
                // ... more keys to get from this table ...
            ],
            AttributesToGet: [ // option (attributes to retrieve from this table)
                'age',
                'sex',
                'people'
                // ... more attribute names ...
            ],
            ConsistentRead: false, // optional (true | false)
        }
        // ... more tables and keys ...
    },
    ReturnConsumedCapacity: 'TOTAL', // optional (NONE | TOTAL | INDEXES)
};
docClient.batchGet(params, function(err, data) {
        data.Items.forEach(function(pop) {
           console.log(
                pop.year + ": ",
                pop.sex + ": ", 
                pop.people);
        });

});