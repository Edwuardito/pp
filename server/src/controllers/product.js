const { Product } = require('../db');

const createProduct = async (req, res) => {
    const { 
        name,
        description,
        details,
        price,
        image,
        stock,
        dimensions,
        offer
    } = req.body;
    try {
      const newProduct = {
          name,
          description,
          details,
          price,
          image,
          stock,
          dimensions,
          offer
      };
      await Product.create(newProduct);
      return res.status(201).json({message: 'Producto creado exitosamente'});
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
      const product = await Product.findAll();
      if (!product.length) {
        return res.status(200).json({message: 'No se encontraron productos disponibles'});
      }
      return res.status(200).json(product);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    await product.destroy()
    return res.status(200).json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    return res.status(404).send({ error: error.message })
  }
};
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            details,
            price,
            image,
            stock,
            dimensions,
            offer,
            status
        } = req.body
        const product = await Product.findByPk(id)
        const updatedProduct = await Product.update({ 
            status:status && product.status == '0'? '1' : '0',
            name,
            description,
            details,
            price,
            image,
            stock,
            dimensions,
            offer
        }, {
          where: { id: id },
          returning: true,
        });
    
        if (updatedProduct[0] === 0) {
          return res.status(404).json({ error: 'Producto no encontrado' });
        }
        return res.status(200).json({message: 'Producto actulizado correctamente'});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };
  
  module.exports = {
    createProduct,
    getProduct,
    removeProduct,
    editProduct
  };
  