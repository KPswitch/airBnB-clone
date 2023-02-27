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
        startDate: "2023-03-14",
        endDate: "2023-03-17"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-04-15",
        endDate: "2023-04-17"

      },
      {
        spotId: 5,
        userId: 2,
        startDate: "2023-06-1",
        endDate: "2023-06-17"
      },
      {
        spotId: 4,
        userId: 3,
        startDate: "2023-08-29",
        endDate: "2023-09-04"}
        ,
      {
        spotId: 4,
        userId: 5,
        startDate: "2023-10-15",
        endDate: "2023-10-17"

      },
      {
        spotId: 1,
        userId: 5,
        startDate: "2023-12-15",
        endDate: "2023-12-31"

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
