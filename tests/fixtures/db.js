const User = require("../../src/models/user");
const Task = require("../../src/models/task");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "Mike",
    email: "mike@gmail.com",
    password: "1234567",
    tokens: [
        {
            token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
        }
    ]
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "Lynn",
    email: "lynn@gmail.com",
    password: "1234567",
    tokens: [
        {
            token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
        }
    ]
};

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 1",
    completed: false,
    owner: userOne._id
};

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 2",
    completed: true,
    owner: userOne._id
};

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 3",
    completed: false,
    owner: userTwo._id
};

const taskFour = {
    _id: new mongoose.Types.ObjectId(),
    description: "Task 4",
    completed: true,
    owner: userTwo._id
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();

    await new User(userOne).save();
    await new User(userTwo).save();

    await new Task(taskOne).save();
    await new Task(taskTwo).save();
    await new Task(taskThree).save();
    await new Task(taskFour).save();
};

module.exports = {
    userOneId,
    userOne,
    userTwo,
    taskOne,
    setupDatabase
};
