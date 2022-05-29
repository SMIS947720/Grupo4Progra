// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Department = require('../models/department');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/department/departmentAddEdit", {
            viewTitle: "New department"
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
    newDepartment(req, res);
    else
    updateDepartment(req, res);
});

//metodo para registrar
function newDepartment(req, res) {
    var department = new Department();
    department.name = req.body.name;
    department.location = req.body.location;
    department.costcenter = req.body.costcenter;
    department.save((err) => {
        if(!err){
            res.redirect("department/listD");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateDepartment(req, res) {
    Department.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        (err) => {
            if(!err){
                res.redirect("department/listD");
            } else {
                console.log("pages/department/departmentAddEdit", {
                    viewTitle: "Update department",
                    department: req.body
                })
            }
        });
}

router.get('/listD', (req, res) => {

    if (req.user) {
        Department.find((err, docs) => {
            if(!err){
                res.render("pages/department/listD", {
                    viewTitle: "Department list",
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
    Department.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("pages/department/departmentAddEdit", {
                viewTitle: "Update department",
                department: doc
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Department.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/department/listD");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
})
module.exports = router;