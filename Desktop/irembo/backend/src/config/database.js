import mongoose from 'mongoose';

const connectdb = () => {
    mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => { console.log("database connected......") })
        .catch((error) => { console.log("database not connected" + error) })
}

export default connectdb;