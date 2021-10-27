import Mongoose from 'mongoose';
const { Schema } = Mongoose;

const TokenModel = new Mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export default Mongoose.model('Token', TokenModel);
