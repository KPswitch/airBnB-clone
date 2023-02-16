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
        lat: 1235.4456,
        lng: 1563.6548,
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
        lat: 1236.4456,
        lng: 1523.6548,
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
        lat: 1265.4456,
        lng: 1534.6548,
        name: 'Views on Views on Views',
        description: '2bd 2bath',
        price: 399.99
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
