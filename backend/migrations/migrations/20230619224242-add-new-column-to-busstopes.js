'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        up: async(queryInterface, Sequelize) => {
            await queryInterface.addColumn('busstopes', 'newColumn', {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: "test-value",
            });
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('busstopes', 'newColumn');
    }
};