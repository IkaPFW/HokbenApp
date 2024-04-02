'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let categoriesData = JSON.parse(fs.readFileSync('../../db.json', 'utf-8')).category.map(el => {
      delete el.id

      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })

    return queryInterface.bulkInsert('Categories', categoriesData, {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
