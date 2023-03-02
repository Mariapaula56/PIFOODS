const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("diet", {
    id: {
      type: DataTypes.UUID, //DataTypes.INTEGER
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  });
};
