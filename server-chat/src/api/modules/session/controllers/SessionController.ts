import AppError from '@middlewares/error/AppError';
import UserService from '@modules/user/services/UserService';
import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { container } from 'tsyringe';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const userService = container.resolve(UserService);

    const user = await userService.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password invalid', 401);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Email or password invalid', 401);
    }

    const token = sign(
      { name: user.name, email: user.email },
      String(process.env.TOKEN),
      {
        subject: String(user.id),
        expiresIn: '7d',
      },
    );

    return response.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  }
}
