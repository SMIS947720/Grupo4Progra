// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Employee = require('../models/employee');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/employee/employeeAddEdit", {
            viewTitle: "New employee"
        });
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }
    
});

router.post('/', (req, res) => {
    if(req.body._id == '')
    newEmployee(req, res);
    else
    updateEmployee(req, res);
});

//metodo para registrar
function newEmployee(req, res) {
    var employee = new Employee();
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.email = req.body.email;
    employee.phone = req.body.phone;
    employee.hiredate = req.body.hiredate;
    employee.jobid = req.body.jobid;
    employee.salary = req.body.salary;
    employee.commission = req.body.commission;
    employee.save((err) => {
        if(!err){
            res.redirect("employee/listE");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateEmployee(req, res) {
    Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        (err) => {
            if(!err){
                res.redirect("employee/listE");
            } else {
                console.log("pages/employee/employeeAddEdit", {
                    viewTitle: "Update employee",
                    employee: req.body
                })
            }
        });
}

router.get('/listE', (req, res) => {

    if (req.user) {
        Employee.find((err, docs) => {
            if(!err){
                res.render("pages/employee/listE", {
                    viewTitle: "Employee List",
                    list: docs
                });
            } else {
                console.log("Error al listar las marcas" + err);
            } 
        })
      } else {
        res.render('../views/pages/login', {
          message: "Inicie sesión para continuar",
          messageClass: "alert-danger"
        });
      }

    
})

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("pages/employee/employeeAddEdit", {
                viewTitle: "Update employee",
                employee: doc
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/employee/listE");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
})
module.exports = router;