const express = require('express');
const {user_game, user_game_biodata, user_game_history} = require('./../models');

const app = express();

// End point
app.get("/", (req, res) => {
    res.render('index')
})

app.post("/login", (req, res) => {
    user_game.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(user_game => {
        if(user_game){
            res.redirect('/dashboard')
        } else {
            res.status(433).send("Invalid Username or Password!")
        }
    }).catch(error => {
        res.status(433).send("User not Found!")
    })
})

app.get("/dashboard", (req, res) => {
    user_game_biodata.findAll()
    .then(user_game_biodata => {
        res.render('dashboard/index', {user_game_biodata})
    })
})

app.get("/dashboard/register", (req, res) => {
    res.render('dashboard/register')
})

app.post("/dashboard/register", (req, res) => {
    user_game.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        approved: true
    }).then(user_game_biodata.create({
        user_game_id: req.body.user_game_id,
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        bio: req.body.bio
    }))
    .then(user_game => {
        res.redirect("/dashboard")
    }).catch(error => {
        res.send(404).send("Input was Error!!")
    })
})

app.get("/dashboard/update/:id", (req, res) => {
    user_game_biodata.findOne({
        where: {id: req.params.id}
    }).then(user_game_biodata => {
        res.render("dashboard/update", {user_game_biodata})
    })
})

app.post("/dashboard/update/:id", (req, res) => {
    const query ={
        where: {id: req.params.id}
    }
    user_game_biodata.update({
        user_game_id: req.body.user_game_id,
        name: req.body.name,
        dob: req.body.dob,
        address: req.body.address,
        bio: req.body.bio
    }, query)
    .then(() => {
        res.redirect("/dashboard")
    })
    .catch(error => {
        res.status(433).send(error)
    })
})

app.get("/dashboard/delete/:id", (req, res) => {
    user_game_biodata.destroy({
        where: {id: req.params.id}
    }).then(user_game.destroy({
        where: {id: req.params.id}
    }))
    .then (() => {
        res.redirect("/dashboard")
    }).catch (error => {
        res.status(433).send("Deletion was Error!!")
    })
})

module.exports = app