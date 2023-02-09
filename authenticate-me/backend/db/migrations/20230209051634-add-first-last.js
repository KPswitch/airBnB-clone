'use strict';
const { DATE } = require('sequelize');
let options = {};
if(process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  // return queryInterface.addColumn('User',
  // firstName, {type: Sequelize.STRING}, lastName, {type: Sequelize.STRING}
  // )
  options.tableName = "Users";
  await queryInterface.addColumn(options, 'firstName', {
    type: Sequelize.STRING(30)
  });
  await queryInterface.addColumn(options, 'lastName', {
    type: Sequelize.STRING(30)
  });
 },

  async down (queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.removeColumn(options, 'firstName', 'lastName')
  }
};
