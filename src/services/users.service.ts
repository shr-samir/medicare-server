import * as userModel from '../models/user.model';
// import { IUserData } from '../interfaces/IUserData';

// export const handleLogin = async (loginData: ILoginData) => {
//   const data = authModel.handleLogin(loginData);
//   return data;
// };

// export const handleRegister = async (registrationData: IRegistrationData) => {
//   const data = authModel.handleRegister(registrationData);
//   return data;
// };

export const updateUser = async (updateData: any, id: any) => {
  const data = userModel.updateUser(updateData, +id);
  return data;
};

export const deleteUser = async (id: any) => {
  const data = userModel.deleteUser(+id);
  return data;
};

export const getAllUser = async () => {
  const data = userModel.getAllUser();
  return data;
};

export const createAppointment = async (createData: any, id: any) => {
  try {
    const data = userModel.createAppointment(createData, id);
    return data;
  } catch (err) {
    throw err;
  }
};

export const updateAppointment = async (
  updateData: any,
  appointmentId: any
) => {
  const data = userModel.updateAppointment(updateData, appointmentId);
  return data;
};

export const deleteAppointment = async (id: any) => {
  const data = userModel.deleteAppointment(+id);
  return data;
};

export const getAllDoctors = async () => {
  const data = await userModel.getAllDoctors();
  return data;
};

export const getAllPatientAssociatedwithhimself = async (id: any) => {
  const data = await userModel.getAllPatientAssociatedwithhimself(id);
  return data;
};

export const approvePatientToDoctor = async (status: any, id: any) => {
  const data = await userModel.approvePatientToDoctor(status, id);
  return data;
};

export const updateDoctor = async (updateData: any, id: any) => {
  const data = await userModel.updateDoctor(updateData, id);
  return data;
};

export const createDoctor = async (updateData: any, id: any) => {
  const data = await userModel.createDoctor(updateData, +id);
  return data;
};
