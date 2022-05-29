// importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

//llamado al modelo
const Project = require('../models/project');

router.get('/', (req, res) => {
    if (req.user) {
        res.render("pages/project/projectAddEdit", {
            viewTitle: "New project"
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
    newProject(req, res);
    else
    updateProject(req, res);
});

//metodo para registrar
function newProject(req, res) {
    var project = new Project();
    project.projectname = req.body.projectname;
    project.projectstart = req.body.projectstart;
    project.projectend = req.body.projectend;
    project.save((err) => {
        if(!err){
            res.redirect("project/listP");
        }
        else {
            console.log("Se ha producido un error");
        }
    });
}

//metodo para actualizar
function updateProject(req, res) {
    Project.findOneAndUpdate({_id: req.body._id}, req.body, {new: true},
        (err) => {
            if(!err){
                res.redirect("project/listP");
            } else {
                console.log("pages/project/projectAddEdit", {
                    viewTitle: "Update project",
                    project: req.body
                })
            }
        });
}

router.get('/listP', (req, res) => {

    if (req.user) {
        Project.find((err, docs) => {
            if(!err){
                res.render("pages/project/listP", {
                    viewTitle: "Project List",
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
    Project.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("pages/project/projectAddEdit", {
                viewTitle: "Update Project",
                project: doc
            });
        }
    })
})

router.get('/delete/:id', (req, res) => {
    Project.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.redirect("/project/listP");
        } else {
            console.log("No se ha podido eliminar el registro", err);
        } 
    })
})
module.exports = router;