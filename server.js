const express = require('express');
const app = express();  
const port = 3000;
const studentroute = require('./src/student/routes');
app.use(express.json());
app.get('/',(req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1/students', studentroute);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});