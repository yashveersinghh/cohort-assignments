const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require('jsonwebtoken');
const {JWT_Secret} = require("../config");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({
        username: username,
        password: password,
    })
    res.json({
        message: "Admin created successfully",
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await Admin.findOne({
        username,
        password
    })
    if(user){
        const token = await jwt.sign({
            username
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

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
    const newCourse = await Course.create({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
    })
    res.json({
        message: "Course created successfully", courseId: newCourse._id
    })    
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    res.json({
        courses: response
    })
});

module.exports = router;