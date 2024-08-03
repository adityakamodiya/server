import{MongoClient} from "mongodb"
import { configDotenv } from "dotenv";
configDotenv();
const connection = MongoClient.connect(process.env.mystring);
export const dbName = process.env.dbName;
export default connection

// mongodb+srv://adityakamodiya:11223344@cluster0.j4ukslx.mongodb.net/fileuploader?retryWrites=true&w=majority&appName=Cluster0