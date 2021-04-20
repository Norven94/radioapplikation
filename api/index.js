express = require("express");

const port = 3001;

const channelRoutes = require("./routes/channelRoutes.js");
// const programRoutes = require("./routes/programRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/channels", channelRoutes);
// app.use("/api/v1/programs", programRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});