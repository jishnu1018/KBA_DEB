const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const routes = require("./routes/routes");
const dotenv = require("dotenv")

dotenv.config();


app.use(
  cors({ 
    
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use("/", routes);

app.listen(process.env.PORT,function(){
  console.log(`sever is listening at ${process.env.PORT}`)
})

mongoose.connect("mongodb://localhost:27017/kba_courses");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});