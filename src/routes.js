import { Router } from 'express'

import UserController from './controller/UserController'
import ClinicController from './controller/ClinicController'
import DoctorController from './controller/DoctorController'
import ConsultController from './controller/ConsultController'
import AuthController from './controller/AuthController'
import { AuthMiddleware } from './middlewares/auth'
import ProfessionalController from './controller/ProfessionalController'
import PatientController from './controller/PatientController'
import ProcedimentTypeController from './controller/ProcedimentTypeController'
import ProcedimentController from './controller/ProcedimentController'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ hello: 'world' })
})

router.route('/user')
  // .get(UserController.findAllUsers)
  .get(AuthMiddleware, UserController.findAllUsers);


router.route('/user/:id')
  .post(UserController.createUser)
  .get(UserController.findUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route('/clinic')
  .post(ClinicController.createClinic)
  .get(ClinicController.findAllClinics);

router.route('/clinic/:id')
  .get(ClinicController.findClinic)
  .put(ClinicController.updateClinic)
  .delete(ClinicController.deleteClinic);

router.route('/doctor')
  .post(DoctorController.createDoctor)
  .get(DoctorController.findAllDoctors);

router.route('/doctor/:id')
  .get(DoctorController.findDoctor)
  .put(DoctorController.updateDoctor)
  .delete(DoctorController.deleteDoctor);

router.route('/professional')
  .get(ProfessionalController.findAllProfessionals);

router.route('/professional/:id')
  .post(ProfessionalController.createProfessional)
  .get(ProfessionalController.findProfessional)
  .put(ProfessionalController.updateProfessional)
  .delete(ProfessionalController.deleteProfessional);

router.route('/professionalForName')
  .post(ProfessionalController.findProfessionalForName);

router.route('/patients')
  .get(PatientController.findAllPatients);

router.route('/patient/:id')
  .post(PatientController.createPatient)
  .get(PatientController.findPatient)
  .put(PatientController.updatePatient)
  .delete(PatientController.deletePatient);

router.route('/patientForName')
  .post(PatientController.findPatientForName);

router.route('/patientForDateOfBirth')
  .post(PatientController.findPatientForDateOfBirth);

router.route('/patientForCPF')
  .post(PatientController.findPatientForCPF);

router.route('/consult/:id')
  .post(ConsultController.createConsult)
  .put(ConsultController.updateConsult)
  .get(ConsultController.findConsultForPeriod);

router.route('/consultForPatient')
  .get(ConsultController.findConsultForPatient);

router.route('/consultForProfessional')
  .get(ConsultController.findConsultForProfessional);

router.route('/consultForProcediment')
  .get(ConsultController.findConsultForProcediment);

router.route('/consults')
  .get(ConsultController.findAllConsults);

router.route('/procedimentType/:id')
  .post(ProcedimentTypeController.createProcedimentType)
  .get(ProcedimentTypeController.findProcedimentType)
  .put(ProcedimentTypeController.updateProcedimentType)
  .delete(ProcedimentTypeController.deleteProcedimentType);

router.route('/procedimentTypes')
  .get(ProcedimentTypeController.findAllProcedimentTypes)

router.route('/procedimentTypesForName/:id')
  .post(ProcedimentTypeController.findProcedimentTypesForName)

router.route('/procediment/:id')
  .post(ProcedimentController.createProcediment)
  .get(ProcedimentController.findProcediment)
  .put(ProcedimentController.updateProcediment)
  .delete(ProcedimentController.deleteProcediment);

router.route('/procediments')
  .get(ProcedimentController.findAllProcediments)

router.route('/procedimentsForName')
  .post(ProcedimentController.findProcedimentsForName)

router.route('/auth')
  .post(AuthController.authenticate)



export { router }
