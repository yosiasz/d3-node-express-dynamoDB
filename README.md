# Chart Stack
A simple repo to demo use of data from dynamoDB to plot
charts using D3.js with a rest api with express.js

## Dependencies
NodeJS runs the server-side of the app. dynamoDB is used for storing population data to be displayed on graphs.
connect-dynamodb talks to the database

##### 1. [aws-sdk](https://www.npmjs.com/package/aws-sdk)
##### 2. [express.js](https://www.npmjs.com/package/express)
##### 3. [d3.js](https://www.npmjs.com/package/d3)

### Setting up database
Make sure you initialize dynamodb before running. 

#### Windows

1. Refer to [Detailed installation guides](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html) to set up a dynamoDB instance. Go to http://localhost:8000/shell/

http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html

2. Change config to point to your DynamoDB server. This sample uses DynamoDBLocal NOT TO BE USED IN PROD!!!

## Project Setup and Running Server
#### 1. Initial Setup
```bash
git clone https://github.com/yosiasz/d3-node-express-dynamoDB.git
cd d3-node-express-dynamoDB/
npm install -g nodemon
npm install
```

#### 4. Running the server
This will use node to launch the server:
```bash
npm start
```
To seed your DynamoDBLocal with sample population data. Watch console and fix any issues accordingly. 
```bash
http://localhost:5000/seed
```
Leave the server running, and now you can access [http://localhost:5000/](http://localhost:5000/).
