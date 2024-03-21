module.exports = (sequelize, DataTypes) =>{
    const Customer = sequelize.define("customer",{
        firstName: {
            type:DataTypes.STRING,
            allowNull: false
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull: false
        },
        email : {
            type:DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        isEmailVerified:{
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        otp:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })

    return Customer
}
