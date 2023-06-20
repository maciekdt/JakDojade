'use strict';
const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable('busstopes', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
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

        await queryInterface.createTable('lines', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false
            }
        })

        await queryInterface.createTable('connections', {
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
                allowNull: true,
                references: {
                    model: 'lines',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            startNodeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'busstopes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            endNodeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'busstopes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        })

        await queryInterface.addIndex('lines', ['name', 'company'], {
            name: 'index_name_company',
            unique: true
        })

        await queryInterface.addIndex('busstopes', ['name', 'lon', 'lat'], {
            name: 'index_name_lon_lat',
            unique: true
        })

        await queryInterface.addIndex('connections', ['validFrom'], {
            name: 'index_valid_from',
            unique: false
        })
    },


    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('connections');
        await queryInterface.dropTable('busstopes');
        await queryInterface.dropTable('lines');
    }
};