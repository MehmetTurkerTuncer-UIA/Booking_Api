"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */


import User from './User.js'
import Reservation from './Reservation.js'
import Room from './Room.js'
import Token from './Token.js'
// ... diğer modeller

// İLİŞKİLER
User.hasMany(Token, { foreignKey: 'userId' })
Token.belongsTo(User, { foreignKey: 'userId' })

// User ↔ Reservation
User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

// Room ↔ Reservation
Room.hasMany(Reservation, { foreignKey: "roomId" });
Reservation.belongsTo(Room, { foreignKey: "roomId" });



export { User, Reservation, Room, Token }


