const {Sequelize, Op} = require("sequelize");

const squelize = new Sequelize("sequelize_video", "root", "",{
    host:"localhost",
    port:3306,
    dialect:"mariadb",
    timezone: "+05:30"
});



squelize.authenticate().then(() => {
    console.log("Db Connected")
}).catch((err) => {
    console.log("Error Connecting Db:", err)
})


const Student = squelize.define("student",{
    studentId:{
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        field:"student_id",
    },
    name:{
        type:Sequelize.STRING(255),
        allowNull:false,
        field:"name",
        validate:{
            len:[4,20]
        }
    },
    favouriteClass:{
        type:Sequelize.STRING(25),
        allowNull:false,
        field:"favourite_class",
        defaultValue:"Computer Science"

    },
    schoolYear:{
        type:Sequelize.INTEGER,
        allowNull: false,
        field:"school_year",
    },
    subscribedToWittcode:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
        field:"subscribed_to_wittcode",
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
},{
    timestamps:true,
    freezeTableName:false,
    alter:true,
    //force:true,
})

Student.sync().then(()=>{
    console.log("Table Updated")
    // try{
    //
    //
    //
    //     Student.bulkCreate([
    //         {
    //             name:"baami",
    //             schoolYear:20,
    //         },
    //         {
    //             name:"raman",
    //             schoolYear:20,
    //             favouriteClass:"adbvbgasd",
    //         },
    //         {
    //             name:"trish",
    //             schoolYear:62,
    //             favouriteClass:"rtrtg",
    //         },
    //         {
    //             name:"vija",
    //             schoolYear:72,
    //             favouriteClass:"sdasdert",
    //         },
    //         ],{validate:true}).then((data)=>{
    //
    //     }).catch((e)=>{
    //         console.log("bulk add",e)
    //     });
    //
    //
    // }catch (e){
    //     console.log("Creation Error: ",e)
    // }
    Student.findAll({
            attributes:["name"],
            where:{
                [Op.or]:{
                    favouriteClass:"Computer Science",
                    subscribedToWittcode: true,
                }
            }
        }
    ).then((data)=>{
        console.log("q1 ********************************")

        data.forEach((elm)=>{
            console.log(elm.toJSON())
        })
    })
    Student.findAll(
        {
            attributes:["schoolYear",[squelize.fn('count',squelize.col('school_year')),"num_students"]],
            group:"school_year"
        }
    ).then((data)=>{
        console.log("q2 ********************************")

        data.forEach((elm)=>{
            console.log(elm.toJSON())
        })
    })


}).catch((e)=>{
    console.log("Error in table update :", e)
})