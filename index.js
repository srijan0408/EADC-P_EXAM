const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')
const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

var empList = [
    { id: 1, name: "Srijan Mishra", email: 'srijan@gmail.com', num: '8487847850', age: '20' },
    { id: 2, name: "Shubham", email: 'shubham@gmail.com', num: '1234567890', age: '21' },
    { id: 3, name: "Swaraj", email: 'swaraj@gmail.com', num: '9876543210', age: '21' }
]


app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
        <head>
            <title>Practical 4</title>
        </head>
        <body>
            <a href="/register"><button>Register Employee</button></a><br><br>
            <a href="/update"><button>Update Employee</button></a><br><br>
            <a href="/delete"><button>Delete Employee</button></a><br><br>
            <a href="/show"><button>Show Single Employee</button></a><br><br>
            <a href="/showAll"><button>Show all Employee</button></a><br><br>
        </body>
    </html>`)
});

app.get('/register', (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    res.send(`
    <!DOCTYPE html>
        <head>
            <title>Practical 4 - Register Employee</title>
        </head>
        <body>
            <form action="/register/addEmployee" method="post">
                <input type="text" name="name" id="name" placeholder="Enter Employee Name"><br><br>
                <input type="text" name="email" id="email" placeholder="Enter Employee Email"><br><br>
                <input type="text" name="number" id="num" placeholder="Enter Employee Mobile Number"><br><br>
                <input type="text" name="age" id="age" placeholder="Enter Employee Age"><br><br>
                <input type="submit" value="submit"><br>
            </form>
        </body>
    </html>
    `)
});
app.get('/update', (req, res) => {
    // res.sendFile(__dirname + "/index2.html");
    res.send(`
    <!DOCTYPE html>
        <head>
            <title>Practical 4 - Update Employee Data</title>
        </head>
        <body>
            <h1>Practical 4</h1>
            <form action="/update/updateDetails" method="post">
                <input type="text" name="id" id="eid" placeholder="Enter Employee ID"><br><br>
                <input type="text" name="name" id="name" placeholder="Enter Employee Name"><br><br>
                <input type="text" name="email" id="email" placeholder="Enter Employee Email"><br><br>
                <input type="text" name="number" id="num" placeholder="Enter Employee Mobile Number"><br><br>
                <input type="text" name="age" id="age" placeholder="Enter Employee Age"><br><br>
                <input type="submit" value="submit">
            </form>
        </body>
    </html>
    `)

})
app.get('/showAll', (req,res)=>{
    // res.send(empList);
    const Response = `
    <!DOCTYPE html>
        <head>
            <title>Employee List</title>
        </head>
        <body>
            <h1>Employee List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    ${empList.map(employee => `
                        <tr>
                            <td>${employee.id}</td>
                            <td>${employee.name}</td>
                            <td>${employee.email}</td>
                            <td>${employee.num}</td>
                            <td>${employee.age}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <br><br><a href="/"><button>Back To Home </button></a><br><br>
        </body>
    </html>
    `;
    res.send(Response);
})

app.get('/delete', (req, res) => {
    res.send(`
    <!DOCTYPE html>
        <head>
            <title>Practical 4 - Delete Data</title>
        </head>
        <body>
            <form action="/delete" method="post">
                <input type="text" name="id" id="eid" placeholder="Enter Employee ID">
                <input type="submit" value="submit"><br>
            </form>
        </body>
    </html>
    `)
    
})

app.get('/show', (req,res)=>{
    res.send(`
    <!DOCTYPE html>
        <head>
            <title>Practical 4 - Show Data</title>
        </head>
        <body>
            <form action="/show/show-data" method="get">
                <input type="text" name="id" id="eid" placeholder="Enter Employee ID">
                <input type="submit" value="submit"><br>
            </form>
        </body>
    </html>
    `)
})

app.get('/show/show-data',(req,res)=>{
    var employee = empList.find(({ id }) => id == (req.query.id));
    if(employee){
        const Response = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Employee Details</title>
            </head>
            <body>
                <h1>Employee Details</h1>
                <p>Employee ID: <b>${employee.id}</b></p>
                <p>Name: <b>${employee.name}</b></p>
                <p>Mobile Number: <b>${employee.num}</b></p>
                <p>Age: <b>${employee.age}</b></p>

                <br><br><a href="/"><button>Back To Home </button></a><br><br>  
            </body>
            </html>
        `;
        res.send(Response);
    }
    else {
        res.status(404).json({ message: 'Employee not found' });
    }
})

app.post('/delete' , (req,res)=>{
    var employee = empList.find(({ id }) => id == (req.body.id));
    if(employee){
        index = empList.indexOf(employee);
        empList.splice(index , 1);
        res.send(`<h2>Data Successfully Deleted</h2><br><br><a href="/"><button>Back To Home </button></a><br><br>`)
    }
    else {
        res.status(404).json({ message: 'Employee not found' });
    }

})

app.post('/register/addEmployee', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var num = req.body.num;
    var age = req.body.age;
    const addEmp = {
        id: empList.length + 1, name, email, num, age
    }
    empList.push(addEmp);
    res.status(201).send(`<h2>Data Successfully Added</h2><br><br><a href="/"><button>Back To Home </button></a><br><br>`);
})

app.post('/update/updateDetails', (req, res) => {
    var employee = empList.find(({ id }) => id == (req.body.id));
    if (employee) {
        employee.name = req.body.name;
        employee.email = req.body.email;
        employee.num = req.body.num;
        employee.age = req.body.age;
        res.status(201).send(`<h2>Data Successfully Updated</h2><br><br><a href="/"><button>Back To Home </button></a><br><br>`);
    }
    else {
        res.status(404).json({ message: 'Employee not found' });
    }
})

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




