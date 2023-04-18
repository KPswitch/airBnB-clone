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
        review: "We really enjoyed our stay at this Airbnb rental. The apartment was clean and well-maintained, with nice touches like fresh flowers and a welcome basket. The bed was comfortable and the bathroom was modern and spacious. The kitchen was fully equipped and allowed us to cook some of our own meals. The location was great, with easy access to public transportation and lots of restaurants and cafes nearby. The only downside was that the street noise could be a bit loud at times. host",
        stars: 5
      },
      {
        userId: 5,
        spotId: 4,
        review: "h Unfortunately, I can't recommend this Airbnb rental. The apartment was dirty when we arrived, with a lot of dust and grime in the corners and on the surfaces. The bed was uncomfortable and the linens didn't seem clean. The bathroom was small and cramped, and the shower didn't work properly. The location was okay, but the noise from the street kept us up at night. Overall, we were disappointed with our stay.",
        stars: 1
      },
      {
        userId: 4,
        spotId: 2,
        review: "We had an amazing time at this Airbnb rental! The apartment was beautiful, with stylish decor and lots of natural light. The bed was incredibly comfortable and the bathroom was luxurious, with a large shower and high-end toiletries. The kitchen was a joy to cook in, with top-of-the-line appliances and a beautiful marble countertop. The location was perfect, in a vibrant neighborhood with lots of shops and restaurants. The host was also incredibly kind and responsive, making us feel welcome from the moment we arrived. We can't recommend this Airbnb rental highly enough!",
        stars: 5
      },
      {
        userId: 3,
        spotId: 4,
        review: "We had a mixed experience at this Airbnb rental. On the positive side, the apartment was in a good location and had some nice amenities, like a fully equipped kitchen and a comfortable couch. However, there were some downsides. The bathroom was very small and not well-maintained. The bed was okay, but not great. We also had some issues with the heating and the Wi-Fi, which were both unreliable. Overall, we wouldn't stay here again.",
        stars: 3
      },
      {
        userId: 2,
        spotId: 3,
        review: "This Airbnb rental was fine, but not exceptional. The apartment was clean and had everything we needed for our stay, but it was a bit basic and lacking in charm. The bed was comfortable and the bathroom was decent, although the shower could have been better. The location was convenient, but not particularly exciting. Overall, we had an okay experience, but we wouldn't go out of our way to recommend it to others.",
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
