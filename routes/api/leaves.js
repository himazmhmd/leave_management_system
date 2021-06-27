const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
// Post model
const Leave = require('../../models/Leave');
// Profile model
const Profile = require('../../models/Profile');
// User model
const User = require('../../models/User');

 //Validation../../client/src/services/mail
const validateLeaveInput = require('../../validation/leave');

// @route   GET api/leave/test
// @desc    Tests leave route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Leave Works' }));

// // @route   GET api/leave
// // @desc    Get leave
// // @access  Public
// router.get('/', (req, res) => {
//   Leave.find( )
//     .sort({ date: -1 })
//     .then(leaves => res.json(leaves))
//     .catch(err => res.status(404).json({ noleavesfound: 'No leaves found' }));
// });

// @route   GET api/leave
// @desc    Get leave
// @access  Public
router.get('/:userType', (req, res) => {
  
  if(req.params.userType === 'hod'){
    Leave.find( )
    .sort({ date: -1 })
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ noleavesfound: 'No leaves found' }));
  }
   else if(req.params.userType === 'dean') {
    Leave.find({isHODApproved: true})
    .sort({ date: -1 })
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ noleavesfound: 'No leaves found' }));
  }
   else if(req.params.userType === 'a-r') {
    Leave.find({isDeanApproved: true})
    .sort({ date: -1 })
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ noleavesfound: 'No leaves found' }));
  }
    
});

router.get('/getLeaves/:userId', (req, res) => {
  console.log("paraaams",req.params)
  Leave.find({user: req.params.userId})
    .sort({ date: -1 })
    // .then(leaves => res.json(leaves))
    .then(leaves => res.json(leaves))
    .catch(err => res.status(404).json({ noleavesfound: 'No leaves found' }));
});

// @route   GET api/leave/:id
// @desc    Get leave by id
// @access  Public
router.get('/getOne/:id', (req, res) => {
  console.log("paraaams for Leave",req.params)
  //60ce296074c2091244b58967
  Leave.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noLeavefound: 'No leave found with that ID' })
    );
});

// @route   POST api/leaves
// @desc    Create leave
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateLeaveInput(req.body);

    // Check Validation

    //console.log(isValid);
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
      
    }

    const newLeave = new Leave({
      user: req.user.id,
      applicantName:req.body.applicantName,
      applicantUserType:req.body.applicantUserType,
      leaveType: req.body.leaveType,
      reason: req.body.reason,
      dateTo: req.body.dateTo,
      dateFrom: req.body.dateFrom,
      apointmentDate: req.body.apointmentDate,
      isApproved: req.body.isARApproved,
      location:req.body.location,
      duration:req.body.duration,
      institute: req.body.institute,
      placeToVisit: req.body.placeToVisit,
           
    });
    
    newLeave.save().then(leave => res.json(leave));
   
    console.log("success");
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Leave.findById(req.params.id)
        .then(leave => {
          // Check for post owner
          if (leave.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          leave.remove().then(() => res.json({ success: "Leave deleted" }));
        })
        .catch(err => res.status(404).json({ leavenotfound: 'No leave found' }));
    });
  }
);

router.put('/approve/:id/:userType',passport.authenticate('jwt', { session: false }),(req, res) => {
  

    console.log(req.params.id)
    Leave.findById(req.params.id).then(leave => {
      if (leave) {
        // Update
        console.log(leave)
        if(req.params.userType==='dean'){
          Leave.findOneAndUpdate(
            {_id : req.params.id},
            { isDeanApproved: true }
          )
          .then(leave => res.json(leave))
          .catch(err => res.status(404).json({ leavenotfound: 'No leave found' }));;
        } else if(req.params.userType==='a-r') {
          Leave.findOneAndUpdate(
            {_id : req.params.id},
            { isARApproved: true }
          )
          .then(leave => res.json(leave))
          .catch(err => res.status(404).json({ leavenotfound: 'No leave found' }));;
        } else if(req.params.userType==='hod') {
          Leave.findOneAndUpdate(
            {_id : req.params.id},
            { isHODApproved: true }
          )
          .then(leave => res.json(leave))
          .catch(err => res.status(404).json({ leavenotfound: 'No leave found' }));;
        }
      } 
    });

    
  }
);



router.put('/disapprove/:id/:userType',passport.authenticate('jwt', { session: false }),(req, res) => {
 

  console.log(req.params.id)
  Leave.findById(req.params.id).then(leave => {
    if (leave) {
      // Update
      console.log(leave)
      if(req.params.userType==='dean'){
        Leave.findOneAndUpdate(
          {_id : req.params.id},
          { isDeanApproved: false }
        )
        .then(leave => res.json(leave))
        .catch(err => res.status(404).json({ leavenotfound: 'No leave found' }));;
      } else if(req.params.userType==='a-r') {
        Leave.findOneAndUpdate(
          {_id : req.params.id},
          { isARApproved: false }
        )
        .then(leave => res.json(leave))
        .catch(err => res.status(404).json({ leavenotfound: 'No leave found' }));;
      } else if(req.params.userType==='hod') {
        Leave.findOneAndUpdate(
          {_id : req.params.id},
          { isHODApproved: false }
        )
        .then(leave => res.json(leave))
        .catch(err => res.status(404).json({ leavenotfound: 'No leave found' }));;
      }
    } 
  });

}
);

module.exports = router;