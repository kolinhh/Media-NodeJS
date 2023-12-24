const DB = require('../models/tag');
const Helper = require("../utils/helper");


const all = async (req, res, next) => {
    let tags = await DB.find();
    Helper.fMsg(res, "All tags", tags)
}

const get = async (req, res, next) => {
    let tag = await DB.findById(req.params.id)
    if (tag) {
        Helper.fMsg(res, "Single tag", tag)
    } else {
        next(new Error("No user with that id"))
    }
}

const add = async (req, res, next) => {
    let dbTag = await DB.findOne({ name: req.body.name })
    if (dbTag) {
        next(new Error("Tag name is already exit"))
    } else {
        let result = await new DB(req.body).save();
        Helper.fMsg(res, "Tag name is added", result)
    }
}

const patch = async (req, res, next)=>{
    let dbTag = await DB.findById(req.params.id)
    if(dbTag){
        let result = await DB.findByIdAndUpdate(dbTag._id, req.body)
        dbTag = await DB.findById(req.params.id)
        Helper.fMsg(res,"Tag is updated", result)
    }else{
        next(new Error("No user with that id sir"))
    }
}

const drop = async (req, res, next)=>{
    let tag = await DB.findById(req.params.id)
    if(tag){
        await DB.findByIdAndDelete(req.params.id)
        Helper.fMsg(res, "Tag is deleted", tag)
    }else{
        next (new Error("No user with that id sir"))

    }

}

module.exports = {
    all,
    get,
    add,
    patch,
    drop

}