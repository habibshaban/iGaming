import { env } from "./config/env.js";
import { createApp } from "./app.js";

createApp()
  .then((app) => {
    app.listen(env.PORT, () => {
      console.log(`Server listening on http://localhost:${env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
