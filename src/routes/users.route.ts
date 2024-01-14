import { Router } from 'express';
import * as userModel from '../controllers/users.controller';
import { checkRole } from '../middlewares/rbac.middleware';

const router = Router();

router
  .route('/')
  .get(checkRole('PATIENT'), userModel.getAllDoctors) //done
  .post(checkRole('PATIENT'), userModel.createAppointment); //done

router
  .route('/appointment/:id')
  .put(checkRole(['PATIENT', 'DOCTOR']), userModel.updateAppointment); //done

/**
@route / 
**/
router.route('/apply').post(checkRole('PATIENT'), userModel.applyDoctor);

/**
@route /admin 
**/
router.route('/admin').get(checkRole('ADMIN'), userModel.getAllUser); //done

router
  .route('/admin/:id')
  .put(checkRole('ADMIN'), userModel.approvePatientToDoctor) //done
  .delete(checkRole('ADMIN'), userModel.deleteUser); //done

/**
@route /doctor
**/

router
  .route('/doctor')
  .get(checkRole('DOCTOR'), userModel.getAllPatientAssociatedwithhimself) //done
  .put(checkRole('DOCTOR'), userModel.updateDoctor); //done

// router.route("/doctor/:id")

/**
@route /
@desc updating patients info
      patient can update all data related to himself
**/
router.route('/:id').put(checkRole('PATIENT'), userModel.updateUser); //done

// router
// .route("/appointment")
// // .get(checkRole(["DOCTOR","PATIENT"]),userModel.getAllAppointment)
// .post(checkRole("PATIENT"),userModel.createAppointment)

// router
// .route("/appointment/:id")
// .put(checkRole(["DOCTOR","PATIENT"]),userModel.updateAppointment)
// .delete(checkRole(["DOCTOR","PATIENT"]),userModel.deleteAppointment)

// router
// .route("/:id")
// .put(userModel.updateUser)
// .delete(checkRole("ADMIN"),userModel.deleteUser)

export default router;
