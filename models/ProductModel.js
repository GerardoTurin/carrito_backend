import mongoose from "mongoose";
const { Schema, model } = mongoose;


const productSchema = new Schema({
    /* user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    }, */
    name: {
        type: String,
        required: [true, "Debe ingresar un nombre para el producto."],
        trim: true, // Elimina los espacios en blanco al inicio y al final del string...
    },
    quantity: {
        type: Number,
        required: [true, "Debe ingresar una cantidad para el producto."],
        min: [0, "La cantidad no puede ser menor a 0."],
    },
    price: {
        type: Number,
        required: [true, "Debe ingresar un precio para el producto."],
        min: [1, "El precio no puede ser menor a 1."],
    },
    description: {
        type: String,
        required: [true, "Debe ingresar una descripción para el producto."],
        trim: true,
    },
    image: {
        type: String,
        required: false,
        default: "https://cdn.pixabay.com/photo/2021/09/13/22/02/add-6622547_1280.png",
    },
}, {
    timestamps: true,   // Crea dos campos: createdAt y updatedAt, que se actualizan automáticamente...
});



export default model("Product", productSchema);