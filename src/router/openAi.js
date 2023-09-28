const router = require('express').Router()
const wrap = require('express-async-wrapper')

const { processFacade } = require('../facade')

router.route('/')
    .post(wrap(async (req, res) => {
        let result = await processFacade.processOpenAi(req.body)

        res.send({ ...result })
    }))

module.exports = router