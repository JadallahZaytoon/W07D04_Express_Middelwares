const express= require("express");
const app = express();
const PORT = 3000;


const users = [];


app.use(express.json());

app.get("/",(req,res)=>{

    console.log("Hello");
    res.json("hi")

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
    
    if(users===[]){
        const err = new Error("Array is empty");
        err.status = 500;
    }
    else{
        res.json("users");
    };
  
    res.json(users);
  });

  app.get((err,req,res,next)=>{

    res.status(err.status);
  
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
  });

  //Create a new express router to handel all requests to /users,
  // and use it in the application, the endpoint /users should return all users.
  const userhandle = express.Router();
  userhandle.post("/users", logMethod, (req, res) => {
    res.send(users);
  });



app.listen(PORT,(req,res)=>{
    console.log(`Working on ${PORT}`);
})