// var http = require('http')
// var hi =require("./new")
// var dt =require('./Date')
// var url= require('url')
// var fs = require('fs')
// const { error } = require('console')


// http.createServer((req, res) => {
//     fs.appendFile("test.txt","\nHello vijay",(err)=>{
//         console.log(err);
//         res.end();
//     });

//     fs.unlink()

//     // fs.readFile("demo.html",(error,data)=>{
//     //     res.write(data);
//     // })
//     // var qobj = url.parse(req.url,true).query;
//     // res.write("Sum:"+hi.Sum(parseInt(qobj.a),parseInt(qobj.b)));
//     // res.write("\nSub:"+hi.Sub(parseInt(qobj.a),parseInt(qobj.b)));
//     // res.write("\nMul:"+hi.Mul(parseInt(qobj.a),parseInt(qobj.b)));
//     // res.write("\nDiv:"+hi.Div(parseFloat(qobj.a),parseFloat(qobj.b)));
//     // res.write(dt.Today());
//     // res.end('');

// }).listen(8080) 


var express = require('express')
var app = express();
var cors = require('cors')
app.use(cors())
app.use(express.json())
var mongodb = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://vijaykanthan03:vijay2003@cluster0.gk0cf4e.mongodb.net/Expense-Tracker?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('connected to mongodb'))



const expenseSchema = new mongoose.Schema({
    date: {type:String, required:true},
    category: {type:String, required:true},
    amount: {type:Number, required:true},
})

let Expenses = mongoose.model("Expenses",expenseSchema)


var arr = [{
    name: 'vj',
    age: 21,
}]

app.get('/get',  async (req, res)=> {
    const expenses = await Expenses.find();
    res.json(expenses);
});

app.post('/api', async (req, res) => {
    const {category,amount} =req.body;
    const newItem = new Expenses({date:new Date().toLocaleDateString(),category,amount});
    newItem.save();
    res.status(200).json(newItem)
})

app.put("/api/:id",async (req,res)=>{
    let _id = req.params.id;
    const itemToUpdate = await Expenses.findByIdAndUpdate(_id,req.body);
    if (!itemToUpdate) return res.status(404).send("item not found")
    res.status(200).send("modified")
})


app.delete("/del/:id",async(req,res)=>{
    let itemId = req.params.id;
    const itemtoDelete = await Expenses.deleteOne({_id: new mongodb.ObjectId(itemId)});
    if(!itemtoDelete) return res.status(404).send("item not found")
    res.status(200).send("delete")

})

app.listen(8080, () => {
    console.log('server running')
})