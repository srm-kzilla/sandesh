import "source-map-support/register";
import "dotenv/config";

import { createServer } from "./server/server";

const server = createServer();

const port = process.env.PORT || 5050;
server.listen(port, () => {
  console.log("Started on port", port);
});
