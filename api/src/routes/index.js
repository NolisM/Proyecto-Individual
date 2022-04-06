const { Router } = require('express');
var express = require("express");
const getdogs = require( './dogsRouter.js')
const dogsRouter = require('./dogsRouter')
const temperamentRouter=require('./temperamentRouter')


const router =express();

const breeds =[]
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRouter);

router.use('/temperament', temperamentRouter);

module.exports = router;

