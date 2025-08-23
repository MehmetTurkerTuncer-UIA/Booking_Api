import { date } from "joi";
import { DataTypes, sequelize } from "sequelize";
import { underscoredIf } from "sequelize/lib/utils";

const ReservationSchema = new Sequelize();

const Reservation = sequelize("reservations", {
  guestName: {
    type: DataTypes.STRING(256),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2 - 100],
    },
    set(value) {
      this.setDataValue("guestName", value.trim().replace(/\s+/g, " "));
    },
  },

  roomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, isInt: true },
  },
  checkIn: {
    type: DataTypes.DATEONLY(),
    allowNull: false,
  },
  checkOut: {
    type: DataTypes.DATEONLY(),
    allowNull: false,
  },
},{
    tableName: ReservationSchema,
    timestamps: true,
    underscored: true
});

export default Reservation;
