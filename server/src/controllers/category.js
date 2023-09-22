const { Category } = require('../db');

const createCategory = async (req, res) => {
    const { name } = req.body;
    try {
      const newCategory = {
          name
      };
      await Category.create(newCategory);
      return res.status(201).json({message: 'Categoria creada exitosamente'});
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
};

const getCategory = async (req, res) => {
    try {
      const category = await Category.findAll();
      if (!category.length) {
        return res.status(200).json({message: 'No se encontraron categorias disponibles'});
      }
      return res.status(200).json(category);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    await category.destroy()
    return res.status(200).json({ message: 'Categoria eliminada correctamente.' });
  } catch (error) {
    return res.status(404).send({ error: error.message })
  }
};
const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const {
          name,
          status
        } = req.body
        const category = await Category.findByPk(id)
        const updatedCategory = await Category.update({
            name,
            status:status && category.status == '0'? '1' : '0'
        }, {
          where: { id: id },
          returning: true,
        });
    
        if (updatedCategory[0] === 0) {
          return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        return res.status(200).json({message: 'Categoria actulizada correctamente'});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };
  
  module.exports = {
    createCategory,
    getCategory,
    removeCategory,
    editCategory
  };
  