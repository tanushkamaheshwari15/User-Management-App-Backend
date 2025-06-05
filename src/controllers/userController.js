const userModel = require("../models/userModel");
const { isValid, isValidName, isValidEmail, isValidContact } = require("./validator");

// add Data
const addUser = async (req, res) => {
    try {
        const userData = req.body;

        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No data provide" })
        }

        // destructure for validation
        const { userName, userEmail, userContact, userAddress, gender, age } = userData;

        // userName validation
        if (!isValid(userName)) {
            return res.status(400).json({ msg: "User Name IS Required" })
        }

        if (!isValidName(userName)) {
            return res.status(400).json({ msg: "Invalid User Name" })
        }

        // UserEmail validation
        if (!isValid(userEmail)) {
            return res.status(400).json({ msg: "User Email is Required" });
        }

        if (!isValidEmail(userEmail)) {
            return res.status(400).json({ msg: "Invalid userEmail" });
        }
        // email uniqness check
        let duplicateEmail = await userModel.findOne({ userEmail });
        if (duplicateEmail) {
            return res.status(400).json({ msg: "EMail Already Exists" })
        }

        // userContact Validation
        if (!isValid(userContact)) {
            return res.status(400).json({ msg: "user phone number required" })
        }

        if (!isValidContact(userContact)) {
            return res.status(400).json({ msg: "Invalid User phone number" })
        }

        let duplicateContact = await userModel.findOne({ userContact });
        if (duplicateContact) {
            return res.status(400).json({ msg: "phone number already exists" })
        }

        // address
        if (!isValid(userAddress)) {
            return res.status(400).json({ msg: "Address is required" })
        }

        // gender
        if (!isValid(gender)) {
            return res.status(400).json({ msg: "Gender is Required" })
        }

        // age
        if (!isValid(age)) {
            return res.status(400).json({ msg: "Age Required" })
        }

        let user = await userModel.create(userData);
        return res.status(201).json({ msg: "User Data Added successfully", user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });
    }
}

// Get data
const getUser = async (req, res) => {
    try {
        // const userData = await userModel.find();
        const userData = await userModel.findOne({ userName: "lucky" });

        return res.status(200).json({ userData });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });
    }
}

// update
const updateUser = async (req, res) => {
    try {
        let userId = req.params.id;
        let data = req.body;

        
        
        let update = await userModel.findByIdAndUpdate(userId, data, { new: true });
        return res.status(200).json({ msg: "User Data Update successfully", update });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal server Error" });
    }
}

module.exports = { addUser, getUser, updateUser };