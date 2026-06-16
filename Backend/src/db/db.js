const mongoose = require("mongoose");

async function connectDB() {
    try {
      await mongoose.connect(
  "mongodb://BackendUser:qvyE1qafmCg0wQ7T@ac-6sq95r9-shard-00-00.pv8wx6y.mongodb.net:27017,ac-6sq95r9-shard-00-01.pv8wx6y.mongodb.net:27017,ac-6sq95r9-shard-00-02.pv8wx6y.mongodb.net:27017/Rajput?ssl=true&replicaSet=atlas-3u5jjf-shard-0&authSource=admin&appName=BackendProjects"
);

        console.log("DB is connected");
    } catch (err) {
        console.log("DB Error:", err);
    }
}


module.exports = connectDB;







// qvyE1qafmCg0wQ7T-Updated password of user Backend_User
