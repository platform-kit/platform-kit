exports.handler = async (event, context) => {
  var params = event?.queryStringParameters || null;
  var search = "World";
  if (params != null && params.search != null) {
    search = decodeURIComponent(params.search);
  }
  console.log("Input - ", event.body)

  try {
    var response = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Hello, " + search + "!" }),
    };
    return response;
  } catch (err) {
    console.log(err);
  }
};