const router = require('express').Router();
const wrap = require('express-async-wrapper');

const { apartmentsFacade } = require('../facade');

router.route('/').post(
  wrap(async (req, res) => {
    let result = await apartmentsFacade.getAllFilteredApartments(req.body);

    res.send({ ...result });
  })
);

router.route('/add').post(
  wrap(async (req, res) => {
    let result = await apartmentsFacade.saveApartments();

    res.send({ ...result });
  })
);

module.exports = router;
