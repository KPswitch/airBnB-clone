'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 4,
        review: "great host",
        stars: 5
      },
      {
        userId: 5,
        spotId: 4,
        review: "horrible host, dont believe the reviews!",
        stars: 1
      },
      {
        userId: 4,
        spotId: 2,
        review: "Just Awesome",
        stars: 5
      },
      {
        userId: 3,
        spotId: 4,
        review: "its was okay",
        stars: 3
      },
      {
        userId: 2,
        spotId: 3,
        review: "Filthy, wouldnt reccomend",
        stars: 2
      },

  ], {});},

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
