const express = require('express')
const app = express()
const host = '0.0.0.0'
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'dbdesafio2'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)
const sql = `select name from people order by name`
const createTable = `create table people (id int not null auto_increment, name varchar(100) not null, primary key (id), unique(name))`
const insertPeople = `insert into people (name) values ('John Wick')`
let pessoas = "nenhum";

connection.query(createTable, (err, result, fields) => { });
connection.query(insertPeople, (err, result, fields) => { });

connection.query(sql,
    (err, result, fields) => {
        if (err)
            throw err;

        pessoas = result.reduce((acc, obj) => { return acc + '<p>' + obj.name + '</p>' }, "");
    });

connection.end()

app.get('/', (req, res) => {
    res.send('<h1>Full Cycle Rocks!</h1>' + pessoas)
});

app.listen(port, host, () => {
    console.log(`Running on http://${host}:${port}`);
});