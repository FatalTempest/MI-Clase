const express = require("express");
const mysql = require("mysql");
const app = express();
const config={
    host:'m7nj9dclezfq7ax1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user : 'qzqnulaytevijlws',
    password : 'i84u2au7zwfo18xr',
    database: "cl93gc22d59vt2qc",
    port: "3306"
}


const conn=mysql.createConnection(config);
conn.connect();

app.get('/db', function(req,res) {
    try {
        conn.query('SELECT * FROM mi02', function(err,rows,fields){
        if(err) throw err;
        
        for(var i =0; i<rows.lenght; i++){
            console.log(`Usuario: ${rows[i].username}`);
        }

        if(req.query.user == rows[i].username && req.query.pass == rows[i].password){

            res.send(rows[i]);

        }
            
         res.send(`
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Que weba</title>
            </head>
            <body>
   
   
             <form action="/db" method="GET">
                <p>Usuario: </p>
                <input type="text" name="user">

                <p>Contraseña: </p>
                <input type="text" name="pass">
       
                <p></p>
                <input type="submit">
             </form>
   

             </body>
             </html>`)
        });
    
    } catch(err){
        console.error(err);
    }finally{
        conn.end();
    }
    
});

app.get('/', function(req,res) {
   res.send(`<html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Que weba</title>
   </head>
   <body>
       
       
       <form action="/db" method="GET">
           <p>Usuario: </p>
           <input type="text" name="user">
   
           <p>Contraseña: </p>
           <input type="text" name="pass">
           
           <p></p>
           <input type="submit">
       </form>
       
   
   </body>
   </html>`)
    
});

app.post('/despedida', function(req,res){
    res.send('soidA desde el Post');
});

app.listen(3000,()=>{
    console.log(`El Servidor esta inicializado en el puerto 3000`)
});

