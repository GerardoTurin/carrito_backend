import existEmail from "../helpers/existEmail.js";
//import errorHandlers from "../middlewares/error.js";
import bcryptjs from 'bcryptjs'; // Encriptar contraseñas
import userModel from "../models/UserModel.js";
import generateJWT from "../helpers/generateJWT.js";




const getUsers = async (req, res) => {
    const users = await userModel.find();

    res.json({
        ok: true,
        users,
        msg: 'Users Obtained',
    });
};




//! Register User

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;


    if ( await existEmail(email) ) {
        res.status(400).json({  
            ok: false,
            msg: 'El correo ya esta registrado'
        });
        return;
    };

    try {
        const newUser = new userModel({ name, email, password });
        await newUser.save();

        return res.status(200).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            newUser
        });
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    };
};





//! OAuth Google

const googleSignIn = async (req, res) => {
    const { email, name, photo } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            user = new userModel({
                name,
                email,
                photo,
                checkUser: true,
                googleUser: true,
                password: 'google', // Puedes usar una contraseña predeterminada o generar una aleatoria
            });
            await user.save();
        } 

        // Generar JWT, enviar respuesta, etc.
        const token = await generateJWT(user.id, user.name);

        // Send HTTP-ONLY cookie with the token
        res.cookie('token', token, {
            httpOnly: true,
        });

        res.status(200).json({
            ok: true,
            msg: 'User Logged',
            user,
            token
        });
    

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

};






//! Sign In User

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });    // Buscamos el usuario por el email

    if ( !user ) {
        return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    };

    // Check password
    const validPassword = await bcryptjs.compare(password, user.password);  // Comparamos la contraseña ingresada con la contraseña encriptada de la base de datos

    if ( !validPassword ) {
        return res.status(400).json({
            ok: false,
            msg: 'El password es incorrecto'
        });
    };


    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    // Send HTTP-ONLY cookie with the token
    res.cookie('token', token, {
        httpOnly: true,
        //secure: false,
        //maxAge: 1000 * 60 * 60 * 24, // 1 day
        //path: '/'
    });


    res.status(200).json({
        ok: true,
        msg: 'User Logged',
        user,
        token
    });
};






//! Update User

const updateUser = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if ( user ) {
        user.email = user.email;
        user.password = req.body.password || user.password;
        user.name = req.body.name || user.name;
        user.photo = req.body.photo || user.photo;
        

        const updatedUser = await user.save();

        return res.status(200).json({
            ok: true,
            msg: 'User Updated',
            updatedUser
        });
    };

    return res.status(404).json({
        ok: false,
        msg: 'User not found'
    });

};







//! Log Out User

const logOutUser = async (req, res) => {
    res.clearCookie('token');

    return res.status(200).json({
        ok: true,
        msg: 'Cerraste sesión correctamente'
    });
};






//! Delete User

const deleteUser = async (req, res) => {
    const user = await userModel.findById(req.params.id);

    if ( !user ) {
        return res.status(404).json({
            ok: false,
            msg: 'User not found'
        });
    };

    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    res.clearCookie('token');   // Clear cookie
    
    return res.status(200).json({
        ok: true,
        msg: 'User Deleted',
        deletedUser
    });
};




//GET - User by ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
    
        if ( !user ) {
            return res.status(404).json({
                ok: false,
                msg: 'User not found'
            });
        };
    
        return res.status(200).json({
            ok: true,
            msg: 'User Obtained',
            user
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }

};




export {
    getUsers,
    registerUser,
    LoginUser,
    googleSignIn,
    updateUser,
    logOutUser,
    deleteUser,
    getUserById
};