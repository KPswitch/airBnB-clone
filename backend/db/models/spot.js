'use strict';
const {
  Model, INTEGER
} = require('sequelize');
const { Sequelize } = require('.');
// let schema;
// if (process.env.NODE_ENV === 'production'){
//   schema = process.env.SCHEMA
// }
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(
        models.User, {foreignKey: 'ownerId'}
      )
      Spot.hasMany(
        models.SpotImage,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      ),
      Spot.hasMany(
        models.Review,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      ),
      Spot.hasMany(
        models.ReviewImage,
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      )
    }
  }
  Spot.init({
    ownerId:{
      type: DataTypes.INTEGER,
    allowNull: false},

    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    previewImage: DataTypes.STRING,
    avgRating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
    // defaultScope: {
    //   attributes: {
    //     include: [[Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgRating',],
    //     [Sequelize.literal(`(SELECT url FROM
    //         ${scheme ? `"${schema}"."SpotImages"` : 'SpotImages'} Where 'SpotImages.'spotId = 'Spot'.'id AND 'SpotImages.'previewImage' = true LIMIT 1)`), 'previewImage']]
    // }
    // }
  });
  return Spot;
};
