import Express  from "express";   
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://dbabduzab:abduzab@cluster0.udemq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
const user =mongoose.model('user',{
    student_name: String,
    father_name: String,
    rollno: String
});
const app = Express()
const port=process.env.PORT || 3000
app.use(cors())
app.use(Express.json())
app.use(morgan('short'))

app.use((req, res, next) => {
    console.log("a request came", req.body);
    next()
  })
  app.get('/users',(req,res)=>  {
      user.find({},(err,users)=>  {
          if(!err){
              res.send(users)
          }else{
              res.status(500).send("error happend")
          }
      })
  })
  app.get('/user/:id',(req,res)=>{
      user.findOne({_id:req.params.id},(err,user)=>{
          if(!err){
              res.send(user)
          }else{
              res.status(500).send("eroor happend")
          }

      })
  })
  app.post('/user',(req,res)=>{
      if(!req.body.student_name || !req.body.father_name || !req.body.rollno)
      {
          res.status(400).send("invalid data");
      }else{
          const newuser=new user({
              student_name:req.body.student_name,
              father_name:req.body.father_name,
              rollno:req.body.rollno
          })
          newuser.save().then(()=>{
              console.log('user created sucessfuly')
              res.send("user created")
              console.log("created")
          })
      }
  })
  app.put('/user/:id',(req,res)=>{
      let updateobj={}
      if(req.body.student_name){
          updateobj.student_name=req.body.student_name
      }      if(req.body.father_name){
        updateobj.father_name=req.body.father_name}
        if(req.body.rollno){
            updateobj.rollno=req.body.rollno}

            user.findByIdAndUpdate(req.params.id, updateobj, { new: true },
                (err, data) => {
                  if (!err) {
                    res.send(data)
                  } else {
                    res.status(500).send("error happened")
                  }
                })
            })
            app.delete('/user/:id', (req, res) => {
            
              user.findByIdAndRemove(req.params.id, (err, data) => {
                if (!err) {
                  res.send("user deleted")
                } else {
                  res.status(500).send("error happened")
                }
              })
            })
            
            app.get('/home', (req, res) => {
              res.send('here is your home')
            })
            app.get('/', (req, res) => {
              res.send('Hi I am a hello world Server program')
            })
            
            app.listen(port, () => {
              console.log(`Example app listening at http://localhost:${port}`)
            })