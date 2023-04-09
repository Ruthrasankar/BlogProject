import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user",router) // url will be like http://localhost:5000/api/user/login
app.use("/api/blog", blogRouter) // http://localhost:5000/api/blog

const mongoose_connection_url = "mongodb+srv://RuthrasankarS:ValliDhevasenaPathi12@cluster0.vxjazto.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoose_connection_url)
.then(() => app.listen(5000,() => console.log("App Working")))
.then(() => console.log("Connected to DataBase and listening to port 5000"))
.catch((error) => console.log(error))
