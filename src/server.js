const app = require('.');
const { connectDB } = require('./config/db');
const PORT = 3000;
app.listen(PORT,async ()=>{
    await connectDB();
    console.log('ecommerce is running on PORT',PORT)
})