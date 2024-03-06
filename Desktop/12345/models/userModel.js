const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :
    {
        type:String
        ,required:true
    },
    email :
    {
        type:String
        ,required:true
    },
    password :
    {
        type:String
        ,required:true
    },
    clients: {
     
        type:Array,
 
        default: [],
        ref : "Member"        
    },
    isAdmin :
    {
     type:Boolean,
        default: true
    } ,
    
    seenNotifications: {
       type:Array,
       default: [],
    },
    unseenNotifications: {
        type:Array,
        default: [],
     }
},{
    timestamps: true

})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
