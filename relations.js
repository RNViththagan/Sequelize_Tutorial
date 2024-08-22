const { Sequelize, Op, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const zlib = require('zlib')
const sequelize = new Sequelize("sequelize_video", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: "mariadb",
    timezone: "+05:30",
});


sequelize.authenticate().then(() => {
    console.log("Db Connected")
}).catch((err) => {
    console.log("Error Connecting Db:", err)
})


const Country = sequelize.define('country', {
    countryName: {
        type: Sequelize.STRING,
        unique: true,
    },
}, {
    timestamps: true,
    freezeTableName: false,
    paranoid:true,
    alter: true,
    //force:true,
})

const Capital = sequelize.define('capital', {
    capitalName: {
        type: Sequelize.STRING,
        unique: true,
    },
}, {
    timestamps: true,
    freezeTableName: false,
    //force:true,
})

Country.hasOne(Capital,{});

sequelize.sync({alter:true,force:true}).then(() => {
    console.log("Table Updated")
    try {
        // const user = User.create({
        //     uname:"rajni",
        //     age:20,
        // });


        // Country.bulkCreate([
        //     {
        //         countryName:"Spain"
        //     },
        //     {
        //         countryName:"America"
        //     },
        //     {
        //         countryName:"London"
        //     },
        //     ],{validate:true}).then((data)=>{
        //
        // }).catch((e)=>{
        //     console.log("bulk add",e)
        // });
        let q = 1;




    } catch (e) {
        console.log("Query Error: ", e)
    }

}).catch((e) => {
    console.log("Error in table update :", e)
})




