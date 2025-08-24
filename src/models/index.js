"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

import User from './User.js'
import Reservation from './Reservation.js'

// ilişkiler
User.hasMany(Reservation, { foreignKey: 'userId' })
Reservation.belongsTo(User, { foreignKey: 'userId' })

export { User, Reservation }


