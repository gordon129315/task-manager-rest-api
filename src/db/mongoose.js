const mongoose = require("mongoose");
// const validator = require("validator");

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// const User = mongoose.model("User", {
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true,
//     trim: true,
//     validate(value) {
//       if (!validator.isEmail(value)) {
//         throw new Error("Email is invalid");
//       }
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 7,
//     trim: true,
//     validate(value) {
//       if (value.toLowerCase().includes("password")) {
//         throw new Error("Password cannot cantains 'password'!");
//       }
//     }
//   },
//   age: {
//     type: Number,
//     default: 0,
//     validate(value) {
//       if (value < 0) {
//         throw new Error("Age must be a positive number");
//       }
//     }
//   }
// });

// const me = new User({
//   name: "  Gordon  ",
//   email: "Gordonyuzr@gmail.com   ",
//   password: "  1234567  "
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch(error => {
//     console.log(error);
//   });

// const Task = mongoose.model("Task", {
//   description: {
//     type: String,
//     trim: true,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const task = new Task({
//   description: "   task1"
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch(error => {
//     console.log(error);
//   });
