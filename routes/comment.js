const router = require('express').Router();
const controller = require('../controller/comment');
const { CommentSchema, AllSchema } = require('../utils/schema');
const { validateParam, validationToken, validateBody } = require('../utils/validator');



router.post('/',[validationToken, validateBody(CommentSchema), controller.add] )
router.get('/:id', validateParam(AllSchema.id, 'id'),controller.all)

router.route('/:id')
    .delete( [validationToken, validateParam(AllSchema.id, 'id'), controller.drop])



module.exports = router;