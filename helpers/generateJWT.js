import  jwt  from "jsonwebtoken";



const generateJWT = (id, name) => {

    return new Promise((resolve, reject) => {
        const payload = { id, name };

        jwt.sign(payload, process.env.PRIVATEKEY_JWT, (error, token) => {

            if (error) {
                console.log(error);
                reject('Error al crear el token');
            } else {
                resolve(token);
            }
        });
    });
};


export default generateJWT;