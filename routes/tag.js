const router = require('express').Router();
const controller = require('../controller/tag');
const {saveFile} = require ('../utils/gallery');
const {TagSchema, AllSchema} =require ('../utils/schema')
const { validateBody,validationToken, validateParam } = require('../utils/validator');

router.get('/',controller.all)
router.post('/',[validationToken,saveFile,validateBody(TagSchema.add),controller.add])

router.route('/:id')
    .get(validateParam(AllSchema.id,"id"),controller.get)
    .patch(validationToken,validateParam(AllSchema.id,"id"),controller.patch)
    .delete(validationToken,validateParam(AllSchema.id,"id"),controller.drop)


module.exports = router;