const express=require('express')

const productRoute=require('./routes/product')

const sequelize=require('./util/database')

const cors=require('cors')

const bodyParser=require('body-parser')

const app=express()

app.use(cors())

app.use(bodyParser.json({extended:false}))

app.use('/expensetracker',productRoute)


sequelize.sync().then((result)=>{
    app.listen(5000)
})