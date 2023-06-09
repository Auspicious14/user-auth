import accountRouter from "./routes/account";
import router from "./routes/userAuth";
const cookieParser = require("cookie-parser");
import express from "express";
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;
const URI =
  "mongodb+srv://Auspicious:auspicious14@auspicious14.nlnhjxf.mongodb.net/Auspicious14?retryWrites=true&w=majority";
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(port, () => console.log(`server is listening on port ${port}`))
  );
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(accountRouter);
