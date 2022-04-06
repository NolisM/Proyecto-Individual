const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const Dog = sequelize.define('Dog', {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heigth:{
          type: DataTypes.STRING,
          allowNull: false

        },
    weigth:{
          type: DataTypes.STRING,
          allowNull: false
        },
    life_span:{
          type: DataTypes.INTEGER
        },
    image:{
      type: DataTypes.STRING,
      
    }
    
  });

};

