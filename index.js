require('dotenv').config()
const AWS = require('aws-sdk');

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

AWS.config.update(config);

const kinesis = new AWS.Kinesis();
const partition = 1;

kinesis.putRecord({
  Data: '{"action": "click", "productId": "product-123"}',
  PartitionKey: `partition-${partition}`,
  StreamName: process.env.AWS_FIREHOSE_STREAM
}, function(err, data) {
  if (err) console.log(err, err.stack); 
  else console.log(data);
});