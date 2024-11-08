exports.handler = async (event, context) => {
  try {
    var response = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello, World." }),
    };
    return response;
  } catch (err) {
    console.log(err);
  }
};
