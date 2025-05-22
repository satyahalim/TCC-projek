import Event from "../models/EventModel.js";

async function getEvents(req,res) {
    try {
        const result = await Event.findAll()
        return res.status(200).json({
            status: "Success",
            message: "Event retrieved",
            data : result
        })
    } catch (error) {
        console.log({
            status: "error",
            message: error.message
        })
    } 
}

async function getEventsById(req,res) {
    try {
        const result = await Event.findOne({
            where:{
                id: req.params.id
            }
        })
        if(!result){
            const error = new Error("Event tidak ditemukan")
            throw error
        }
    } catch (error) {
        console.log(error.message)
    }   
}

async function createEvents(req,res) {
    try {
        await Event.create(req.body)
        return res.status(201).json({
            status: "Success",
            message: "Event created",
        })
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
        res.status(200).json({
            status: "Success",
            message: "Event updated",
        })
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