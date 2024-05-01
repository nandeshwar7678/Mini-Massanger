const mongoose=require("mongoose");
const Chat=require("./model/chat.js");
main().then(()=>{
    console.log("Connection successful on init");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/watsapp");
}

let allChats=[
    {
    from:"ram",
    to:"shyaam",
    massage:"hello deepak how are you",
    created_at:new Date(),
   },
   {
    from:"ramu",
    to:"shyaam",
    massage:"hello deepak how are you",
    created_at:new Date(),
   },
   {
    from:"janu",
    to:"shyaam",
    massage:"hello deepak how are you",
    created_at:new Date(),
   },
];
Chat.insertMany(allChats);