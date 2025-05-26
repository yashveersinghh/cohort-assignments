const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_Secret } = require("../config");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    await User.create({
        username: username,
        password: password,
    })
    res.json({
        message: "User created successfully"
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        username,
        password
    })
    if(user){
        const token = await jwt.sign({
            username, role: 'user'
        }, JWT_Secret)
        res.send({
            token: token,
        })
    } else{
        res.json({
            msg: "Incorrect credentials",
        })
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
    res.json({
        courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseId = req.params.courseId;
    await User.updateOne({
        username: username,
    }, {
        "$push": {
            purchasedCourses: courseId,
        }
    });
    res.json({
        message: "Purchase successful!!",
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    try{
        console.log(req.username);
        const user = await User.findOne({
            username: req.headers.username,
        });
        const courses = await Course.findOne({
            _id: {
                "$in": user.purchasedCourses,
            }
        })
        res.json({
            courses: courses,
        })
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router