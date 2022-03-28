require("dotenv").config();
const http = require("http");
require("./database/mongodb")();
const PORT = process.env.PORT || 3000;
const app = require("./app");
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
