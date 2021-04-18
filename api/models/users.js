'use strict';

const bcrypt = require("bcryptjs");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'First Name is required'
        },
        notEmpty: {
          msg: 'Please provide a First name'
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Last Name is required'
        },
        notEmpty: {
          msg: 'Please provide a Last Name'
        },
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email address you entered already exists'
      },
      validate: {
        isEmail: {
          msg: 'Please provide valid email address'
        }, 
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Please provide a password'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
            msg: 'Password is required'
          }
      },
      /***
       * hashed password before persisting the user to the database
       */
      set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        this.setDataValue("password", hashedPassword);
      }
    }
  }, {
    sequelize,
    modelName: 'Users',
  });

  Users.associate = (models) => {
    Users.hasMany(models.Courses, {
        foreignKey: 'userId',
        allowNull: false
    })
  }

  return Users;
};