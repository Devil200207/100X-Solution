const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://chinmay:chinmay@cluster0.dwpy7.mongodb.net/Course');

// Define schemas
const AdminSchema = new mongoose.Schema({
    Username:String,
    Password:String
});

const UserSchema = new mongoose.Schema({
    Username:String,
    Password:String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageLink: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}