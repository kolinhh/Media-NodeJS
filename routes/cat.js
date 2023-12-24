const router = require('express').Router();
const controller = require('../controller/cat');
const { saveFile } = require('../utils/gallery');
const { AddCat, AllSchema } = require('../utils/schema');
const { validateBody, validateParam, validationToken } = require('../utils/validator');


router.get("/", controller.all);
router.post("/", validationToken, saveFile, validateBody(AddCat), controller.add);


router.route("/:id")
    .get(validateParam(AllSchema.id, 'id'), controller.get)
    .patch(validationToken,saveFile, validateParam(AllSchema.id, 'id'), controller.patch)
    .delete(validationToken, validateParam(AllSchema.id, 'id'), controller.drop)



module.exports = router;