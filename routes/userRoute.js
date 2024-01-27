import { Router } from 'express';
import { body, param, query } from 'express-validator';
import existEmail from '../helpers/existEmail.js';
import validarCampos from '../middlewares/validarCampos.js';
//import checkAuth from '../middlewares/authCheck.js';
import { registerUser, getUsers, LoginUser, logOutUser } from '../controllers/userController.js';


const userRouter = Router();

const validateName = [ body('name', 'El nombre es necesario').not().isEmpty() ];
const validateEmail = [ body('email', 'El correo no es valido').custom( existEmail ).isEmail() ];
const validatePassword = [ body('password', 'La contraseña es obligatoria y/o debe tener mas de 6 caracteres').isLength({ min: 6 }) ];


//! POST - Register User
userRouter.post('/register', 
                validateName,
                validateEmail,
                validatePassword,
                validarCampos,
                registerUser );




//! POST - Google Sign In
/* userRouter.post('/google-signin', 
                googleSignIn
                ); */


//! POST - Login User
userRouter.post('/login', 
                validateEmail,
                validatePassword,
                validarCampos,
                LoginUser
                );


//! GET - All Users
userRouter.get('/', getUsers);



//! PUT - Update User
/* userRouter.patch('/updateuser',
                checkAuth,
                ); */




//! GET - Logout User
userRouter.get('/logout', logOutUser);



//! DELETE - Delete User
/* userRouter.delete('/deleteuser/:id', 
                checkAuth,
                ); */



//! GET - Get User By Id
/* userRouter.get('/:id',
                checkAuth,
                ); */







export default userRouter;