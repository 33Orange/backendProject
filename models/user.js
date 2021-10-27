import Mongoose from 'mongoose';

const UserModel = new Mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default Mongoose.model('User', UserModel);
