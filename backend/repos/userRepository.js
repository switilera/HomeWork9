let users = [];

class UserRepository {
  constructor() {
    this.users = users;
  }

  getAllUsers() {
    return this.users;
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user) {
    const id =
      this.users.length > 0
        ? Math.max(...this.users.map((user) => user.id)) + 1
        : 1;
    const newUser = { id, ...user };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updatedUser) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    this.users[userIndex] = { id, ...updatedUser };
    return this.users[userIndex];
  }

  deleteUser(id) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }

  getUsersOlderThan(age) {
    return this.users.filter((user) => user.age > age);
  }

  getUsersByDomain(domain) {
    return this.users.filter((user) => user.email.endsWith(`@${domain}`));
  }

  getSortedUsers() {
    return [...this.users].sort((a, b) => a.name.localeCompare(b.name));
  }
}

module.exports = UserRepository;
