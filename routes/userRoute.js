const express = require("express");
const router = express.Router();
const User = require("../models/user")

router.post("/register", async(req, res) => {
  
    const {name , email , password} = req.body

    const newUser = new User({name , email , password})

    try {
        newUser.save()
        res.send('User Registered successfully')
    } catch (error) {
         return res.status(400).json({ message: error });
    }

});


router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {
        
        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name , 
                email : user[0].email, 
                isAdmin : user[0].isAdmin, 
                _id : user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});


router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/rewards", async(req, res) => {

    const {email} = req.body
    try {
        const user = await User.find({email:email})
        res.send(user)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.put("/updatereward", async(req, res) => {

    const {email,reward} = req.body;
    var new_reward = reward + 100;
    try {
        const user = await User.findOneAndUpdate({email:email},{$set:{rewards: new_reward}});
        //console.log(user);
        res.send("successful");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.put("/reducereward", async(req, res) => {

    const {email,reward} = req.body;
    var new_reward = reward;
    if(reward >= 100){
        new_reward = reward - 100;
    }
    
    try {
        const user = await User.findOneAndUpdate({email:email},{$set:{rewards: new_reward}});
        console.log(new_reward);
        res.send("successful");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.put("/updateUserRoleAndRegistrationStatus", async(req, res) => {
    console.log(req, res);
    const {email} = req.body;
    try {
        const user = await User.findOneAndUpdate({email:email},{$set:{isRegistered: true,role:"farmer"}});
        res.send("successful");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.put("/updatePilotRoleAndRegistrationStatus", async(req, res) => {
    console.log(req, res);
    const {email} = req.body;
    try {
        const user = await User.findOneAndUpdate({email:email},{$set:{isRegistered: true,role:"pilot"}});
        res.send("successful");
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});



module.exports = router