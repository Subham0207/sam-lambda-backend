const aws = require("aws-sdk");
// document client -- interface of DyanmoDB
const ddb = new aws.DynamoDB.DocumentClient();

exports.client = async (params) => {
  let response;
  await ddb
    .update(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        response = data;
      }
    })
    .promise();

  return response;
};
