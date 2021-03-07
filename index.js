require('dotenv').config()
const database = require('./database')
const cors = require('cors');

database();

const ProductsRoutes = require('./routes/products');
const express = require('express');
app = express();
app.use(cors());
app.use(express.json());

app.use(cors({origin: '*'}));

app.use('/products', ProductsRoutes);




app.listen(process.env.PORT, function(){
    console.log(`SERVIDOR CORRIENDO EN PUERTO ${process.env.PORT}`)
})