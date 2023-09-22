const { User } = require('../db');
const bcriptjs = require("bcryptjs")

const createUser = async (req, res) => {
    const { 
        name_user,
        email,
        password,
        role,
        image
    } = req.body;
    try {
      const passwordHash = await bcriptjs.hash(password,8)
      console.log(passwordHash)
      const newUser = {
        name_user,
        email,
        password:passwordHash,
        role,
        image
      };
      await User.create(newUser);
      return res.status(201).json({message: 'Usuario creado exitosamente'});
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
      const user = await User.findAll();
      
      if (!user.length) {
        return res.status(200).json({message: 'No se encontraron usuarios disponibles'});
      }
      return res.status(200).json(user);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    await user.destroy()
    return res.status(200).json({ message: 'User eliminado correctamente.' });
  } catch (error) {
    return res.status(404).send({ error: error.message })
  }
};
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name_user,
            email,
            password,
            role,
            image,
            status
        } = req.body
        const user = await User.findByPk(id)
        const updatedUser = await User.update({ 
            name_user,
            email,
            password,
            role,
            image,
            status:status && user.status == '0'? '1' : '0'
        }, {
          where: { id: id },
          returning: true,
        });
    
        if (updatedUser[0] === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        return res.status(200).json({message: 'Usuario actulizado correctamente'});
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

  const loginUser = async (req, res) => {
    try {
      const { 
          user,
          password
      } = req.body;
      if(user.includes('@')){
        const userdb = await User.findOne({
          where: {
            email: user
          }
        });
        if(userdb){
          const compare = bcriptjs.compareSync(password,userdb.password)
          return compare ? res.status(200).json({message: 'Usuario logueado correctamente'}) : res.status(200).json({message: 'Contraseña incorrecta'})
        }
          return res.status(404).json({message: 'usuario no encontrado'})
      }
      const userdb = await User.findOne({
        where: {
          name_user: user
        }
      });
      if(userdb){
        const compare = bcriptjs.compareSync(password,userdb.password)
        return compare ? res.status(200).json({message: 'Usuario logueado correctamente'}) : res.status(200).json({message: 'Contraseña incorrecta'})
      }
        return res.status(404).json({message: 'usuario no encontrado'})

    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
};

  
  module.exports = {
    createUser,
    getUser,
    removeUser,
    editUser,
    loginUser
  };
  