const express = require('express');
const dbConnect = require('./mongodb');
const mongodb = require('mongodb')
const app = express();

function getAge(birth) {
    let today = new Date();
    let curr_date = today.getDate();
    let curr_month = today.getMonth() + 1;
    let curr_year = today.getFullYear();
 
    let pieces = birth.split('-');
    let birth_date = pieces[2];
    let birth_month = pieces[1];
    let birth_year = pieces[0];
 
    if (curr_month == birth_month && curr_date >= birth_date) return parseInt(curr_year-birth_year);
    if (curr_month == birth_month && curr_date < birth_date) return parseInt(curr_year-birth_year-1);
    if (curr_month > birth_month) return parseInt(curr_year-birth_year);
    if (curr_month < birth_month) return parseInt(curr_year-birth_year-1);
 }
 

app.get('/age/average', async (req,res)=>{

    let conn = await dbConnect();
    let data = await conn.collection('UsersProfile');
    let age=0;

    data = await data.find().toArray();

    for (const i of data) {
        
        age = age + getAge(i.dob);
    }
    age = age/data.length;
    console.log(age);
    res.send("Average Age : "+ age.toString());
});

app.get('/age/delete', async (req,res)=>{

    let conn = await dbConnect();
    let userProfileData = await conn.collection('UsersProfile');
    let userData = await conn.collection('Users');
    let age=0;

    let data = await userProfileData.find().toArray();

    for (const i of data) {

        age = getAge(i.dob);
        if(age>25){
            let a = await userProfileData.deleteOne({"_id": new mongodb.ObjectId(i._id)})
            let b = await userData.deleteOne({"_id": i.user_id})
            console.log("user deleted");
        }
    }
});

app.listen(5001);