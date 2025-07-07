import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import bucket from "../lib/firebase.js";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

// helper function for Firebase Storage uploads (admin SDK)
const uploadToFirebase = async (file, folder) => {
	try {
		const fileExt = file.name.split('.').pop();
		const fileName = `${folder}/${uuidv4()}.${fileExt}`;
		const destination = fileName;
		await bucket.upload(file.tempFilePath, {
			destination,
			public: true,
			metadata: {
				contentType: file.mimetype
			}
		});
		// Clean up temp file
		await fs.unlink(file.tempFilePath);
		// Get public URL
		return `https://storage.googleapis.com/${bucket.name}/${destination}`;
	} catch (error) {
		console.log("Error in uploadToFirebase", error);
		throw new Error("Error uploading to Firebase Storage");
	}
};

/**
 * Admin authentication helper
 * Verifies the user is authenticated and is an admin
 */
const verifyAdminAccess = async (req, res) => {
	const user = AuthService.verifyAuth(req);
	
	if (!user) {
		return { authenticated: false, message: "Unauthorized - you must be logged in" };
	}
	
	const isAdmin = await AuthService.isAdmin(user);
	
	if (!isAdmin) {
		return { authenticated: false, message: "Unauthorized - you must be an admin" };
	}
	
	return { authenticated: true, user };
};

export const createSong = async (req, res, next) => {
	try {
		// Check admin access
		const authResult = await verifyAdminAccess(req);
		if (!authResult.authenticated) {
			return res.status(403).json({ message: authResult.message });
		}
		
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload all files" });
		}

		const { title, artist, albumId, duration } = req.body;
		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		const audioUrl = await uploadToFirebase(audioFile, 'songs');
		const imageUrl = await uploadToFirebase(imageFile, 'images');

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration,
			albumId: albumId || null,
		});

		await song.save();

		// if song belongs to an album, update the album's songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}
		res.status(201).json(song);
	} catch (error) {
		console.log("Error in createSong", error);
		next(error);
	}
};

export const deleteSong = async (req, res, next) => {
	try {
		// Check admin access
		const authResult = await verifyAdminAccess(req);
		if (!authResult.authenticated) {
			return res.status(403).json({ message: authResult.message });
		}
		
		const { id } = req.params;

		const song = await Song.findById(id);

		// if song belongs to an album, update the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id);

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleteSong", error);
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		// Check admin access
		const authResult = await verifyAdminAccess(req);
		if (!authResult.authenticated) {
			return res.status(403).json({ message: authResult.message });
		}
		
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToFirebase(imageFile, 'albums');

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		// Check admin access
		const authResult = await verifyAdminAccess(req);
		if (!authResult.authenticated) {
			return res.status(403).json({ message: authResult.message });
		}
		
		const { id } = req.params;
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAlbum", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	try {
		// Check admin access
		const authResult = await verifyAdminAccess(req);
		if (!authResult.authenticated) {
			return res.status(403).json({ message: authResult.message });
		}
		
		res.status(200).json({ admin: true });
	} catch (error) {
		next(error);
	}
};
