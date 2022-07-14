//mocking the client update
exports.client = async (params) => {
  return Promise.resolve({ Attributes: { id: "subham_resume", views: 3 } });
};
