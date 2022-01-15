import UserService from '@modules/user/services/UserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  public async finById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userService = container.resolve(UserService);

    const user = await userService.findById(request.user.id);

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const form = request.body;

    const userService = container.resolve(UserService);

    await userService.create(form);

    return response.sendStatus(201);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const form = request.body;

    const userService = container.resolve(UserService);

    await userService.update(form, request.user.id);

    return response.send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const userService = container.resolve(UserService);

    await userService.delete(request.user.id);

    return response.send();
  }
}
