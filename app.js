const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET →  Lấy về dữ liệu của toàn bộ users
app.get("/api/v1/users", (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    res.json({ users });
  } catch (error) {
    res.json({ error, status: "fail", message: "invalid path" });
  }
});
// GET →  Lấy về dữ liệu của một user
app.get("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const user = users.find((user) => user.id === id);
    res.json({ users });
  } catch (error) {
    res.json({ error, status: "fail", message: "invalid path" });
  }
});
// POST →  Thêm mới dữ liệu về 1 users vào trong CSDL
app.post("/api/v1/users", (req, res) => {
  const { name, username, email, address, phone, website, company } = req.body;
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const newUser = {
      id: users(users.length - 1).id + 1,
      name,
      username,
      email,
      address,
      phone,
      website,
      company,
    };
    users.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    res.json({ users });
  } catch (error) {
    res.json({ error, status: "fail", message: "invalid path" });
  }
});
// PUT → Chỉnh sửa dữ liệu của 1 user (email)
app.put("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      users[userIndex].email = email;
      fs.writeFileSync("./data/users.json", JSON.stringify(users));
      res.json({ users });
    } else {
      res.json({ status: "fail", message: "User not found" });
    }
  } catch (error) {
    res.json({ error, status: "fail", message: "Invalid path" });
  }
});

// DELETE → Xoá dữ liệu về một user
app.delete("/api/v1/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const users = JSON.parse(fs.readFileSync("./data/users.json", "utf8"));
    const newUsers = users.filter((user) => user.id !== +id);
    res.json({ users: newUsers });
    fs.writeFileSync("./data/users.json", JSON.stringify(newUsers));
  } catch (error) {
    console.log(error);
  }
});

// GET →  Lấy về dữ liệu của một post
app.get("/api/v1/posts/:id", (req, res) => {
  const { id } = req.params;
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    const post = users.find((post) => post.id === id);
    res.json({ posts });
  } catch (error) {
    res.json({ error, status: "fail", message: "invalid path" });
  }
});

// GET → Lấy về dữ liệu của toàn bộ post
app.get("/api/v1/posts", (req, res) => {
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    res.json({ posts });
  } catch (error) {
    res.json({ error, status: "fail", message: "Invalid path" });
  }
});

// POST →  Thêm mới dữ liệu về 1 post vào trong CSDL
app.post("/api/v1/posts", (req, res) => {
  const { UserId, title, body } = req.body;
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    const newPost = {
      UserId,
      id: posts(posts.length - 1).id + 1,
      title,
      body,
    };
    posts.push(newPost);
    fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
    res.json({ posts });
  } catch (error) {
    res.json({ error, status: "fail", message: "Invalid path" });
  }
});
// PUT →  Chỉnh sửa dữ liệu của 1 post ()
app.put("/api/v1/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;
  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    const postIndex = posts.findIndex((post) => post.id === id);
  } catch (error) {
    res.json({ error, status: "fail", message: "Invalid path" });
  }
});

// DELETE → Xoá dữ liệu về một post
app.delete("/api/v1/posts/:id", (req, res) => {
  const { id } = req.params;

  try {
    const posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
      res.json({ posts });
    } else {
      res.json({ status: "fail", message: "Post not found" });
    }
  } catch (error) {
    res.json({ error, status: "fail", message: "Invalid path" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
