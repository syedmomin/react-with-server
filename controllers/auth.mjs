import express from 'express';
import mongoose from 'mongoose';
import userModel from '../models/auth.mjs'
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET || "topsecret";

export const createUser = async (req, res) => {
    const body = req.body;
    if (
        !body.userName ||
        !body.email ||
        !body.number ||
        !body.password
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }
    stringToHash(body.password).then(hashString => {

        userModel.create({
            userName: body.userName,
            email: body.email.toLowerCase(),
            number: body.number,
            role: body.role,
            password: hashString
        },
            (err, result) => {
                if (!err) {
                    console.log(result);

                    res.status(201).send({
                        status: "success",
                        message: "User is created successfully"
                    });
                } else {
                    res.status(500).send({
                        message: "server error"
                    })
                }
            })
    });
}

// get all user data in mangodb 
export const getAllUser = async (req, res) => {
    userModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "get all user successfully",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });

};

// get all user email exist in mangodb 
export const emailExist = async (req, res) => {
    const email = req.params.email;
    userModel.findOne({
        email: email
    }, (err, user) => {
        if (user) {
            res.send({
                exists: true
            });
        } else {
            res.send({
                exists: false
            });
        }
    });
};


// // login user api 
export const loginUser = async  (req, res) => { 
    let body = req.body;
    body.email = body.email.toLowerCase();

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user exist
    userModel.findOne(
        { email: body.email },
        "userName role email password",
        (err, data) => {
            if (!err) {
                console.log("data: ", data);

                if (data) { // user found
                    varifyHash(body.password, data.password).then(isMatched => {

                        // console.log("isMatched: ", isMatched);

                        if (isMatched) {

                            const token = jwt.sign({
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                            }, SECRET);

                            console.log("token: ", token);

                            res.cookie('Token', token, {
                                maxAge: 86_400_000,
                                httpOnly: true,
                                // sameSite: true,
                                // secure: true
                            });

                            res.send({
                                message: "login successful",
                                profile: {
                                    email: data.email,
                                    userName: data.userName,
                                    token: token,
                                    role: data.role,
                                    _id: data._id
                                }
                            });
                            return;
                        } else {
                            console.log("password did not match");
                            res.status(401).send({ message: "Password did not match" });
                            return;
                        }
                    })

                } else { // user not already exist
                    console.log("user not found");
                    res.status(401).send({ message: "This email not exist" });
                    return;
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })
}