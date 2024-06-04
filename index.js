const express = require("express");
const userRouter = require("./controllers/userController");
const carRouter = require("./controllers/carController");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use("/cars", carRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
