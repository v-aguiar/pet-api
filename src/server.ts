import chalk from "chalk";

import app, { init } from "./index.js";

const PORT = process.env.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    console.log(
      chalk.bold.greenBright("\n🚀 Server is running!") +
        chalk.bold.cyanBright("\n\nListening on port " + PORT + "...\n")
    );
  });
});
