import{MongoClient} from "mongodb"
const connection = MongoClient.connect("mongodb+srv://adityakamodiya:11223344@cluster0.j4ukslx.mongodb.net/MyApi?retryWrites=true&w=majority&appName=Cluster0");
export const dbName = "MyApi"
export default connection

// mongodb+srv://adityakamodiya:11223344@cluster0.j4ukslx.mongodb.net/fileuploader?retryWrites=true&w=majority&appName=Cluster0