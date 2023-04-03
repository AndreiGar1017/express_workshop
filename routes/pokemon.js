const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')

pokemon.post("/",(req,res,next)=>{
    return res.status(200).send(req.body);
});

pokemon.get("/", async(req, res, next)=>{
    const pkmn = await db.query("SELECT * FROM pokemon")
    return res.status(200).json(pkmn);
});

pokemon.get("/:id([0-9]{1,3})", async(req,res,next)=>{
    const id = await db.query("SELECT * FROM pokemon WHERE pok_id ="+ req.params.id);
    return res.status(200).json(id)
    // if(id >= 0 && id <= 150){
    //     return res.status(200).send(pk[req.params.id -1]);
    // }else{
    //     return res.status(404).send("Pokemon no encontrado");
    // };

});

pokemon.get("/:name([A-Za-z]+)",async(req,res,next)=>{
    
    const name = req.params.name;

    const namep = await db.query(`SELECT * FROM pokemon WHERE pok_name = "${name.toLowerCase()}"`);
    return res.status(200).json(namep);

    // condicion ? valor si verdadero : valor si falso
    // const pkmn = pk.filter((p)=>{
    //     return (p.name.toUpperCase() == name.toUpperCase()) && p ; operador ternario
    // });

    // (pkmn.length>0) ? res.status(200).send(pkmn): res.status(404).send("Pokemon no encontrado");
    
});

module.exports = pokemon;

