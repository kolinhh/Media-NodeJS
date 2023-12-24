const DB = require('../models/cat');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
    let cats = await DB.find();
    Helper.fMsg(res, "All categories", cats)
};

const add = async (req, res, next) => {
    let Catdb = await DB.findOne({ name: req.body.name });
    if (Catdb) {
        next(new Error("Name is already in used"))
    }
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Added new photo", result)
}

const get = async (req, res, next) => {
    let cat = await DB.findById(req.params.id)
    Helper.fMsg(res, "Single get photo", cat)
}

const patch = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id)
    if (dbCat) {
        await DB.findByIdAndUpdate(dbCat._id, req.body)
        let result = await DB.findById(dbCat._id)
        Helper.fMsg(res, "Update file", result)
    } else {
        next(new Error("No category id with that sir"))
    }
}

const drop = async (req, res, next) => {
    let dbCat = await DB.findById(req.params.id)
    if (dbCat) {
        await DB.findByIdAndDelete(dbCat._id)
        Helper.fMsg(res, "That was deleted category")
    } else {
        next(new Error("This route have not passed"))
    }
}

module.exports = {
    all,
    add,
    get,
    patch,
    drop
}