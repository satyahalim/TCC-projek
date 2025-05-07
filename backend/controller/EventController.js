import Event from "../models/EventModel.js";

async function getEvents(req,res) {
    try {
        const result = await Event.findAll()
        return res.status(200).json(result)
    } catch (error) {
        console.log(error.message)
    } 
}

async function getEventsById(req,res) {
    try {
        const result = await Event.findOne({
            where:{
                id: req.params.id
            }
        })
    } catch (error) {
        console.log(error.message)
    }   
}

async function createEvents(req,res) {
    try {
        await Event.create(req.body)
        return res.status(201).json({msg:"Event has been added"})
    } catch (error) {
        console.log(error.message)
    }   
}

async function updateEvents(req,res){
    try {
        await Event.update(req.body,{
        where:{
            id:req.params.id
        }
        })
        res.status(200).json({msg:"event updated"})
    } catch (error) {
        console.log(error.message)
    }
}

async function deleteEvents(req,res) {
    try {
    await Event.destroy({
        where:{
            id: req.params.id
            }
        })
    res.status(200).json({msg:"event deleted"})
    } catch (error) {
        console.log(error.message)
    }
}

export {getEvents,getEventsById,createEvents,updateEvents,deleteEvents}