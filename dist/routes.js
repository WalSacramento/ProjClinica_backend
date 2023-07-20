"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _UserController = require('./controller/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _ClinicController = require('./controller/ClinicController'); var _ClinicController2 = _interopRequireDefault(_ClinicController);
var _DoctorController = require('./controller/DoctorController'); var _DoctorController2 = _interopRequireDefault(_DoctorController);
var _ConsultController = require('./controller/ConsultController'); var _ConsultController2 = _interopRequireDefault(_ConsultController);
var _AuthController = require('./controller/AuthController'); var _AuthController2 = _interopRequireDefault(_AuthController);
var _auth = require('./middlewares/auth');
var _ProfessionalController = require('./controller/ProfessionalController'); var _ProfessionalController2 = _interopRequireDefault(_ProfessionalController);
var _PatientController = require('./controller/PatientController'); var _PatientController2 = _interopRequireDefault(_PatientController);
var _ProcedimentTypeController = require('./controller/ProcedimentTypeController'); var _ProcedimentTypeController2 = _interopRequireDefault(_ProcedimentTypeController);
var _ProcedimentController = require('./controller/ProcedimentController'); var _ProcedimentController2 = _interopRequireDefault(_ProcedimentController);

const router = _express.Router.call(void 0, )

router.get('/', (req, res) => {
  return res.json({ hello: 'world' })
})

router.route('/user')
  .get(_UserController2.default.findAllUsers)
// .get(AuthMiddleware, UserController.findAllUsers);


router.route('/user/:id')
  .post(_UserController2.default.createUser)
  .get(_UserController2.default.findUser)
  .put(_UserController2.default.updateUser)
  .delete(_UserController2.default.deleteUser);

router.route('/clinic')
  .post(_ClinicController2.default.createClinic)
  .get(_ClinicController2.default.findAllClinics);

router.route('/clinic/:id')
  .get(_ClinicController2.default.findClinic)
  .put(_ClinicController2.default.updateClinic)
  .delete(_ClinicController2.default.deleteClinic);

router.route('/doctor')
  .post(_DoctorController2.default.createDoctor)
  .get(_DoctorController2.default.findAllDoctors);

router.route('/doctor/:id')
  .get(_DoctorController2.default.findDoctor)
  .put(_DoctorController2.default.updateDoctor)
  .delete(_DoctorController2.default.deleteDoctor);

router.route('/professional')
  .get(_ProfessionalController2.default.findAllProfessionals);

router.route('/professional/:id')
  .post(_ProfessionalController2.default.createProfessional)
  .get(_ProfessionalController2.default.findProfessional)
  .put(_ProfessionalController2.default.updateProfessional)
  .delete(_ProfessionalController2.default.deleteProfessional);

router.route('/professionalForName')
  .post(_ProfessionalController2.default.findProfessionalForName);

router.route('/patients')
  .get(_PatientController2.default.findAllPatients);

router.route('/patient/:id')
  .post(_PatientController2.default.createPatient)
  .get(_PatientController2.default.findPatient)
  .put(_PatientController2.default.updatePatient)
  .delete(_PatientController2.default.deletePatient);

router.route('/patientForName')
  .post(_PatientController2.default.findPatientForName);

router.route('/patientForDateOfBirth')
  .post(_PatientController2.default.findPatientForDateOfBirth);

router.route('/patientForCPF')
  .post(_PatientController2.default.findPatientForCPF);

router.route('/consult/:id')
  .post(_ConsultController2.default.createConsult)
  .put(_ConsultController2.default.updateConsult)
  .get(_ConsultController2.default.findConsult);

router.route('/consults')
  .get(_ConsultController2.default.findAllConsults);

router.route('/procedimentType/:id')
  .post(_ProcedimentTypeController2.default.createProcedimentType)
  .get(_ProcedimentTypeController2.default.findProcedimentType)
  .put(_ProcedimentTypeController2.default.updateProcedimentType)
  .delete(_ProcedimentTypeController2.default.deleteProcedimentType);

router.route('/procedimentTypes')
  .get(_ProcedimentTypeController2.default.findAllProcedimentTypes)

router.route('/procedimentTypesForName/:id')
  .post(_ProcedimentTypeController2.default.findProcedimentTypesForName)

router.route('/procediment/:id')
  .post(_ProcedimentController2.default.createProcediment)

router.route('/auth')
  .post(_AuthController2.default.authenticate)



exports.router = router;
