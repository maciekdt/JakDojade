'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('BusStopes', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            lon: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },
            lat: {
                type: DataTypes.DOUBLE,
                allowNull: false
            }
        })

        await queryInterface.createTable('Lines', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        await queryInterface.createTable('Connections', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            arrivalTime: {
                type: DataTypes.TIME,
                allowNull: false
            },
            departureTime: {
                type: DataTypes.TIME,
                allowNull: false
            },
            validFrom: {
                type: DataTypes.DATE,
                allowNull: false
            },
            validTo: {
                type: DataTypes.DATE,
                allowNull: false
            },
            lineId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Lines',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            startNodeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'BusStopes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            endNodeId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'BusStopes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        })
    },


    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Connections');
        await queryInterface.dropTable('BusStopes');
        await queryInterface.dropTable('Lines');
    }
};