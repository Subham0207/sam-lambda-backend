const aws = require("aws-sdk");
// document client -- interface of DyanmoDB
const ddb = new aws.DynamoDB.DocumentClient();

exports.client = async (params) => {
  try {
    const response = await ddb.update(params).promise();
    return response;
  } catch (err) {
    return err;
  }
};
