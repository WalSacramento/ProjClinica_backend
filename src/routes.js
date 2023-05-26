import { Router } from 'express'

import UserController from './controller/UserController'
import ClinicController from './controller/ClinicController'
import DoctorController from './controller/DoctorController'
import ConsultController from './controller/ConsultController'
// import PostController from './controller/PostController'

const router = Router()

router.get('/', (req, res) => {
  return res.json({ hello: 'world' })
})

router.route('/user')
  .post(UserController.createUser)
  .get(UserController.findAllUsers);

router.route('/user/:id')
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

router.route('/consult/:id')
  .post(ConsultController.createConsult)
  .put(ConsultController.updateConsult)
  .get(ConsultController.findConsult);

router.route('/consults')
  .get(ConsultController.findAllConsults);

// router.post('/post/user/:id', PostController.createPost)
// router.get('/posts', PostController.FindAllPosts)
// router.put('/post/:id', PostController.UpdatePost)
// router.delete('/post/:id', PostController.DeletePost)



export { router }
