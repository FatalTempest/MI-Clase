const express = require("express");
const mysql = require("mysql");
const app = express();
const config = {
    host : 'm7nj9dclezfq7ax1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user : 'qzqnulaytevijlws',
    password : 'i84u2au7zwfo18xr',
    database: "cl93gc22d59vt2qc",
    port: "3306"
}

const conn = mysql.createConnection(config);


app.get('/db',function(req,res){
    try{
        conn.connect();
        conn.query('SELECT * FROM mi02',function(err,rows,fields){
                if(err) throw err;
            for(var i = 0; i<rows.length; i++)
            {
                if(req.query.user == rows[i].username && req.query.pass == rows[i].password){
                    res.send(rows[i]);
                }
            }
            
            res.send(`<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>chale</title>
            </head>
            <body>
                <h1>imagina que suena una cancion de violin triste</h1>
                <h5>digo, el usuario no existe</h5>
            </body>
            </html>`);
        });
    }catch(err){
        console.error(err);
    } finally{
        conn.end();
    }
});

app.get('/',function(req,res){
    res.send(`<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AAAA</title>
    </head>
    <body>
        <form action="/db" method="get">
            <label>Usuario:</label>
            <input type="text" name="user">
            <label>Contraseña:</label>
            <input type="text" name="pass">
            <input type="submit">
        </form>
    </body>
    </html>`);
});

app.post('/',function(req,res){
    res.send('saludos desde post')
})

app.get('/saludo',function(req,res){
    res.send('rex volador');
});

app.listen(3000,()=>
{
    console.log("ESTO SE VA A DESCONTROLAR en el puerto 3000")
})