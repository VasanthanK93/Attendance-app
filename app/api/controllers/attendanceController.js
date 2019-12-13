var attendanceModel = require('../models/attendanceModel.js')


module.exports = {
    // signin: function (req, res) {
    //     //console.log("Signin");
    //     var today = new Date(); var year = today.getFullYear; var month = today.getMonth; var date = today.getDate-1
    //     var yDate = date+"/"+month+"/"+year; 
    //     attendanceModel.findOne({loginID: req.body.loginID, logDate: req.body.yDate}, function(err,result){
    //         if(err){
    //             res.send(err)
    //         }else if (result.length > 0){
    //             attendanceModel.findOne({ loginID: req.body.loginID, logDate: req.body.logDate }, function (err, result) {
    //                 //console.log(result);
    //                 if (err) {
    //                     res.send(err);
    //                 } else if (result.length == 0) {
    //                     var attendance = {
    //                         loginID: req.body.loginID,
    //                         logDate: req.body.logDate,
    //                         signInTime: req.body.signInTime,
    //                         attendanceStatus: req.body.attendanceStatus,
    //                         reasonForLeave: req.body.reasonForLeave
    //                     }
    //                     attendanceModel.create(attendance, function (err, attendancedata) {
    //                         if (err) {
        
    //                         } else {
    //                             res.json({ Status: "Success", message: "attendance has been punched for" + attendancedata.logDate, data: { signinDetails: attendancedata } })
    //                         }
    //                     })
    //                 } else {
    //                     res.json({ Status: "error", message: "User has already punched attendance for" + req.body.logDate, data: { signinDetails: result } })
    //                 }
    //             })
    //         }else if(result.length == 0){
    //             res.json({Status: ""})
    //         }
    //     })
        
    // },
    signin: async (req, res) => {
     
    try {
        let signin = await attendanceModel.findOne({loginID: req.body.loginID, logDate: req.body.logDate})
        if (!signin){
            var attendance = {
                loginID: req.body.loginID,
                logDate: req.body.logDate,
                signInTime: req.body.signInTime,
                attendanceStatus: req.body.attendanceStatus,
                reasonForLeave: req.body.reasonForLeave
            }
            var attendancedata = await attendanceModel.create(attendance)
            
            res.json({ Status: "Success", message: "attendance has been punched for" + attendancedata.logDate, data: { signinDetails: attendancedata } })
        }else {
            res.json({ Status: "error", message: "User has already punched attendance for" + req.body.logDate, data: { signinDetails: signin } })
        }

    } catch (error) {
        res.send(error);
    }},
    // signout: function (req, res) {
    //     attendanceModel.findOneAndUpdate({ loginID: req.body.loginID, logDate: req.body.logDate }, { signOutTime: req.body.signOutTime, attendanceStatus: req.body.attendanceStatus },
    //         function (err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.json({ Status: "Success", message: "User has been logged out for" + req.body.signOutTime, data: { attendancedata: result } })
    //             }
    //         })
    // }
    signout: async (req, res) => {
        try{
            var signIn = await attendanceModel.findOne({ loginID: req.body.loginID, logDate: req.body.logDate})
            var signOut = await attendanceModel.findOne({loginID: req.body.loginID, logDate: req.body.logDate,signOutTime: { $exists: true }})//, { signOutTime: req.body.signOutTime, attendanceStatus: req.body.attendanceStatus },{upsert:true})
            if(!signIn){
                res.json({Status: "error", message: "User has not punched attdance for " + req.body.logDate, data: { attendancedata: null }})
            }else if(signIn && !signOut){
                var signoutDetails = await attendanceModel.findOneAndUpdate({loginID: req.body.loginID, logDate: req.body.logDate},{ signOutTime: req.body.signOutTime, attendanceStatus: req.body.attendanceStatus },{upsert:true})
                res.json({ Status: "Success", message: "User has been logged out for" + signoutDetails.logDate + "by" + signoutDetails.signOutTime, data: { attendancedata: signoutDetails } })
            }else if (signIn && signOut)
            res.json({ Status: "error", message: "User has been already logged out for"  + signout.logDate + "by" + signout.signOutTime, data: { attendancedata: signout } })
 }
 catch (error) {
    res.send(error);
}}
}