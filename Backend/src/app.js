const express = require("express");

const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json());

const noteModel = require("./models/note.model");

app.post("/notes", async (req, res) => {
    try {
        console.log("Body received:", req.body);

        const data = req.body;

        const note = await noteModel.create({
            title: data.title,
            description: data.description
        });

        console.log("Saved note:", note);

        res.status(201).json({
            message: "Note created",
            note
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Error creating note"
        });
    }
});

app.get("/notes",async(req,res)=>{
    // .find ->return array of objects or []
    // .findOne-> return one single object or null
    const notes=await noteModel.find();
    // const notes=await noteModel.findOne({
    //     title:"PhysicsWallah"
    // })
        res.status(201).json({
        message: "Note fetched succesfully",
            notes:notes
    });

})

// Task Model ko import karein (agar Mongoose use kar rahe hain)
const Task = require('./models/note.model'); // Aapka path alag ho sakta hai

// Delete Task Route
// Fixed Delete Task Route (Sahi endpoint path ke sath)
app.delete('/notes/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        
        // Note model se delete karne ke liye fine-tuned call
        const deletedTask = await noteModel.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task nahi mila!" });
        }

        res.status(200).json({ message: "Task successfully delete ho gaya!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
app.patch("/notes/:id", async (req, res) => {
    try {
        const id = req.params.id;
        
        // Passing req.body directly allows MongoDB to update whatever fields 
        // the frontend sends (whether it's description, title, or completed status!)
        await noteModel.findOneAndUpdate({ _id: id }, req.body);

        res.status(201).json({
            message: "Note updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error updating note"
        });
    }
});

module.exports = app;