const express = require("express");
const carService = require("../services/carService");

const router = express.Router();

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;

router.get("/", async (req, res) => {
  try {
    const cars = await carService.getAllCars();
    res.status(STATUS_OK).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const car = await carService.getCarById(parseInt(req.params.id));
    if (car) {
      res.status(STATUS_OK).json(car);
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: "Машина не найдена" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCar = await carService.createCar(req.body);
    res.status(STATUS_CREATED).json(newCar);
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
    const updatedCar = await carService.updateCar(
      parseInt(req.params.id),
      req.body
    );
    if (updatedCar) {
      res.status(STATUS_OK).json(updatedCar);
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: "Машина не найдена" });
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
    const deleted = await carService.deleteCar(parseInt(req.params.id));
    if (deleted) {
      res.status(STATUS_NO_CONTENT).send();
    } else {
      res.status(STATUS_NOT_FOUND).json({ message: "Машина не найдена" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

module.exports = router;
