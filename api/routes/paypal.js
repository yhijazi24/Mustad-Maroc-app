const router = require("express").Router();
const paypal = require("paypal-rest-sdk");

// PayPal configuration
paypal.configure({
    'mode': 'sandbox', // or 'live' for production
    'client_id': process.env.PAYPAL_ID,
    'client_secret': process.env.PAYPAL_KEY
});

router.post("/payment", (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://yourwebsite.com/success",
            "cancel_url": "http://yourwebsite.com/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Item Name",
                    "sku": "001",
                    "price": req.body.amount,
                    "currency": "MAD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "MAD",
                "total": req.body.amount
            },
            "description": "Payment description"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.status(500).json(error);
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.status(200).json({ approval_url: payment.links[i].href });
                }
            }
        }
    });
});

// Success route after payment approval
router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "MAD",
                "total": req.body.amount
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            res.status(500).json(error);
        } else {
            res.status(200).json(payment);
        }
    });
});

// Cancel route
router.get('/cancel', (req, res) => res.send('Payment canceled'));

module.exports = router;
