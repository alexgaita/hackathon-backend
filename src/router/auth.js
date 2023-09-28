const router = require('express').Router()
const wrap = require('express-async-wrapper')
const { body } = require('express-validator')

const { authFacade } = require('../facade')

router.route('/login')
    .post(wrap(async (req, res) => {
        let result = await authFacade.login(req.body.email, req.body.password)

        res.send({ ...result })
    }))

router.route('/register')
    .post(wrap(async (req, res) => {
        let result = await authFacade.registerUser(req.body)

        res.send({ ...result })
    }))

module.exports = router