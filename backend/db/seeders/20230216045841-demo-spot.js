'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '619 front St.',
        city: 'San Diego',
        state: 'CA',
        country: 'USA',
        lat: 32.715736,
        lng: 117.161125,
        name: 'Heart of the City',
        description: '3 bd 2 bath',
        price: 299.99
      },
      {
        ownerId: 2,
        address: '123 main St.',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.054456,
        lng: 118.243654,
        name: 'Perfect Getaway',
        description: '4 bd 4 bath',
        price: 199.99
      },
      {
        ownerId: 3,
        address: '1010 Franklin Ave',
        city: 'Santa Barbara',
        state: 'CA',
        country: 'USA',
        lat: 34.440856,
        lng: 119.698219,
        name: 'Views on Views on Views',
        description: '2bd 2bath',
        price: 399.99
      },
      {
        ownerId: 4,
        address: '4441 Collins Ave',
        city: 'Miami Beach',
        state: 'Fl',
        country: 'USA',
        lat: 25.81791,
        lng: -80.12267,
        name: 'Fountain Blue Condo',
        description: '2bd 2bath',
        price: 549.99},
        {
          ownerId: 5,
          address: '233 s Wacker Dr.',
          city: 'Chicago',
          state: 'IL',
          country: 'USA',
          lat: 41.87939,
          lng: -87.63583,
          name: 'Willis Tower',
          description: '2bd 2bath',
          price: 449.99},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1,2,3] }
    }, {});
  }
};
