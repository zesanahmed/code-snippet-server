const express = require('express');
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://zesanahmed593:<password>@cluster0.w0hifmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run() {
  try {
    await client.connect();
    const taskDB = client.db("taskDB");
    const taskCollection = taskDB.collection("taskCollection");

    // const tasks = {
    //      title: 'sdfd',
    //      deadlines: '2024-06-14', 
    //      description: 'sdfsdfsf', 
    //      priority: 'dsfsddf'
    // }

   

    app.post("/tasks",async (req,res) => {
      const taskData = req.body;
      const result = await taskCollection.insertOne(taskData);
      res.send(result)
    })


    console.log("Database is connected");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) => {
    res.send('Route is working')
});

app.listen(port,(req,res) => {
    console.log("App is listening on port" ,port)
})


// zesanahmed593
// VODooE7NFnUy72pX