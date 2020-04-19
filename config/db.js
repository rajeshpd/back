const mongoose = require("mongoose");
const config = require ("config")
const connectDB = async () => {
    try{
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });
  console.log(`Mongo Db connected: ${conn.connection.host}`);
}catch (err){
    console.error(err.message);
    process.exit(1);
}
};

module.exports = connectDB;