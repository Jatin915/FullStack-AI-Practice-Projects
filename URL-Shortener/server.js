const express = require("express");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const db = require('./config/db');
const app = express();
const url = require('./models/Url');
const path = require('path');

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
db();

// Home Route
app.get("/", (req, res) => {
    res.render("index", {shortUrl:"", error:""});
});

// Create Short URL
app.post("/shorten", async(req, res) => {
    try {
        const { originalUrl, customCode } = req.body;

        // check url exists
        if (!originalUrl) {
            return res.render("index", {shortUrl:"", error: "Original URL is required"});
        }

        // validate
        if(!validUrl.isUri(originalUrl)) {
            return res.render("index", {shortUrl:"", error: "Invalid url"});
        }

        let shortCode;
        // if custom code provided
        if(customCode) {
            // check duplicate
            const existingCode = await url.findOne(
                {shortCode: customCode}
            );

            if(existingCode) {
                return res.render("index", {shortUrl:"", error:"Custom code already exists!"});
            }

            shortCode = customCode;
        } else {
            shortCode = nanoid(6);
        }

        // create document
        const newUrl = await url.create({
            originalUrl,
            shortCode
        });

        // Send Response
        res.render("index", {shortUrl: `http://localhost:5000/${newUrl.shortCode}`, error:""});

    } catch(err) {
        res.render("index", {shortUrl:"", error:"Server error!"});
    }
});

// Redirect Route
app.get("/:shortCode", async(req, res) => {
    try {
        const { shortCode } = req.params;

        const savedUrl = await url.findOne({shortCode});

        // If URL not found
        if (!savedUrl) {
            return res.render("index", {shortUrl:"", error:"Short URL not found"});
        }

        // Redirect User
        res.redirect(savedUrl.originalUrl);
        
    } catch(err) {
        return res.render("index", {shortUrl:"", error:"Server error!"});
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});