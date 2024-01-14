import { Request, Response } from 'express';
import * as userService from '../services/users.service';

export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const data = await userService.updateUser(updateData, id);

  return res.json(data);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const data = await userService.deleteUser(id);
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const getAllUser = async (req: any, res: Response) => {
  try {
    const data = await userService.getAllUser();
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const createAppointment = async (req: any, res: any) => {
  const user_id = req.user.id;
  const createdata = req.body;
  try {
    const data = await userService.createAppointment(createdata, user_id);
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `${err}`,
      success: false,
    });
  }
};

export const updateAppointment = async (req: any, res: any) => {
  const updatedata = req.body;
  const appointmentId = req.params.id;
  try {
    const data = await userService.updateAppointment(
      updatedata,
      +appointmentId
    );
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const deleteAppointment = async (req: any, res: any) => {
  const id = req.params.id;
  try {
    const data = await userService.deleteAppointment(id);
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const getAllDoctors = async (req: any, res: Response) => {
  try {
    const data = await userService.getAllDoctors();
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const getAllPatientAssociatedwithhimself = async (
  req: any,
  res: Response
) => {
  const self = req.user.id;
  try {
    const data = await userService.getAllPatientAssociatedwithhimself(+self);
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const applyDoctor = async (req: any, res: Response) => {
  const createDoctorData = req.body;
  const self = req.user.id;
  try {
    const data = await userService.createDoctor(createDoctorData, +self);
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const approvePatientToDoctor = async (req: any, res: Response) => {
  const status = req.body.status;
  const id = req.params.id;
  try {
    const data = await userService.approvePatientToDoctor(status, +id);
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};

export const updateDoctor = async (req: any, res: Response) => {
  const selfId = req.user.id;
  const updateData = req.body;
  try {
    const data = await userService.updateDoctor(updateData, +selfId);
    return res.json(data);
  } catch (err) {
    return res.status(404).json({
      message: `Error : ${err}`,
      success: false,
    });
  }
};
