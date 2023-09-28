const router = require('express').Router();
const wrap = require('express-async-wrapper');

const { airbnbPopulateFacade } = require('../facade');

router.route('/').post(
  wrap(async (req, res) => {
    let result = await airbnbPopulateFacade.airbnbPopulate();

    res.send({ ...result });
  })
);

module.exports = router;
