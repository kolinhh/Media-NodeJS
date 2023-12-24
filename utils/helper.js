const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const fMsg = async (res, msg = "success", result=[]) =>{
    res.status(200).json({
        cons: true,
        msg: msg,
        result: result
    });
}

module.exports = {
    encode : password=> bcrypt.hashSync(password),
    comparePassword: (plain,hash)=> bcrypt.compareSync(plain,hash),
    makeToken : payload=> jwt.sign(payload, process.env.SECRET_KEY,{expiresIn:"1h"}),
    fMsg
};