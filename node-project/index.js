
const express = require('express');
const {MongoClient, ObjectId} = require('mongodb');
const cors = require('cors');

const bodyParse = require('body-Parse');
const app = express();
const connectionString = 'mongodb://0.0.0.0.27017';
const PORT = 8083;
let dbClient;


app.use(cors());
app.use(express.json());
app.use(bodyParse.urlencoded({extened: true}));
app.use(bodyParser.json());

app.get('/testHello', (req, res)=>{
    res.send("hello world");
})
app.get('/', (req, res)=>{
    dbClient.collection('todoes')
    .find()
    .toArray(function(err, item){
        if(err){
            res.status(400).send(`error ${err}`);
        }
        res.send(item);
    });
    
})
app.get('/:id', (req, res)=>{
   let id = req.param.id;
   dbClient.collection('todos')
   .find()
   // following two lins gives the collection of todos;
   .toArray(function(error, item){// convert todo list into array;
      res.send(items);
   });
})

//add todo
app.post('/addTodo', function(request , response) {// request is a json object which contains data from client side and response is used to send back data
  dbClient.collection('todos').insertOne(req.body, function(err, info  ){
    if(err){
        res.status(400).send(`error ${err}`)
    }
     res.json(info);

  })
}
);


//delet todo
app.delete('/deletTodo:id', function (req, res) {
	db.collection('todos').deleteOne(
    { _id: new ObjectId(req.params.id) },
    function () {
      res.send('Successfully deleted!')
    }
  )
});


//update todos
app.put("/update/:id", function (req, res) {
	dbClient.collection("todos").findOneAndUpdate(
		{ _id: new ObjectId(req.params.id) },
		{
			$set: {
				todo_description: req.body.todo_description,
				todo_responsible: req.body.todo_responsible,
				todo_priority: req.body.todo_priority,
				todo_complete: req.body.todo_complete,
			},
		},
		function () {
			res.send("Success updated!");
		},
	);
    
});




// Connection to mongoDB
//params
//1 url or connection String 
// 
MongoClient.connect(
    connectionString,
    {newUserUrlParser: true},
    (error, client)=>{
        if(error){
            console.log('Connection failed for some reasion');
        }
        else{
            console.log('connection stablist all well');
            dbClient = client.db('crud');// creating db or using old db
            app.listen(PORT, function(){
                console.log(`Server is running on port ${PORT}`);
            });
        }
    },
);