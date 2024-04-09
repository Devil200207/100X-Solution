const { Router } = require("express");
const router = Router();
const {User, Course} = require("../db");
const jwtSecret = 'chandrachudchawan';
const jwt = require('jsonwebtoken');
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        Username: username,
        Password: password
    });

    res.json({
        msg: "User created successfully"
    });
});

router.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = User.find({
        Username: username,
        Password: password
    });

    if(user)
    {
        const token = jwt.sign({ username }, jwtSecret);
        res.json({ token });
    }
    else
    {
        res.status(401).json({
            msg: "Incorrect email and password"
        });
    }

    const token = jwt.sign({ username }, jwtSecret);
});

router.get('/courses', (req, res) => {
    const courses = Course.find({});
    res.json({
        Courses: courses
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const token = req.header.authorization;
    const word = token.split(' ');
    const actualToken = word[1];
    const decodedValue = jsonwebtoken.verify(actualToken, jwtSecret);

    const user = User.findOne(decodedValue.username);
    const course = Course.findOne(courseId);

    if(user && course)
    {
        user.purchasedCourses.push(course);
        user.save();
        res.json({
            msg: "Course purchased successfully"
        });
    }
    else
    {
        res.status(404).json({
            msg: "Can't purchase course"
        });
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const token = req.headers.authorization;
    const word = token.split(" ");
    const actualToken = word[1];
    const decodedValue = jwt.verify(actualToken, jwtSecret);

    // const user = User.findOne({Username:decodedValue.username});
    const user = await User.findOne({ Username: decodedValue.username })
    .select('purchasedCourses')
    .exec();

    console.log(user);
    if(user)
    {
        res.json({
            PurchasedCourses: user
        });
        // if(user.purchasedCourses)
        // {
        //     res.json({
        //         PurchasedCourses: user
        //     });
        //     res.json({
        //         PurchasedCourses: user.purchasedCourses
        //     });
        // }
        // else
        // {
        //     res.json({
        //         msg: "No courses purchased"
        //     });
        // }
    }
    else
    {
        res.status(404).json({
            msg: "No courses purchased"
        });
    }
});

module.exports = router