import { createApp } from "./app.js";

createApp()
  .then((app) => {
    app.listen(3000, () => {
      console.log(`Server listening on http://localhost:3000`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
