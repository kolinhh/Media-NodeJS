const DB = require('../models/post');
const CommentDB = require('../models/comment');
const Helper = require('../utils/helper');


const all = async (req, res, next) => {
    let post = await DB.find()
    Helper.fMsg(res, "All post", post)
}
// .populate('user cat', '-password -__v');

const get = async (req, res, next) => {
    let post = await DB.findById(req.params.id);
    if (post) {
        let comments = await CommentDB.find({postId:post._id});
        post=post.toObject();
        post["comments"] = comments;
        Helper.fMsg(res, "Single post", post)
    } else {
        next(new Error("No post with that id"))
    }
}
const post = async (req, res, next) => {
    let userId = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    let post = await new DB(req.body).save();
    Helper.fMsg(res, "Added post", post)
}
const patch = async (req, res, next) => {
    let post = await DB.findById(req.params.id)
    if (post) {
        await DB.findByIdAndUpdate(post._id, req.body)
        let result = await DB.findById(post._id)
        Helper.fMsg(res, "Post is completed editing", result)
    } else {
        next(new Error("No user with that id sir"))
    }
}
const drop = async (req, res, next) => {
    let post = await DB.findById(req.params.id)
    if (post) {
        await DB.findByIdAndDelete(post._id)
        Helper.fMsg(res, "Post is already deleted")
    } else {
        next(new Error("No post have"))
    }
    res.json({ msg: "Delete post controller" })
}

const byCatId = async (req, res, next) => {
    let posts = await DB.find({ cat: req.params.id })
    Helper.fMsg(res, "All posts is below show", posts)
}
// .populate('user')
const byUserId = async (req, res, next) => {
    let posts = await DB.find({ user: req.params.id }).populate('user')
    Helper.fMsg(res, "All posts by user", posts)
}

const paginate = async (req, res, next) => {
    let page = req.params.page;
    let pages = page == 1 ? 0 : page - 1;
    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * pages;
    let posts = await DB.find().skip(skipCount).limit(limit);
    Helper.fMsg(res, "All posts by paginate", posts)
}

const byTag = async (req, res, next) => {
    let tags = await DB.find({ tag: req.params.id })
    Helper.fMsg(res, "All posts is below show", tags)
}

module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    byCatId,
    byUserId,
    paginate,
    byTag
}

