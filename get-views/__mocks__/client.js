//mocking the client update
exports.client = async (params) => {
  return Promise.resolve({ Attributes: { id: "subham_resume", views: 3 } });
};

exports.getItem = async (params) => {
  return Promise.resolve({ Attributes: { id: "subham_resume", views: 3 } });
};