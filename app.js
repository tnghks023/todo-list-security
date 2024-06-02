const express = require("express");
const path = require("path");

const app = express();

app.set("port", process.env.PORT || 5000);

// app.use(express.static(path.join(__dirname, "todolist_frontend/dist")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/todolist_frontend/dist/index.html"));
// });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "todolist_frontend/dist")));

// The "catchall" handler: for any request that doesn't match one above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "todolist_frontend/dist/index.html"));
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중..");
});
