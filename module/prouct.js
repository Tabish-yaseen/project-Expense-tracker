const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const Product=sequelize.define('expensetracker',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
        allowNull:false,
    },
    expenseAmount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false,
    }


})
module.exports=Product