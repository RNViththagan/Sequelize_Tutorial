const {Sequelize, Op, DataTypes} = require("sequelize");
const bcrypt = require('bcrypt')
const zlib = require('zlib')
const sequelize = new Sequelize("sequelize_video", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: "mariadb",
    timezone: "+05:30"
});


sequelize.authenticate().then(() => {
    console.log("Db Connected")
}).catch((err) => {
    console.log("Error Connecting Db:", err)
})


const User = sequelize.define("user", {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
    },
    referenceNumber: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER.UNSIGNED
    },
    uname: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "username",
        validate: {
            len: [3, 10]
        },
        get() {
            const rawValue = this.getDataValue('uname');
            return rawValue.toUpperCase();
        }
    },
    pwd: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "password",
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('pwd', hash)
        }
    },
    description: {
        type: DataTypes.STRING(255),
        set(value) {
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('description', compressed)
        },
        get() {
            const value = this.getDataValue('description');
            const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
            return uncompressed.toString();
        }
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 21,
    },
    live: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
    aboutUser: {
        type: DataTypes.VIRTUAL,
        get() {
            return `${this.uname} ${this.description}`
        }
    },
    createdAt: {
        //allowNull: false,
        type: Sequelize.DATE,
        field: "created_at",
    },
    updatedAt: {
        //allowNull: false,
        type: Sequelize.DATE,
        field: "updated_at",
    }
}, {
    timestamps: true,
    freezeTableName: false,
    //alter: true,
    //force:true,
})

User.sync().then(() => {
    console.log("Table Updated")
    try {
        // const user = User.create({
        //     uname:"rajni",
        //     age:20,
        // });


        // User.bulkCreate([
        //     {
        //         uname:"raman",
        //         age:32,
        //         pwd:"adbvbgasd",
        //     },
        //     {
        //         uname:"trish",
        //         age:62,
        //         pwd:"rtrtg",
        //     },
        //     {
        //         uname:"vija",
        //         age:72,
        //         pwd:"sdasdert",
        //     },
        //     ],{validate:true}).then((data)=>{
        //
        // }).catch((e)=>{
        //     console.log("bulk add",e)
        // });
        let q = 1;

        // User.findAll(
        //     {
        //         where: {
        //             referenceNumber: 1
        //         },
        //         raw: true
        //     }
        // ).then((data) => {
        //     console.log(q++, "*****************************")
        //     console.log(data)
        // })

        // User.findByPk('2a87b418-cb81-4fb8-92d6-45b5379aeafc').then((data) => {
        //     console.log(q++, "*****************************")
        //     console.log(data.toJSON())
        // })

        // User.findOne(
        //     {
        //         where: {
        //             age: {
        //                 [Op.lt]: 35,
        //                 [Op.gt]: 20,
        //
        //             },
        //         },
        //         raw: true
        //     }
        // ).then((data) => {
        //     console.log(q++, "*****************************")
        //     console.log(data)
        // })


        // User.findOrCreate(
        //     {
        //         where: {
        //             uname: "vimal",
        //             age:26
        //         },
        //         defaults: {
        //             age: 26
        //         },
        //         raw: true
        //     }
        // ).then((data) => {
        //     console.log(q++, "*****************************")
        //     const [result, created] = data;
        //         console.log("result",result, "created",created)
        // })

        // User.findAndCountAll(
        //     {
        //         where: {
        //             // uname: "wittcode",
        //             age:{
        //                 [Op.and]: {
        //                     [Op.gt]:22,
        //                     [Op.lt]:31,
        //                 }
        //             }
        //         },
        //         raw: true
        //     }
        // ).then((data) => {
        //     console.log(q++, "*****************************")
        //     try{
        //         const {count, rows} = data;
        //         console.log("count: ",count, "\nrows: ",rows)
        //     }
        //     catch (e){
        //         console.log("data: ",data)
        //     }
        //
        // })


        //Setters and Getters
        //     User.findOne().then((data) => {
        //         console.log(q++, "*****************************")
        //         console.log("data: ",data.uname)
        //     })

        // const user = User.create({
        //     uname:"Wire",
        //     pwd:"wire",
        //     description:"This is my description it could be really long"
        // }).then((data) => {
        //         console.log(q++, "*****************************")
        //         console.log("data: ",data)
        //     })

        User.findOne({
            where: {
                referenceNumber: 30
            },
        }).then((data) => {
            console.log(q++, "*****************************")
            console.log("data: ", data.description)
        })


    } catch (e) {
        console.log("Query Error: ", e)
    }

}).catch((e) => {
    console.log("Error in table update :", e)
})




