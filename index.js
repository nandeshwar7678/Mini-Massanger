const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./model/chat.js")
const methodOverride=require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static (path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
main()
.then((req,res)=>{
    console.log("Connection successful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/watsapp");
};

app.get("/chat",async(req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats})
})
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/chat",(req,res)=>{
    let {from, massage ,to }=req.body;
    let newChats= new Chat({
        from:from,
        massage:massage,
        to:to,
        created_at:new Date(),
    });newChats.save().then((req,res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chat");
})

app.get("/chat/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit",{chat});
});

app.put("/chat/:id",async(req,res)=>{
    let{id}=req.params;
    let{massage:newMsg}=req.body;
    let updateChat=await Chat.findByIdAndUpdate(id,
        {massage:newMsg},
    {runValidators:true,new:true}
);
console.log(updateChat);
res.redirect("/chat");
});

app.delete("/chat/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    res.redirect("/chat");
});

app.get("/",(req,res)=>{
    res.send("Server is stering check");
})
app.listen("8080",()=>{
    console.log("Server is start");
})