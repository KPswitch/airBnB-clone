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
        url: "https://www.travelandleisure.com/thmb/TJKRKnf8BaYBxy-81eK6plcr5Jk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/morongo-valley-california-cabin-rental-CABINSBNB1120-60d3bbd95f71468ca187247a5683ed2c.jpg",
        previewImage: true
      },
      {
        spotId: 2,
        url: "image.url",
        previewImage: false
      },
      {
        spotId: 3,
        url: "https://www.boundlessroads.com/wp-content/uploads/2021/01/Santa-Barbara-luxury-estate.jpg",
        previewImage: true
      },
      {
        spotId: 3,
        url: "image.jpg",
        previewImage: false
      },
      {
        spotId: 4,
        url: "https://www.fontainebleau.com/fontainebleau/147/1/rooms.jpg",
        previewImage: true
      },
      {
        spotId: 5,
        url: "https://media.architecturaldigest.com/photos/571e87ce818277135ff9149c/master/w_3000,h_2003,c_limit/chicago-penthouse-apartment-04.jpg",
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
