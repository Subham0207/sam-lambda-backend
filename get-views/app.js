// const axios = require('axios')

const { client, getItem } = require("./client");

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

    console.log(event);
    const cookie = event.headers.Cookie || "no cookie found";

    let response;
    if (cookie !== "viewed=true") {
      //increament views
      const params = {
        TableName: tablename,
        Key: { id: "subham_resume" },
        UpdateExpression: "set #a = #a + :x",
        ExpressionAttributeNames: { "#a": "views" },
        ExpressionAttributeValues: {
          ":x": 1,
        },
        ReturnValues: "ALL_NEW",
      };

      response = await client(params);
    } else {
      //don't increment views just return it.
      const params = {
        TableName: tablename,
        Key: {
          id: "subham_resume",
        },
      };

      response = await getItem(params);
    }
    // { Attributes: { id: 'subham_resume', views: 3 } }

    console.log(response);

    //test expect
    // {
    //   statusCode: 200,
    //   body: JSON.stringify({ Attributes: { id: 'subham_resume', views: 3 } }),
    // }

    return {
      statusCode: 200,
      multiValueHeaders: {
        "Set-Cookie": [
          `viewed=true;SameSite=None; Secure; Expires=${new Date(
            "jan 1 2030"
          ).toUTCString()}`,
        ],
      },
      headers: {
        "Access-Control-Allow-Headers": "Content-Type, Set-Cookie",
        "Access-Control-Allow-Methods": "GET", // Allow only GET request
        "Access-Control-Allow-Origin": `${event.multiValueHeaders.origin[0]}`, // Allow from
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
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
