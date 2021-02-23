/**
 * @name: company
 * @author: LIULIU
 * @date: 2020-08-03 17:18
 * @description：company
 * @update: 2020-08-03 17:18
 */
module.exports = (sequelize,DataTypes) => {
    let Users = sequelize.define('users',{
        name:  DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        timestamps: false
    })

    Users.associate = () =>{
    }

    return Users;
}
