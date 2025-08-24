"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

import User from './User.js'
import Reservation from './Reservation.js'
import Room from './Room.js';

// User ↔ Reservation
User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

// Room ↔ Reservation
Room.hasMany(Reservation, { foreignKey: "roomId" });
Reservation.belongsTo(Room, { foreignKey: "roomId" });

export { User, Reservation, Room }


