const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

   
    from :
    {
        type:String
        ,required:true
    },
    to :
    {
        type:String
        ,required:true
    },
    message :
    {
        type:String
        ,required:true
    },
    
     
},{
    timestamps: true

})

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;
