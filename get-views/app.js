// const axios = require('axios')

const { client } = require("./client");

// const url = 'http://checkip.amazonaws.com/';
// let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  try {
    const tablename = process.env.TABLE_NAME;

    var params = {
      TableName: tablename,
      Key: { id: "subham_resume" },
      UpdateExpression: "set #a = #a + :x",
      ExpressionAttributeNames: { "#a": "views" },
      ExpressionAttributeValues: {
        ":x": 1,
      },
      ReturnValues: "ALL_NEW",
    };

    const response = await client(params);
    // { Attributes: { id: 'subham_resume', views: 3 } }

    console.log(response);

    //test expect
    // {
    //   statusCode: 200,
    //   body: JSON.stringify({ Attributes: { id: 'subham_resume', views: 3 } }),
    // }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET", // Allow only GET request
        "Access-Control-Allow-Origin": "*", // Allow from
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET", // Allow only GET request
        "Access-Control-Allow-Origin": "*", // Allow from
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Data cannot be updated correctly" }),
    };
  }
};
