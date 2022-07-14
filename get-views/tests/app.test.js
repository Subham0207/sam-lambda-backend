jest.mock("../client");
const { lambdaHandler } = require("../app");

test("Testing lambdaHandler", async () => {
  const event = "test event";
  const context = "test context";
  const result = await lambdaHandler(event, context);

  //test expect
  // {
  //   statusCode: 200,
  //   body: JSON.stringify({ Attributes: { id: 'subham_resume', views: 3 } }),
  // }

  expect(result).toBeInstanceOf(Object);
  expect(JSON.parse(result.body)).toStrictEqual({
    Attributes: { id: "subham_resume", views: 3 },
  });
});
