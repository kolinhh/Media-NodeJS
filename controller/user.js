const DB = require('../models/user');
const Helper = require('../utils/helper');


const login = async (req, res, next) => {
    let pUser = await DB.findOne({ phone: req.body.phone }).select('-__v');
    if (pUser) {
        if (Helper.comparePassword(req.body.password, pUser.password)) {
           let user = pUser.toObject();
           delete user.password;
           user.token = Helper.makeToken(user);
            Helper.fMsg(res, "Login success", user)
        } else {
            next(new Error("Creditial error"))
        }
    } else {
        next(new Error("Creditial error"))

    }
}

const register = async (req, res, next) => {

    let nameUser = await DB.findOne({ name: req.body.name });
    if (nameUser) {
        next(new Error("Name is already exist"));
        return;
    }

    let emailUser = await DB.findOne({ email: req.body.email });
    if (emailUser) {
        next(new Error("Email is already exist"));
        return;
    }

    let phoneUser = await DB.findOne({ phone: req.body.phone });
    if (phoneUser) {
        next(new Error("Phone is already exist"));
        return;
    }

    req.body.password = Helper.encode(req.body.password)
    let result = await new DB(req.body).save();
    Helper.fMsg(res, "Hello new user is coming..", result)

}

module.exports = {
    login,
    register
}