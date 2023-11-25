const fs = require("fs");
const app = require("express")();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  let response = {status: ""};
  let loginInfo = JSON.parse(fs.readFileSync("./db.json"));
  if(!req.body.type){
    if(loginInfo.students.find((e) => e.id == req.body.id).password == req.body.password){
      response.status = "accepted";
    }else{
      response.status = "rejected";
    }
  }else{
    if(loginInfo.students.find((e) => e.id == req.body.id).password == req.body.password){
      response.status = "accepted";
    }else{
      response.status = "rejected";
    }
  }
  res.send(JSON.stringify(response));
  res.status(200);
})

app.get('/departments', (req, res) => {
  let departmentInfo = JSON.parse(fs.readFileSync("./db.json"));
  console.log(JSON.stringify(departmentInfo.departments))
  console.log(departmentInfo.departments)

  res.send(JSON.stringify(departmentInfo.departments));
  res.status(200);
})

app.post('/student/signout', (req, res) => {
  let response = {status: ""};
  let database = JSON.parse(fs.readFileSync("./db.json"));
  console.log(req.body.item);
  console.log(database.departments[req.body.dept.toLowerCase()].inventory)
  let item = database.departments[req.body.dept.toLowerCase()].inventory.find((e) => {e.item === req.body.item; console.log(e.item); console.log(req.body.item)}).obj.find((e) => e.trackingNum == req.body.trackingNum);
  if(item === undefined){
    response.status = "REJECTED";
  }else if(item.status != "SIGNED OUT"){
    item.student = req.body.student;
    item.dueDate = req.body.dueDate;
    item.dateOut = Date.now();
    item.status = "RESERVED";
    response.status = "ACCEPTED";
  }else{
    response.status = "REJECTED";
  }
  database.students.find((e) => {id == req.body.student}).history.push({trackingNum: req.body.trackingNum, dueDate: req.body.dueDate, dateOut: Date.now()})
  database.departments[req.body.dept.toLowerCase()].inventory.find((e) => {e.item == req.body.item}).obj.find((e) => e.trackingNum == req.body.trackingNum) = item;
  res.send(JSON.stringify(response));
  res.status(200);
  console.log(req.body);
  fs.writeFileSync("./db.json", JSON.stringify(database))
})
app.post('/student/return', (req, res) => {
  let response = {status: ""};
  let database = JSON.parse(fs.readFileSync("./db.json"));
  let item = departmentInfo[req.body.dept.toLowerCase()].inventory.find((e) => {e.item == req.body.item}).obj.find((e) => e.trackingNum == req.body.trackingNum);
  if(item === undefined){
    response.status = "REJECTED";
    item.status = "IN STOCK";
    item.student = 0;
    item.dueDate = 0;
    item.dateOut = 0;
    response.status = "ACCEPTED"
  }
  database.departments[req.body.dept.toLowerCase()].inventory.find((e) => {e.item == req.body.item}).obj.find((e) => e.trackingNum == req.body.trackingNum)
  res.send(JSON.stringify(response));
  res.status(200);
})

app.listen(3000);
