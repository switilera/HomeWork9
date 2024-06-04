const express = require("express");
const userService = require("../services/userService");

const router = express.Router();

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(STATUS_OK).json(users);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getUserById(parseInt(req.params.id));
    if (user) {
      res.status(STATUS_OK).json(user);
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(STATUS_CREATED).json(newUser);
  } catch (error) {
    if (error.message === "Не все обязательные поля заполнены") {
      res.status(STATUS_BAD_REQUEST).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(
      parseInt(req.params.id),
      req.body
    );
    if (updatedUser) {
      res.status(STATUS_OK).json(updatedUser);
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    if (error.message === "Не все обязательные поля заполнены") {
      res.status(STATUS_BAD_REQUEST).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await userService.deleteUser(parseInt(req.params.id));
    if (deleted) {
      res.status(STATUS_NO_CONTENT).send();
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/age/:age", async (req, res) => {
  try {
    const filteredUsers = await userService.getUsersOlderThan(
      parseInt(req.params.age)
    );
    res.status(STATUS_OK).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/domain/:domain", async (req, res) => {
  try {
    const filteredUsers = await userService.getUsersByDomain(req.params.domain);
    res.status(STATUS_OK).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/sorted", async (req, res) => {
  try {
    const sortedUsers = await userService.getSortedUsers();
    res.status(STATUS_OK).json(sortedUsers);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;

router.get("/:id/cars", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    if (user) {
      const cars = await carService.getCarsByUserId(userId);
      res.status(STATUS_OK).json(cars);
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});
