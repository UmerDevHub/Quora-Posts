const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const path = require("path");
const {v4 : uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname , "public")));

let posts = [
    {
        id : uuidv4()
,
        username : "Umer",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "Talha",
        content : "I love choti"
    },
    {
        id : uuidv4(),
        username : "Uzair",
        content : "I love short hairs"
    },
];


app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new" ,(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req,res)=>{
    // console.log(req.body);
    // res.send("post req working");

    let{username , content} = req.body;

    let id  = uuidv4();
    posts.push({id ,username, content});

    // By default send get request
    res.redirect("/posts");

})

app.get("/posts/:id", (req, res)=>{

    let {id } = req.params;
    console.log(id);
    

    let post = posts.find((p)=> id == p.id);

    res.render("show.ejs",{post});

})


app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let { newContent } = req.body;

    let post = posts.find((p) => id == p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit.ejs" , {post});
});


app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);

    res.redirect("/posts");
});
