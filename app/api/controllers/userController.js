var userModel = require('../models/userModel.js')
var jwt = require("jsonwebtoken")

module.exports = {
    // create: function (req, res) {
    //     userModel.findOne({ loginID: req.body.loginID }, function (err, user) {
    //         if (err) {
    //             res.send(err);
    //         } else if (user == null) {
    //             var userdata = {
    //                 userName: req.body.userName, loginID: req.body.loginID,
    //                 password: req.body.password, userType: req.body.userType
    //             }
    //             userModel.create(userdata, function (err, result) {
    //                 if (err) {
    //                     res.send(err);
    //                 } else {
    //                     res.json({ status: "success", message: "User Created successfully!!!", data: null })
    //                 }
    //             })
    //         } else {
    //             res.json({ status: "error", message: "User Already Available!!!", data: null })
    //         }
    //     })
    // },

    // create: function (req, res) {
    //     userModel.findOne({ loginID: req.body.loginID }, function (err, user) {
    //         if (err) {
    //             res.send(err);
    //         }

    //         else {
    //             if (!user) {
    //                 let userData=new userModel(req.body)
    //                 userModel.create(userData, function (err, result) {
    //                     if (err) {
    //                        return res.send(err);
    //                     } else {
    //                        return  res.json({ status: "success", message: "User Created successfully!!!", data: null })
    //                     }
    //                 })
    //             }
    //             res.json({ status: "error", message: "User Already Available!!!", data: null })
    //         }
    //     })
    // },
    create: async (req, res) => {
        try {
            let finduser = await userModel.findOne({ loginID: req.body.loginID });
            if (!finduser) {
                let userData = new userModel(req.body)
                let createUser = await userModel.create(userData);
                return res.json({ status: "success", message: "User Created successfully!!!", data: createUser })
            }
            res.json({ status: "error", message: "User Already Available!!!", data: null })
        }
        catch (err) {
            res.send(err);
        }

    },

    // authenticate: async (req, res) => {
    //     try {
    //         let finduser = await userModel.findOne({ loginID: req.body.loginID,password:req.body.password })
    //         if (!finduser) {
    //             throw{ Status: "error", message: "Invalid LoginID/Password" }
    //         } else {
    //                 const token = jwt.sign({ _id: finduser._id }, req.app.get('secretkey'),
    //                     { expiresIn: "1h" });
    //                 return res.json({ status: "Success", data: { user: finduser, token: token } })
    //         }

    //     } catch (err) {
    //         res.status(400).send(err)
    //     }

    // }
    // authenticate: function (req, res) {
    //    // console.log("login");

    //     userModel.findOne({ loginID: req.body.loginID }, function (err, user) {
    //         if (err) {
    //             res.send(err)
    //         } else if (user == null) {
    //             res.send({ Status: "error", message: "user is not available" })
    //         } else {
    //             if (req.body.password == user.password) {
    //                 const token = jwt.sign({ _id: user._id }, req.app.get('secretkey'),
    //                     { expiresIn: "1h" });
    //                 res.json({ status: "Success", data: { user: user, token: token } })
    //             } else {
    //                 res.json({ status: "error", message: "Invalid LoginID/Password", data: null })
    //             }
    //         }
    //     })
    // }

    authenticate: async (req, res) => {
        try {
            let finduser = await userModel.findOne({ loginID: req.body.loginID,password:req.body.password  })
            if (!finduser) {
                res.send({ Status: "error", message: "user is not available" })
            } else {
                if (req.body.password == finduser.password) {
                    const token = jwt.sign({ _id: finduser._id }, req.app.get('secretkey'),
                        { expiresIn: "1h" });
                    return res.json({ status: "Success", data: { user: finduser, token: token } })
                }
                res.json({ status: "error", message: "Invalid LoginID/Password", data: null })
            }

        } catch (err) {
            res.send(err)
        }

    }
}