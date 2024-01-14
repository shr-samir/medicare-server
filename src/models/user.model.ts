import { PrismaClient } from '@prisma/client';
import { IUserData } from '../interfaces/IUserData';

const prisma = new PrismaClient();

export const getAllUser = async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        status: 'APPROVED',
      },
    });
    const patients = await prisma.user.findMany({
      where: {
        role: 'PATIENT',
      },
    });
    return {
      message: 'All Users',
      data: {
        doctors: doctors,
        patients: patients,
        no_of_doctors: doctors.length,
        no_of_patients: patients.length,
      },
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const updateUser = async (body: any, id: any) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });
    console.log(user);
    return {
      message: `User ${id} Updated`,
      user: user,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const deleteUser = async (id: any) => {
  try {
    console.log('Deleteing User');
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return {
      message: `User ${id} Deleted`,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const createAppointment = async (body: any, id: any) => {
  // const currentTime =  new Date(Date.now())
  const dataTime = new Date(body.data_time);
  const oneHrEarlier = new Date(dataTime.getTime() - 60 * 60 * 1000);

  try {
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        AND: [
          {
            data_time: {
              gte: oneHrEarlier,
            },
          },
          {
            data_time: {
              lt: dataTime, // Adding 1 hour to the specified time
            },
          },
        ],
      },
    });

    console.log('Existing Appointments : ', existingAppointments);

    if (existingAppointments.length > 0) {
      throw new Error('Time slot not available');
    }

    const appointment = await prisma.appointment.create({
      data: {
        ...body,
        patientId: id,
      },
    });

    return {
      message: `Appointment created`,
      appointment: appointment,
    };
  } catch (err) {
    console.log('ERR :', err);
    throw err;
  }
};

export const updateAppointment = async (body: any, appointmentId: any) => {
  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        ...body,
        updatedAt: new Date(Date.now()),
      },
    });
    return {
      message: `${appointmentId} Appointment Updated`,
      appointment: appointment,
    };
  } catch (err) {
    console.log('ERR :', err);
  }
};

export const deleteAppointment = async (id: any) => {
  try {
    console.log('Deleteing User');
    await prisma.appointment.delete({
      where: {
        id: id,
      },
    });
    return {
      message: `Appointment ${id} Deleted`,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const getAllDoctors = async () => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: {
        is_available: true,
        status: 'APPROVED',
      },
    });
    return {
      message: 'doctors found',
      doctors: doctors,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const getAllPatientAssociatedwithhimself = async (id: any) => {
  const userId = id;
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        userId: userId,
      },
    });
    const doctorId = doctor?.id;
    const patients = await prisma.appointment.findMany({
      where: {
        doctorId: doctorId,
      },
    });
    return {
      message: `Patients for ${doctorId} doctors found`,
      doctors: patients,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const approvePatientToDoctor = async (status: any, id: any) => {
  try {
    const updated = await prisma.doctor.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });
    return {
      message: 'Status Changed',
      updated: updated,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const updateDoctor = async (updateData: any, id: any) => {
  console.log('Data : ', updateData);
  console.log('Id to update', id);
  try {
    const doctor = await prisma.doctor.findUnique({
      where: {
        userId: id,
      },
    });
    const userId = doctor?.id;
    const updated = await prisma.doctor.update({
      where: {
        id: userId,
      },
      data: {
        ...updateData,
      },
    });
    return {
      message: 'Doctor Self Profiled Changed',
      updated: updated,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};

export const createDoctor = async (createDoctorData: any, id: any) => {
  try {
    const doctor = await prisma.doctor.create({
      data: {
        ...createDoctorData,
        userId: id,
      },
    });
    return {
      message: 'Doctor Applied',
      doctor: doctor,
    };
  } catch (err) {
    return 'Error occured : ' + err;
  }
};
