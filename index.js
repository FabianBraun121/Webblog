import express from "express";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
})

app.get("/writeBlog", (req, res) => {
  res.render("writeBlog.ejs");
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
