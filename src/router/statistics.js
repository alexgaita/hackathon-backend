const router = require('express').Router()
const wrap = require('express-async-wrapper')

const { statisticsFacade } = require('../facade')

router.route('/searched-cities')
    .get(wrap(async (req, res) => {
        let result = await statisticsFacade.getMostSearchedCities(req.auth.id)

        res.send({ ...result })
    }))

router.route('/accommodations-searched-cities')
    .get(wrap(async (req, res) => {
        let result = await statisticsFacade.getAccommodationsForMostSearchedCities(req.auth.id)

        res.send({ ...result })
    }))

module.exports = router