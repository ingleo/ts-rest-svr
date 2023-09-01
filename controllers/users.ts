import { Request, Response } from 'express';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ users });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ msg: 'User does not exist' });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const emailExists = await User.findOne({
      where: {
        email: body.email,
      },
    });

    if (emailExists) {
      return res.status(400).json({
        msg: 'User email already exists',
      });
    }

    const user = new (User as any)(body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(400).json({
        msg: 'User does not exist',
      });
    }

    await userExists.update(body);
    res.json(userExists);
  } catch (error: any) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(400).json({
        msg: 'User does not exist',
      });
    }

    await userExists.update({ status: false });
    //await userExists.destroy();
    res.json(userExists);
  } catch (error) {
    res.status(500).json({
      msg: 'Internal server error',
    });
  }
};
