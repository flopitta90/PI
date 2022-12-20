const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://img.freepik.com/vector-premium/bandeja-comida-cubierta-icono-servicio-habitaciones-hotel_548264-510.jpg?w=2000',
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dishTypes:{
      type: DataTypes.STRING,
      defaultValue: 'Main dish'
    },
    analyzedInstructions:{
      type: DataTypes.TEXT,
      defaultValue: 'No hay descripcion paso a paso para esta receta'
    },
    readyInMinutes:{
      type: DataTypes.INTEGER,
      defaultValue: 60
    },
    ingredients:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue:['No se han especificado los ingredientes']
    }
  });
};
