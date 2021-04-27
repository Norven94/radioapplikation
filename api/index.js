const express = require("express");
const session = require("express-session");

const port = 3001;

const channelRoutes = require("./routes/channelRoutes.js");
const programRoutes = require("./routes/programRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const app = express();
app.use(express.json());

app.use(
  session({
    secret: "TheMusicClub",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto" },
  })
);

app.use("/api/v1/channels", channelRoutes);
app.use("/api/v1/programs", programRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});