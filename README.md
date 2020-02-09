# SG360
This repository contains solution to two challenges namely,
* Deep clone an object.
* Contact partners for meal.
* Takes an object and creates a copy of it
* Contact partners with offices within 100km of central London (coordinates 51.515419, -0.141099) to invite them out for a meal

---
**Problem Statement 1:** 
Write a function called deepClone which takes an object and creates a copy of it. e.g. {name: "Paddy", address: {town: "Lerum", country: "Sweden"}} -> {name: "Paddy", address: {town: "Lerum", country: "Sweden"}}

---

**Problem Statement 2:**
We'd like to contact partners with offices within 100km of central London (coordinates 51.515419, -0.141099) to invite them out for a meal.
Write a NodeJS/JavaScript program that reads our list of partners and outputs the company names and addresses of matching partners (with offices within 100km) sorted by company name (ascending).

---

### Project Setup Guide

This project is developed in Node.js using typescript. For testing, Jest testing framework is used.

* Install this project.
* cd into the project folder.
* run `npm install` to download dependencies.
* run `npm start` to lint the code and transpile typescript files to javascript files.
* run `npm test` to run the test cases.
* run `npm run test:coverage` to run code coverage.
