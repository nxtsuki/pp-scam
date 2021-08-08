const { createPayment, executePayment } = require("./checkout");
const router = require("express").Router();

router.get("/payment", createPayment);
router.get("/success", executePayment);

module.exports = router;