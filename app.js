const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
require("./models/db");
const cors = require("cors");

const PORT_URI = process.env.PORT || 4000;
const app = express();
const userRouter = require("./routes/user");
const questionRoutes = require("./routes/questionRoutes");

app.use(express.json());
app.use(bodyparser.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(questionRoutes);

app.listen(PORT_URI, () => {
  console.log(`Server listening on port:${PORT_URI}`);
});
