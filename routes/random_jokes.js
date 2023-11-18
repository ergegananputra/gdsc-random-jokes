const express = require('express');
const router = express.Router();

//import express validator
const { body, validationResult } = require('express-validator');

//import database
const connection = require('../config/database');

// Table Setting
let tableName = 'jokes';

/**
 *  INDEX JOKES
 */
router.get('/all', function (req, res) {
    //query
    connection.query(`SELECT * FROM ${tableName} ORDER BY id desc`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Berhasil mengambil data tabel Jokes',
                data: rows
            })
        }
    });
});

/**
 * STORE POST
 */
router.post('/store', [

    //validation
    body('author').notEmpty(),
    body('jokes').notEmpty(),
    body('rating').notEmpty(),

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //define formData
    let formData = {
        author: req.body.author,
        jokes: req.body.jokes,
        rating: req.body.rating
    }

    // insert query
    connection.query(`INSERT INTO ${tableName} SET ?`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(201).json({
                status: true,
                message: 'Insert Data Successfully',
                data: rows[0]
            })
        }
    })

});

/**
 * SHOW POST
 */
router.get('/(:id)', function (req, res) {

    let id = req.params.id;

    connection.query(`SELECT * FROM ${tableName} WHERE id = ${id}`, function (err, rows) {

        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        }

        // if post not found
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: 'Data Post Not Found!',
            })
        }
        // if post found
        else {
            return res.status(200).json({
                status: true,
                message: 'Detail Data Post',
                data: rows[0]
            })
        }
    })
});

/**
 * UPDATE POST
 */
router.patch('/update/:id', [

    //validation
    body('author').notEmpty(),
    body('jokes').notEmpty(),
    body('rating').notEmpty(),

], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    //id post
    let id = req.params.id;

    //data post
    let formData = {
        author: req.body.author,
        jokes: req.body.jokes,
        rating: req.body.rating
    }

    // update query
    connection.query(`UPDATE ${tableName} SET ? WHERE id = ${id}`, formData, function (err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Update Data Successfully!'
            })
        }
    })

});

/**
 * DELETE POST
 */
router.delete('/delete/(:id)', function(req, res) {

    let id = req.params.id;
     
    connection.query(`DELETE FROM ${tableName} WHERE id = ${id}`, function(err, rows) {
        //if(err) throw err
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Delete Data Successfully!',
            })
        }
    })
});

/**
 * RANDOM JOKES
 */
router.get('/', function (req, res) {
    //query
    connection.query(`SELECT * FROM ${tableName} ORDER BY RAND() LIMIT 1`, function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal Server Error',
            })
        } else {
            return res.status(200).json({
                status: true,
                message: 'Berhasil mengambil data tabel Jokes',
                data: rows
            })
        }
    });
});

module.exports = router;