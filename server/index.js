const cors = require("cors")
const express = require("express")

const stripe = require("stripe")("pk_test_51L0VzhEIT8lJkSFuvlp5KbRgya8EKCNYYwuYJuuNJwROgNszb8jV2MAraMXA8Vh0wXGyFZ2917oDmbl69RlUr2RT00oGrFGiSX")
const uuid = require("uuid")

const app = express();


//middleware

app.use(express.json())
app.use(cors())

//routes
app.get("/", (req, res) => {
    res.send('working !')
})


app.post("/payment", (req, res) => {

    const {product, token} = req.body;
    console.log('product', product);
    console.log('price', product.price);
    const idempotencyKey = uuid() // only charge user 1 time

    return stripe.customers.create({ // create a stripe customer
        email: token.email,
        source: token.id
    }).then(customer => {  //file request gives customer
        stripe.charges.create({ // charges customer
            amount: product.price * 100, //this is the product price being charged which is passed from the front end 
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
            shipping: {
                name: token.card.name,
                address: {
                    country:token.card.address_country
                }
            }
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result)) // throwing the response to the front end
    .catch(err => console.log(err)) // catching any potential error
})

//listen

app.listen(8282, () => console.log("listening at port 8282"))