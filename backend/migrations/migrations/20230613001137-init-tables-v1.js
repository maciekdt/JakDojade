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
                allowNull: true,
                references: {
                    model: 'Lines',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            startNodeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'BusStopes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            endNodeId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'BusStopes',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }
        })

        await queryInterface.addIndex('Lines', ['name', 'company'], {
            name: 'index_name_company',
            unique: true
        })

        await queryInterface.addIndex('BusStopes', ['name', 'lon', 'lat'], {
            name: 'index_name_lon_lat',
            unique: true
        })

        await queryInterface.addIndex('Connections', ['validFrom'], {
            name: 'index_valid_from',
            unique: false
        })
    },


    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Connections');
        await queryInterface.dropTable('BusStopes');
        await queryInterface.dropTable('Lines');
    }
};