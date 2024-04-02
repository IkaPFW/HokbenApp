'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let menusData = JSON.parse(fs.readFileSync('../../db.json', 'utf-8')).menu.map(el => {
      delete el.id

      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })

    return queryInterface.bulkInsert('Menus', menusData, {})
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
    return queryInterface.bulkDelete('Menus', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
