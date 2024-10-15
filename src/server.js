require('dotenv').config();
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const server=express()
const port=5000;

server.use(cors());
server.use(bodyParser.json());
mongoose.connect(process.env.mongooseUrl)
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

  
    const monthMap = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };
   




  server.post('/api/dateRange', async(req, res) => {
    const {day1,day2,month1,month2,year1,year2} = req.body;
    let monthNamesInRange = Object.keys(monthMap).slice(monthMap[month1], monthMap[month2] + 1);

    let result=await data.find({$and:[{arrival_date_day_of_month:{$gte:parseInt(day1),$lte:parseInt(day2)}},{ arrival_date_month: { $in: monthNamesInRange} },{arrival_date_year:{$gte:parseInt(year1),$lte:parseInt(year2)}}]})    
        
    res.status(200).json(result);
});
server.listen(port,()=>{console.log("server is running")})

