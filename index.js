import express from "express";
import { LoremIpsum } from "lorem-ipsum";
import { BlogFactory } from "./blogFactory.js";
import { truncateText } from "./utils.js";

const app = express();
const port = 3000;
var blogs = [];

blogs.push(new BlogFactory("My Opinion to the American Election System", new LoremIpsum().generateSentences(55)));
blogs.push(new BlogFactory("Top 10 Methods for the best Garden", new LoremIpsum().generateSentences(55)));
blogs.push(new BlogFactory("Dont Forget to Elongate the Fuse in Fireworks", new LoremIpsum().generateSentences(55)));

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index.ejs",{
    blogs: blogs,
    truncateText: truncateText,
  });
})

app.get("/readBlog", (req, res) => {
  const blog = blogs.find(blog => blog.title === req.query.title);
  if (blog) {
    res.render("readBlog.ejs", { blog });
  } else {
    res.status(404).send("Blog not found");
  }
});

app.get("/writeBlog", (req, res) => {
  res.render("writeBlog.ejs", {
    blogTitle: "",
    blogEntry: "",
  });
});

app.get('/deleteBlog', (req, res) => {
  blogs = blogs.filter(blog => blog.title !== req.query.title);
  res.redirect("/");
});

app.get('/updateBlog', (req, res) => {
  const blog = blogs.find(blog => blog.title === req.query.title);
  blogs = blogs.filter(blog => blog.title !== req.query.title);
  res.render("writeBlog.ejs", {
    blogTitle: blog.title,
    blogEntry: blog.story,
  });
});


app.post("/writeBlog", (req, res) => {
  const newBlogTitle = req.body.blogTitle;
  
  if (blogs.some(blog => blog.title === newBlogTitle)) {
    return res.render("writeBlog.ejs", {
      errorMessage: "Blog title already exists. Please choose a different title.",
      blogTitle: "",
      blogEntry: req.body.blogEntry
    });
  }

  blogs.unshift(new BlogFactory(req.body["blogTitle"], req.body["blogEntry"]));
  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
