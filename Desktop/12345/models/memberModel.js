const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({

    boss: {
        type : String
        , required:true
      },
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
    
     
},{
    timestamps: true

})

const memberModel = mongoose.model('members', memberSchema);

module.exports = memberModel;
