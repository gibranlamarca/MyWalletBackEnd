const express = require("express");
const cors = require("cors");
const app = express();
const usersController = require('./controllers/usersController');
const authMiddleware = require("./middlewares/authMiddleware");


app.use(cors());
app.use(express.json());

app.post("/signup", usersController.postSignUp);
app.post("/signin", usersController.postSignIn);

app.post("/registros", authMiddleware);

app.listen(3000);