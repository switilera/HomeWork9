const UserRepository = require("../repos/userRepository");

const userRepository = new UserRepository();

class UserService {
  getAllUsers() {
    return userRepository.getAllUsers();
  }

  getUserById(id) {
    return userRepository.getUserById(id);
  }

  createUser(user) {
    if (!user.name || !user.email || !user.age) {
      throw new Error("Не все обязательные поля заполнены");
    }
    return userRepository.createUser(user);
  }

  updateUser(id, updatedUser) {
    if (!updatedUser.name || !updatedUser.email || !updatedUser.age) {
      throw new Error("Не все обязательные поля заполнены");
    }
    return userRepository.updateUser(id, updatedUser);
  }

  deleteUser(id) {
    return userRepository.deleteUser(id);
  }

  getUsersOlderThan(age) {
    return userRepository.getUsersOlderThan(age);
  }

  getUsersByDomain(domain) {
    return userRepository.getUsersByDomain(domain);
  }

  getSortedUsers() {
    return userRepository.getSortedUsers();
  }

  getCarsByUserId(userId) {
    return carRepository.getCarsByUserId(userId);
  }
}

module.exports = UserService;
