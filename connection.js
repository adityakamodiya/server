import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();
const connection = MongoClient.connect(process.env.MONGO_URI);
export const dbName = process.env.DB_NAME;
export default connection

// mongodb+srv://adityakamodiya:11223344@cluster0.j4ukslx.mongodb.net/fileuploader?retryWrites=true&w=majority&appName=Cluster0