const DB = require('../models/comment');
const Helper = require('../utils/helper');


const all = async (req, res, next)=>{
    let comment = await DB.find({postId:req.params.id})
    Helper.fMsg(res," All Comments", comment)
}

const add = async (req, res, next)=>{
    let dbComment = await DB.findById(req.params.id)
    if(dbComment){
        next(new Error("This comment is already exit"))
    }else{
       let result = await new DB(req.body).save()
        Helper.fMsg(res,"Comment is added", result)
    }
}

const drop = async (req, res, next)=>{
    let comment = await DB.findById(req.params.id)
    if(comment){
        await DB.findByIdAndDelete(comment._id)
        Helper.fMsg(res, "Comment is already deleted")
    }else{
        next(new Error("No comment with that id sir"))
    }
}

module.exports ={
    all,
    add,
    drop
}