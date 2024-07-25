import express from "express";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import connection, { dbName } from "./connection.js";

const app = express();
const port = 8002;
let db;
// Setting up CORS
app.use(express.json());
app.use(cors({ origin: "*" }))
app.use(fileUpload({ useTempFiles: true }))
app.use(express.urlencoded({ extended: false }))


cloudinary.config({
  cloud_name: 'da2oqj7qe',
  api_key: '687377994928293',
  api_secret: 'GcXxtuXnuQ-LJGycDcmf_DGqw_E'
});


// Determine the directory name
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// Multer instance with the storage configuration
// const upload = multer({ storage: storage });

// File upload endpoint
// app.post('/upload', upload.single('filee'), (req, res) => {
//   const filee = req.file;
  
//   console.log(filee);
//   res.send('File uploaded successfully.');   
// });




app.post('/send', async(req, res) => {
  let {name, location, descripition, Fees, timings} = {...req.body};

  let img1 = req.files.image1.tempFilePath;
  let img2 = req.files.image2.tempFilePath;
  let img3 = req.files.image3.tempFilePath;
  let imagearr = [img1, img2, img3];
  let URL = [];

  // Create an array of promises for the upload tasks
  let uploadPromises = imagearr.map(imagePath => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imagePath, (err, result) => {
        if (err) {
          console.error("This is error:", err);
          reject(err);
        } else {
          console.log(result.secure_url);
          resolve(result.secure_url);
        }
      });
    });
  });

  // Wait for all the uploads to complete
  try {
    URL = await Promise.all(uploadPromises);
    console.log(URL); // URL array should now contain all the secure URLs

    let id;
    let dataCollection = await db.collection('Collection').find().toArray();

    if (dataCollection.length === 0 && URL.length > 0) {
      id = 1;
      let data = await db.collection('Collection').insertOne({id, name, location, descripition, Fees, timings, URL});
      res.send(data);
    }
     else {
      id= dataCollection [dataCollection.length-1].id  +1;
      // console.log(id)
      let data = await db.collection('Collection').insertOne({id, name, location, descripition, Fees, timings, URL});
      res.send(data);

    }
  }
   catch (error) {
    console.error("Error uploading images:", error);
    // res.status(500).send("Error uploading images");
  }
});


app.get('/', async(req,res)=>{
  console.log(req.url)
  let data = await db.collection('Collection').find().toArray();
  res.send(data)
})
app.get('/:id', async(req,res)=>{
  let id_no = req.url.split('')[1];
  console.log(Number(id_no))
  let data = await db.collection('Collection').find({id:Number(id_no)}).toArray();
  console.log(data)
  res.send(data)
  
})
// console.log(data)
const fun =    async ()=>{
 console.log('hhh')
// let data =  await db.collection('Collection').find().toArray();

}
fun();



connection.then((client) => {
  db = client.db(dbName)
  app.listen(port, () => console.log(port + " started"))
})
