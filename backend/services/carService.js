const CarRepository = require("../repos/carRepository");

const carRepository = new CarRepository();

class CarService {
  getAllCars() {
    return carRepository.getAllCars();
  }

  getCarById(id) {
    return carRepository.getCarById(id);
  }

  createCar(car) {
    if (!car.model || !car.brand || !car.year) {
      throw new Error("Не все обязательные поля заполнены");
    }
    return carRepository.createCar(car);
  }

  updateCar(id, updatedCar) {
    if (!updatedCar.model || !updatedCar.brand || !updatedCar.year) {
      throw new Error("Не все обязательные поля заполнены");
    }
    return carRepository.updateCar(id, updatedCar);
  }

  deleteCar(id) {
    return carRepository.deleteCar(id);
  }
}

module.exports = CarService;
