const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())

const allowedHosts = ["http://localhost:5173"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedHosts.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true // If you're sending cookies or authentication data with the request
};

app.use(cors(corsOptions));
app.get("/",(req,res,next)=>{
    res.json({message:"Hello World!"})
})

const authRouter = require('./routes/auth.route')
app.use('/auth',authRouter)

const userRouter = require('./routes/user.route')
app.use('/api/users',userRouter)

const productRouter = require('./routes/product.route')
app.use('/api/products',productRouter)

const adminProductRouter = require('./routes/adminProduct.route')
app.use('/api/admin/products',adminProductRouter)

const adminOrderRouter = require('./routes/adminOrder.route')
app.use('/api/admin/orders',adminOrderRouter)

const cartRouter = require('./routes/cart.route')
app.use('/api/cart',cartRouter)

const cartItemRouter = require('./routes/cartItems.route')
app.use('/api/cart_items',cartItemRouter)

const orderRouter = require('./routes/order.route')
app.use('/api/orders',orderRouter)

const reviewRouter = require('./routes/review.route')
app.use('/api/reviews',reviewRouter)

const ratingRouter = require('./routes/rating.route')
app.use('/api/ratings',ratingRouter)



module.exports = app