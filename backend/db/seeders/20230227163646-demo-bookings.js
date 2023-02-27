'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 2,
        userId: 1,
        startDate: 3/15/2023,
        endDate: 3/17/2023
      },
      {
        spotId: 3,
        userId: 1,
        startDate: 4/15/2023,
        endDate: 4/17/2023
      },
      {
        spotId: 5,
        userId: 2,
        startDate: 6/1/2023,
        endDate: 6/17/2023
      },
      {
        spotId: 4,
        userId: 3,
        startDate: 8/29/2023,
        endDate: 9/4/2023
      },
      {
        spotId: 4,
        userId: 5,
        startDate: 10/15/2023,
        endDate: 10/17/2023
      },
      {
        spotId: 1,
        userId: 5,
        startDate: 12/15/2023,
        endDate: 12/31/2023
      },


  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
