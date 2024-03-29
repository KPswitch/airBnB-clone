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
        review: "We really enjoyed our stay at this Airbnb rental. The ...",
        stars: 5
      },
      {
        userId: 5,
        spotId: 4,
        review: "Unfortunately, I can't recommend this Airbnb rental..",
        stars: 1
      },
      {
        userId: 4,
        spotId: 2,
        review: "We had an amazing time at this Airbnb rental! The apartment...",
        stars: 5
      },
      {
        userId: 3,
        spotId: 4,
        review: "We had a mixed experience at this Airbnb rental...",
        stars: 3
      },
      {
        userId: 2,
        spotId: 3,
        review: "This Airbnb rental was fine, but not exceptional...",
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
