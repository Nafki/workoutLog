const { Module } = require('module');
const {DataTypes} = require('sequelize');
const db = require('../db');

const Log = db.define('log',{
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: true
    },
    result:{
        type: DataTypes.STRING
    } 
    });

    module.exports = Log