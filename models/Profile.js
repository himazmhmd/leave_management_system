const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  
  firstName: {
    type: String,
    
  },
  lastName: {
    type: String,
    
  },
  fullName: {
    type: String,
  
  },
  empId: {
    type: String,
    
  },

  faculty: {
    type: String,
    
  },
  
  phoneNo: {
    type: String,
    
  },
  gender: {
    type: String,
    
  },
  address: {
    type: String,
   
  },
  dob: {
    type: Date,
    
  }
  
  
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
