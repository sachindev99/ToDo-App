import express from "express";
import bodyParser from "body-parser";


const app=express();
const port= 3000;
var newItem;
var listItems=[];
var workItems=[];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/work", (req, res) => {
    res.render("index.ejs",{listItems:workItems,heading:"Work Items"});

  });
app.get("/",(req,res) =>{
    const currentDate = new Date();
    const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
    res.render("index.ejs",{listItems,heading:formattedDate});
    
});

app.post("/",(req,res) => {
    // title is defined in index.ejs at submit button 
    if(req.body.title==="Work Items"){
        newItem = req.body["newItem"];
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        newItem = req.body["newItem"];
        listItems.push(newItem);
        res.redirect("/");  
    }
   
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}.`)
});