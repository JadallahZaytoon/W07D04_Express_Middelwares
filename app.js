const express= require("express");
const app = express();
const PORT = 3000;


const users = ["John", "Mark"];


app.use(express.json());

app.get("./",(req,res)=>{

    console.log("Hello");

});

const logUsers = (req,res,next)=>{
    console.log(users);
    next();
};



const logMethod=(req,res,next)=>{
    console.log(req.method);
    next();
};

app.use("/users",logMethod);


app.get("/users", (req, res, next) => {
    res.json(users);
  });

  app.get("/",(req,res,next)=>{

    const err= new Error("Error server");
    err.status=500;
    next(err);
  })
  

app.listen(PORT,(req,res)=>{
    console.log(`Working on ${PORT}`);
})