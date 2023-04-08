'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';



    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://www.compass.com/m/44911effe02d6c76ea08f98b9a473e891540c17e_img_0_0aa2d/origin.jpg",
        previewImage: true
      },
      {
        spotId: 1,
        url: "getaway.png",
        previewImage: false
      },
      {
        spotId: 1,
        url: "image.url",
        previewImage: false
      },
      {
        spotId: 2,
        url: "getaway.png",
        previewImage: true
      },
      {
        spotId: 2,
        url: "image.url",
        previewImage: false
      },
      {
        spotId: 3,
        url: "image.url",
        previewImage: true
      },
      {
        spotId: 3,
        url: "image.url",
        previewImage: false
      },
      {
        spotId: 4,
        url: "image.url",
        previewImage: true
      },
      {
        spotId: 5,
        url: "image.url",
        previewImage: true
      },
      {
        spotId: 5,
        url: "image2.url",
        previewImage: false
      },
      {
        spotId: 5,
        url: "image3.url",
        previewImage: false
      },
      {
        spotId: 5,
        url: "image4.url",
        previewImage: false
      },


  ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {});
  }
};
