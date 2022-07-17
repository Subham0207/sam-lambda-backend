jest.mock("../client");
const { lambdaHandler } = require("../app");

test("Testing lambdaHandler when viewed", async () => {
  const event = { headers: { Cookie: "viewed=true" } };
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

test("Testing lambdaHandler when not viewed", async () => {
  const event = { headers: { Cookie: "viewed=false" } };
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
