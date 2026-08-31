import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Event } from "../models/eventModel.js";
import { User } from "../models/userModel.js";
import { Team } from "../models/teamModel.js"; // <-- Import Team model

export const createanEvent = TryCatch(async (req, res) => {
    const { title, description, date, address, category, difficulty, teamSize } = req.body;
    
    const file = req.file;
    if (!file) return res.status(400).json({ msg: "Image file is required." });
    
    const fileUrl = getDataUrl(file);
    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);
    
    await Event.create({
        title,
        description,
        date,
        Address: address, // using "Address" per model field
        category,
        difficulty,
        teamSize,
        image: {
            id: cloud.public_id,
            url: cloud.secure_url,
        },
        owner: req.user._id,
    });
    
    res.json({ msg: "Event created successfully" });
});

export const getAllEvents = TryCatch(async(req,res)=>{
    const events = await Event.find().sort({createdAt: -1})

    res.json(events);
});

export const getSingleEvent = TryCatch(async(req,res)=>{
    const event = await Event.findById(req.params.id).populate("owner", "-password").populate("participants");

    res.json(event);
})

export const deleteEvent = TryCatch(async(req,res)=>{
   const event = await Event.findById(req.params.id);
   if(!event) return res.status(404).json({msg: "Event not found."});
   if(req.user._id.toString() !== event.owner.toString()) return res.status(403).json(
    {msg: "You are not authorized to delete this event."}
);
    await cloudinary.v2.uploader.destroy(event.image.id);

    await event.deleteOne();

    res.json({msg: "Event deleted successfully" });
});

export const getJoinedEvents = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id).populate('joinedEvents');
  if (!user) return res.status(404).json({ msg: "User not found." });

  res.json(user.joinedEvents);
});

export const getHostedEvents = TryCatch(async (req, res) => {
  const events = await Event.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(events);
});

export const unregisterEvent = TryCatch(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ msg: "User not found." });

  user.joinedEvents = user.joinedEvents.filter(
    (eid) => eid.toString() !== req.params.id
  );
  await user.save();

  res.json({ msg: "Unregistered from event successfully" });
});

export const deleteTeamFromEvent = TryCatch(async (req, res) => {
    const { eventId, teamId } = req.params;
    
    // Find the event
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ msg: "Event not found." });
    
    // Remove the team from the event's participants array
    event.participants = event.participants.filter(
      (id) => id.toString() !== teamId
    );
    await event.save();

    // Delete the team document from the database
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) return res.status(404).json({ msg: "Team not found." });

    res.json({ msg: "Team removed successfully" });
});