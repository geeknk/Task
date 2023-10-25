const dbConnect = require('./mongodb');
const md5 = require('md5');
const usersData = require('./userdata');
const usersProfileData = require('./userprofiledata');
let i=0;

const insert = async ()=>{

  const db = await dbConnect();
  
  const userCol = await db.collection('Users');
  const userProfileCol = await db.collection('UsersProfile');
  for (const userData of usersData) {
    userData.password= md5(userData.password);
    const userResult = await userCol.insertOne(userData);
    let userProfileData = {
      user_id : userResult.insertedId,
      dob : usersProfileData[i].dob,

      Mobile_No : usersProfileData[i].Mobile_no
    }
    // console.log(userResult.insertedId);
    i++;

    await userProfileCol.insertOne(userProfileData)
  }

}

insert();