import { DataTypes } from "sequelize";
import { sequelize } from "../configs/db.js";


const Room = sequelize.define("Room", {
  
  roomNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    validate: { isInt: true, min:1  },
  },
  roomType:{
    type: DataTypes.ENUM('Single', 'Double', 'Suite'),
    allowNull: false    
  },
  capacity:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { isInt: true, min:1  },
    
    
  },
  isAvailable:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
  }
  
},{
    tableName: 'rooms',
    timestamps: true,
    underscored: true,
    
});

export default Room;
