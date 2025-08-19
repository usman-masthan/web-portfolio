import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  description: String,
  socialLinks: [{ url: String, icon: String }],
  profileImage: String,
  cvUrl: String,
});

const Profile = mongoose.models.Profile || mongoose.model('Profile', profileSchema);

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable');
  }

  if (mongoose.connections[0].readyState) return;

  try {
    // These options are no longer needed in recent versions of the driver
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