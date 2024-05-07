// const express = require("express");
// const bodyparser = require("body-parser");
// const dotenv = require("dotenv");
// dotenv.config();
// require("./models/db");
// const cors = require("cors");

// const PORT_URI = process.env.PORT || 4000;
// const app = express();
// const userRouter = require("./routes/user");
// const questionRoutes = require("./routes/questionRoutes");

// app.use(express.json());
// app.use(bodyparser.json());
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));

// app.use(userRouter);
// app.use(questionRoutes);

// app.listen(PORT_URI, () => {
//   console.log(`Server listening on port:${PORT_URI}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
require("./models/db");
const socketio = require("socket.io"); // Import Socket.io module

const app = express();
const server = require('http').Server(app);
const io = socketio(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://academixaid.vercel.app",
  }
});
const userRouter = require("./routes/user");
const questionRoutes = require("./routes/questionRoutes");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(questionRoutes);


const PORT_URI = process.env.PORT || 4000;
server.listen(PORT_URI, () => {
  console.log(`Server listening on port:${PORT_URI}`);
});

// Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`);

  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});

