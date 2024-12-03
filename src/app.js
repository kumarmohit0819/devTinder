const express = require('express');

const app = express();

app.use((req, res)=>{
    res.send('Welcome')
})

app.listen(3000, ()=>{
    console.log('listening on http://localhost on port 3000');
})