const fs = require("fs");

const Users = [];

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Users</title><head>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="users"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users</title><head>");
    let writeres = "";
    for (i = 0; i < Users.length; i++) {
      writeres += "<li>" + Users[i] + "</li>";
    }
    res.write("<body><ul>" + writeres + "</ul></body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/create-user") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const user = parsedBody.split("=")[1];
      Users.push(user);
      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
};

// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// };

exports.handler = requestHandler;
exports.someText = "Some hard coded text";
