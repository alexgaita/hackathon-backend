const router = require('express').Router()
const wrap = require('express-async-wrapper')

const { inputFacade } = require('../facade')

router.route('/')
    .get(wrap(async (req, res) => {
        let result = await inputFacade.findAndCountAll()

        res.send({ ...result })
    }))
    .post(wrap(async (req, res) => {
        let result = await inputFacade.create(req.body)

        res.send({ ...result })
    }))

router.route('/:ID')
    .patch(
        wrap(async (req, res) => {
            let result = await inputFacade.edit(req.params.ID, req.body)

            res.send({ ...result })
        })
    )
    .get(
        wrap(async (req, res) => {
            let result = await inputFacade.findById(req.params.ID, req.auth.id)

            res.send(result)
        })
    )
    .delete(
        wrap(async (req, res) => {
            await inputFacade.delete(req.params.ID)

            res.send({ success: true })
        })
    )

module.exports = router