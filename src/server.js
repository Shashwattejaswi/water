const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const server=express()
const port=5000;
const mongooseUrl='mongodb+srv://shashwatteju06:tejaswi06@cluster0.wjnmf.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0'

server.use(cors());
server.use(bodyParser.json());

mongoose.connect(mongooseUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const dataSchema=new mongoose.Schema({
    hotel:String,
    arrival_date_year:String,
    arrival_date_month:String,
    arrival_date_day_of_month:String,
    adults:String,
    children:String,
    babies:String,
    country:String

})

const data=mongoose.model('data',dataSchema,'hotelSet')



server.get('/api/data', async (req, res) => {
    try {
      const result = await data.find({children:{$gt:1}}); 
      res.json(result); 
    } catch (err) {
      res.status(500).send('Error fetching data from MongoDB');
    }
  });

  server.post('/api/dateRange', (req, res) => {
    const {day1,day2,month1,month2,year1,year2} = req.body;
    

    
    // Here you can handle the date as needed (e.g., save to database)
    
    res.status(200).json({ message: 'Date received successfully'});
});
server.listen(port,()=>{console.log("server is running")})

