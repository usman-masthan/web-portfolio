import mongoose from 'mongoose';

const achievementSubSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'Competition', 'Certification'
  title: { type: String, required: true },
  description: String,
  issuer: { type: String }, // e.g., 'Google', 'Hackathon Organizer'
  image: String,
  date: Date
});

const projectSubSchema = new mongoose.Schema({
  domain: { type: String, required: true }, // e.g., 'Frontend', 'Backend'
  title: { type: String, required: true },
  description: String,
  detailedDescription: String, // Longer description for detail page
  image: String, // Main thumbnail
  galleryImages: [String], // Array of image URLs for gallery
  url: String, // Optional general URL
  githubUrl: String, // GitHub repo link
  linkedinUrl: String, // LinkedIn post link
  videoUrl: String, // YouTube video URL
  technologies: [String],
  docs: [{ name: String, url: String }] // Array of document links
});

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  socialLinks: [{ url: String, icon: String }],
  profileImage: String,
  cvUrl: String,
  phone: String,
  email: String,
  projects: [projectSubSchema],
  achievements: [achievementSubSchema]
  // Removed blogs
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable');
  }

  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const profile = await Profile.findOne();
      if (!profile) {
        console.log('No profile found in MongoDB');
        return res.status(404).json({ message: 'Profile not found' });
      }
      res.status(200).json(profile);
    } else if (req.method === 'POST') {
      const existingProfile = await Profile.findOne();
      if (existingProfile) {
        const updatedProfile = await Profile.findOneAndUpdate({}, req.body, {
          new: true,
          runValidators: true
        });
        res.status(200).json(updatedProfile);
      } else {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.status(201).json(newProfile);
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}