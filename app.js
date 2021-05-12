const express= require("express");
const app = express();
const PORT = 3000;

const userhandleRouter = express.Router();

const allproducts =express.Router();



const users = ["John", "Mark"];
const products=["Kyebord","Mouse"];

app.use(express.json());

app.get("/",(req,res)=>{

    console.log("Hello");
    res.json("hi")

});

app.use((req,res,next)=>{
    console.log(users);
    next()

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


// app.get("/users", (req, res, next) => {
    
//     if(users.length===0){
//         const err = new Error("Array is empty");
//         err.status = 500;
//         next(err)
//     }
//     else{
//         res.json(users);
//     };
  
    
//   });

 

  //Create a new express router to handel all requests to /users,
  // and use it in the application, the endpoint /users should return all users.
  userhandleRouter.get("/users", (req, res,next) => {
    if(users.length===0){
        const err = new Error("Array is empty");
        err.status = 500;
        next(err)
    }
    else{
        res.json(users);
    };
  });


  app.use(userhandleRouter)

  allproducts.get("/products",(req,res,next)=>{
    products.pop("Mouse");
    products.push("Speaker")
    console.log(req.method);
    res.send(products);
  });
  
  const methodType = (req, res, next) => {
    
    next();
  };
  app.use("/products",methodType);
  app.use(allproducts);

  app.get("/", (req, res, next) => {
    const err = new Error("Internal server error");
    err.status = 500;
    next(err);
  });
  app.get("/", (req, res, next) => {
    const err = new Error("Internal server error");
    err.status = 404;
    next(err);
  });
  app.get("/", (req, res, next) => {
    const err = new Error("Internal server error");
    err.status = undefined;
    next(err);
  });

  app.use((err,req,res,next)=>{

    res.status(err.status);
  
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
  });



app.listen(PORT,(req,res)=>{
    console.log(`Working on ${PORT}`);
})