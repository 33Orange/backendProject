import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import TokenService from './tokenService.js';
import UserDto from '../dtos/user-dto.js';
import tokenService from './tokenService.js';

class userService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`User ${email} already registered`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({ email, password: hashPassword });
    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login() {}

  async logout() {}

  async users() {}
}

export default new userService();
