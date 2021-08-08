var config = { }

config.paypalmode = "live"
config.paypalid = "client_id"
config.paypalsecret = "client_secret"

config.paymentintent = "sale"
config.returnurl = "https://localhost:3001/api/success"
config.cancelurl = "http://localhost:3001/error"
config.currency = "EUR"
config.description = "Shoes Shop"

module.exports = config;