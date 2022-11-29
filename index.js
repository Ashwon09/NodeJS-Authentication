const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const imgRoute = require("./routes/imageUpload")
dotenv.config();

app.set('view engine',"ejs");
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection success"))
  .catch((err) => {
    console.log(err);
  });

  app.use(cookieParser());
  app.use(session({
    resave: true,
    saveUninitialized:true,
    secret:"secret" 
  }));
app.use(express.json()); 

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/img", imgRoute);




app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is running at Port " + process.env.PORT  );
});
