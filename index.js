import express from "express";
const app = express();
const port = 8080;
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.get("/", (req, res) => {});

app.listen(port, (err) => {
  if (err) {
    console.log("error:", err.data);
  } else {
    console.log(`API works on port: ${port}`);
  }
});
