const router = require('express').Router()
const wrap = require('express-async-wrapper')

const { userFacade } = require('../facade')

router.route('/')
    .get(wrap(async (req, res) => {
        let result = await userFacade.findAndCountAll()

        res.send({ ...result })
    }))
    .post(wrap(async (req, res) => {
        let result = await userFacade.create(req.body)

        res.send({ ...result })
    }))

router.route('/:ID')
    .patch(
        wrap(async (req, res) => {
            let result = await userFacade.edit(req.params.ID, req.body)

            res.send({ ...result })
        })
    )
    .get(
        wrap(async (req, res) => {
            let result = await userFacade.findById(req.params.ID, req.auth.id)

            res.send(result)
        })
    )
    .delete(
        wrap(async (req, res) => {
            await userFacade.delete(req.params.ID)

            res.send({ success: true })
        })
    )

module.exports = router