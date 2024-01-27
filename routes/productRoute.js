import { Router } from 'express';
import checkAuth from '../middlewares/authCheck.js';
import { getProducts, createProduct } from '../controllers/productComtroller.js';
//import { upload } from '../utils/fileUpload.js';







const productRouter = Router();



productRouter.post('/', 
                        checkAuth, 
                        createProduct );


productRouter.get('/', 
                    checkAuth,
                    getProducts );


/* productRouter.get('/:id', 
                        checkAuth,
                        getProductById ); */


/* productRouter.delete('/:id',
                            checkAuth,
                            deleteProductById );
 */
/* productRouter.delete('/',
                            checkAuth,
                            eliminarVariosProductos );
 */

/* productRouter.patch('/:id', 
                        checkAuth,
                        upload.single('image'), //Aqui se indica el nombre del campo que se va a subir...
                        updateProduct ); */



export default productRouter;