module.exports = (sequelize, DataTypes) =>{
    const Admin = sequelize.define("admin",{
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
            defaultValue:false
        },
        isAdmin : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
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
    
    return Admin
}
