'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(
        models.Spot
      ),
      Booking.belongsTo(
        models.User
      )
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
    scopes: {
      forGuest: {
        attributes: ['spotId', 'startDate', 'endDate']
      },
      forOwner(ownerId) {
        return {attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        include: [
          {
            model: sequelize.models.Spot,
            where: { ownerId: ownerId },
            attributes: []
          },
          {
            model: sequelize.models.User,
            attributes: ['id', 'firstName', 'lastName']
          }
        ]
      }},

      }
    }
  );
  return Booking;
};
