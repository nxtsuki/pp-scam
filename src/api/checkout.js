var paypal = require('paypal-rest-sdk');
var url = require('url');

var config = require("../config");

paypal.configure({
    'mode': config.paypalmode,
    'client_id': config.paypalid,
    'client_secret': config.paypalsecret
});

module.exports = {
    createPayment: (req, res) => {
        var payment = {
            "intent": config.paymentintent,
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": config.returnurl,
                "cancel_url": config.cancelurl
            },
            "transactions": [{
                "amount": {
                    "total": 0.01,
                    "currency": config.currency
                },
                "description": config.description
            }]
        }

        createPay(payment)
        .then( ( transaction )  => {
            var id = transaction.id;
            var links = transaction.links;
            var counter = links.length;

            while( counter -- ) {
                if ( links[counter].method == 'REDIRECT') {
                    return res.redirect( links[counter].href )
                }
            }
        })
        .catch((err) => { 
            console.log( err ); 
            res.redirect(config.cancelurl);
        });
    },
    executePayment: ( req, res ) => {
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        console.log(query.paymentId);
        console.log(query.PayerID)
        
        const execute_payment_json = {
            "payer_id": query.PayerID,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": 50 // € da cashouttare
                }
            }],
        };

        paypal.payment.execute(query.paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error);
                return res.json({
                    success: 0,
                    message: error
                });
            } else {
                return res.json({
                    success: 1,
                    message: "Pagamento avvenuto con successo"
                });
            }
        });
    }
}

var createPay = ( payment ) => {
    return new Promise( ( resolve , reject ) => {
        paypal.payment.create( payment , function( err , payment ) {
         if ( err ) {
             reject(err); 
         }
        else {
            resolve(payment); 
        }
        }); 
    });
}