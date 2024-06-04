let cars = [];

class CarRepository {
  constructor() {
    this.cars = cars;
  }

  getAllCars() {
    return this.cars;
  }

  getCarById(id) {
    return this.cars.find((car) => car.id === id);
  }

  createCar(car) {
    const id =
      this.cars.length > 0
        ? Math.max(...this.cars.map((car) => car.id)) + 1
        : 1;
    const newCar = { id, ...car };
    this.cars.push(newCar);
    return newCar;
  }

  updateCar(id, updatedCar) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1) {
      return null;
    }
    this.cars[carIndex] = { id, ...updatedCar };
    return this.cars[carIndex];
  }

  deleteCar(id) {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    if (carIndex === -1) {
      return false;
    }
    this.cars.splice(carIndex, 1);
    return true;
  }
  getCarsByUserId(userId) {
    return this.cars.filter((car) => car.userId === userId);
  }
}

module.exports = CarRepository;
