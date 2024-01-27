import ProductModel from "../models/ProductModel.js";







//! POST - Create Product
const createProduct = async (req, res) => {
    const { name, quantity, price, description, image } = req.body;

    // Campos obligatorios
    if ( !name || !quantity || !price || !description ) {
        return res.status(400).json({
            ok: false,
            msg: "Completa todos los campos son obligatorios",
        });
    }

    // Crear producto...
    const product = new ProductModel({
        user: req.user.id,
        name,
        quantity,
        price,
        description,
        image
    });

    // Guardar producto en la base de datos...
    const newProduct = await product.save();

    res.status(201).json({
        ok: true,
        msg: "Producto creado correctamente",
        newProduct
    });
};





//! GET - Get All Products
const getProducts = async (req, res) => {
    const products = await ProductModel.find(/* { user: req.user.id } */);

    res.status(200).json({
        ok: true,
        msg: "Lista de productos",
        products,
    });
};



export { getProducts, createProduct }