import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },
  {
    title: "Stay with Me",
    artist: "Sarah Mitchell",
    imageUrl: "/cover-images/1.jpg",
    audioUrl: "/songs/1.mp3",
    duration: 46, //0:46
  },

]

const seedSongs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing songs
    await Song.deleteMany({});

    // Insert new songs
    await Song.insertMany(songs);

    console.log("Songs seeded successfully!");
  } catch (error) {
    console.error("Error seeding songs:",error);
  } finally {
    mongoose.connection.close();
  }
};
seedSongs();