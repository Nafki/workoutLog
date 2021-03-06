const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize/lib/errors"); // for errorhandling
const{UserModel} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async(req, res) =>{
    let {username, password} = req.body.user;
    //console.log("register", req)
    
    try{
    const User = await UserModel.create({ 
        username,
        password: bcrypt.hashSync(password, 13),
    });


    let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24});

    res.status(201).json({
        message: "User successfully registered",
        user: User,
        sessionToken: token
    });
    }catch (err){
        if(err instanceof UniqueConstraintError){
            res.status(409).json({
                messsage: "user already in use",
            });
        }else {
            res.status(500).json({
            message: "Failed to register user" + err,
            });
        }
    }
//res.send("register called")
});

router.post("/login", async(req, res) =>{
//res.send("login called")
let { username, password } = req.body.user;
    
    try{
    let loginUser = await UserModel.findOne({
        where: {
        username: username,
        }
    });
    
        if(loginUser){  //res.status(200).json({ if we get user = null on postman, we fix it by this
    
        let passwordComparison = await bcrypt.compare(password,loginUser.password);
        
        if(passwordComparison){
        let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET , {expiresIn: 60 * 60 * 24});   
        
        res.status(200).json({  
        user:loginUser,
        message: "User successfully logged in!",
        sessionToken: token
        });
    }else {
        res.status(401).json({
            message: "Incorrect username or password"
        })
    }
    }else{
        res.status(401).json({
            message: 'Incorrect username or password'
        });
        }
    }catch(error){
        res.status(500).json({
            message:"Failed to log user in"
        })
    }
});

module.exports = router;