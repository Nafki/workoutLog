let Express = require('express');
let router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const {LogModel} = require('../models');

router.post("/", validateJWT,async(req, res) =>{ // no need to put log because it is already in app.js
    const {description, definition, result} = req.body.log
    //console.log('logpost', req.body.log )
    //res.send("log post called" , owner_id, description, definition, result)
    const { id } = req.user;
    //console.log('myreq', req)
    const logEntry = {
    description,
    definition,
    result,
    owner_id: id
    }
    try {
    const newLog = await LogModel.create(logEntry);
    res. status(200).json(newLog);
    } catch (err) {
    res.status(500).json({ error: err });
    }
    LogModel.create(LogEntry)
    });
    
router.get("/", async(req, res) =>{
    //res.send("log get called")
    try {   
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
        } catch (err) {
        res.status(500).json({ error: err });
        }
    });
    
router.get("/:id", async(req, res) =>{
        //res.status(200).send("log get by id called "+ req.params.id )
        const { id} = req.params;
        try {
        const results = await LogModel.findAll({
            where: { id: id }
            });
            res.status(200).json(results);
            } catch (err) {
            res.status(500).json({ error: err });
            }
        });

router.put("/:id",validateJWT, async(req, res) =>{
        //res.send("log put by id called " + req.params.id )
        const { description, definition, result} = req.body.log;
        const logId = req.params.id;
        const userId = req.user.id;
       // console.log('updatworklog', req.body, req.params, req.user)
        const query = {
        where: {
        id: logId,
        owner_id: userId
        }
        };
        
        const updatedLog = {
            description: description,
            definition: definition,
            result: result
        };
        
        try {
        
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
        } catch (err) {
        res.status(500).json({ error: err });
        }

        });

router.delete("/:id",validateJWT, async(req, res) =>{
        //res.send("log delete by id called " + req.params.id)
        const ownerId = req.user.id;
        const logId = req.params.id;
        try {
        const query = {
            where: {
                id: logId,
                owner_id: ownerId
            }
            };
            await LogModel.destroy(query);
            res.status(200).json({ message: "Log Entry Removed" });
            } catch (err) {
            res.status(500).json({ error: err });
            }
        });       


    module.exports = router;