const addressModel = require("./addressModel");
const citiesModel = require("./citiesModel");
const stateModel = require("./stateModel");

//stateModel
// stateModel.hasMany(citiesModel, { foreignKey: 'stateId', onDelete: 'CASCADE' });

//addressModel
addressModel.belongsTo(stateModel, { foreignKey: 'stateId' }); 
