"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.js";


const Reservation = sequelize.define("Reservation", {
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',   // table name
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
  
  
  },

  roomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min:1  },
  },
  checkIn: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status:{
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled'),
    defaultValue: 'Pending'

  },
  
},{
    tableName: 'reservations',
    timestamps: true,
    underscored: true,
    validate: {
        checkDates(){
            const inDate = new Date(this.checkIn)
            const outDate = new Date(this.checkOut)

            if(this.checkIn && this.checkOut && (outDate <= inDate)){
                throw new Error('checkOut must be later than checkIn')
            }
        }
    }

});

export default Reservation;
