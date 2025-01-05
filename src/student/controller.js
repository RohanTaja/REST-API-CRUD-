const pool = require('../../db');
const queries = require('./query');
const getStudents = (req, res) => {
   pool.query(queries.getStudents, (error, results) => {
       if(error) throw error;
       res.status(200).json(results.rows);
   });
};
const getStudentById = (req, res) => {
    pool.query(queries.getStudentById, [req.params.id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};
const addStudent = (req, res) => {
   const { name, email, age, dob } = req.body;   
   //check if email exists
   pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.send('Email already exists');
        }
        //add student
        else{
            pool.query(queries.addStudent, [name,email,age,dob], (error, results) => {
                if(error) throw error;
                res.status(201).send('Student added successfully');
                console.log('Student added successfully'); 
        });
    }
   });
};
const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound =!results.rows.length;
        if(noStudentFound) {   
            res.status(404).send('Student not found');
         }
         else{
            pool.query(queries.removeStudent, [id], (error, results) => {
                if(error) throw error;
            });
            res.status(200).send('Student removed successfully');
         }
    });
};
const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;

    pool.query(queries.getStudentById,[id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if(noStudentFound) {    
            res.status(404).send('Student not found');
         }
         else{    
            pool.query(queries.updateStudent, [name,id], (error, results) => {
                if(error) throw error;
                res.status(200).send('Student updated successfully');
        });
    }
    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};