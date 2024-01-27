import mongoose from "mongoose";
import colors from 'colors';    // Importar módulo colors


const conectionDB = async () => {
    const dbConnection = 'mongodb+srv://gera199306:qIxD0AZdkK7PyvTR@clustercarrito.xvqsdff.mongodb.net/carrito'
    try {
        await mongoose.connect( dbConnection );
        console.log('Base de datos ONLINE'.green);
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos'.red);
    }
};





export default conectionDB;