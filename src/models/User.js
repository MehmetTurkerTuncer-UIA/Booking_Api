import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.js";


const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100],
    },
    set(value) {
      if(typeof value === 'string'){
        this.setDataValue("guestName", value.trim().replace(/\s+/g, ' '));
    }},
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {   },
  },
  telefonNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
        


  }
  
},{
    tableName: 'users',
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

export default User;
