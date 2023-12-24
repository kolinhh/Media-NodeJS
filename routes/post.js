const router = require('express').Router();
const controller = require('../controller/post');
const { validationToken, validateBody, validateParam } = require('../utils/validator');
const { PostSchema, AllSchema } = require('../utils/schema');
const { saveFile } = require('../utils/gallery');

router.get("/", controller.all)
router.post("/", validationToken, saveFile, validateBody(PostSchema), controller.post)

router.route("/:id")
    .get(controller.get)
    .patch(validationToken, controller.patch)
    .delete(validationToken, controller.drop)

router.get('/bycat/:id', controller.byCatId);
router.get('/byuser/:id', controller.byUserId);
router.get('/paginate/:page', [validateParam(AllSchema.page, 'page'), controller.paginate]);
router.get('/bytag/:id', controller.byTag);




module.exports = router;