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

exports.getItem = async (params) => {
  try {
    const response = await ddb.get(params).promise();
    return { Attributes: response.Item };
  } catch (err) {
    return err;
  }
};
