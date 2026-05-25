const express = require("express");
const { nanoid } = require("nanoid");
const validUrl = require("valid-url");
const db = require('./config/db');
const app = express();
const url = require('./models/Url');

app.use(express.json());
db();
// const urlDatabase = {};

// Home Route
app.get("/", (req, res) => {
    res.send("URL Shortener Backend Running");
});

// Create Short URL
app.post("/shorten", async(req, res) => {

    const { originalUrl, customCode } = req.body;

    // check url exists
    if (!originalUrl) {
        return res.status(400).json({
            message: "Original URL is required"
        });
    }

    // validate
    if(!validUrl.isUri(originalUrl)) {
        return res.status(400).json({
            message: "Invalid Url"
        })
    }

    let shortCode;
    // if custom code provided
    if(customCode) {
        // check duplicate
        const existingCode = await url.findOne(
            {shortCode: customCode}
        );

        if(existingCode) {
            return res.status(400).json({
                message: "Custom code already exists!"
            })
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
    res.json({
        shortUrl: `http://localhost:5000/${newUrl.shortCode}`,
        originalUrl
    });
});

// Redirect Route
app.get("/:shortCode", async(req, res) => {

    const { shortCode } = req.params;

    const savedUrl = await url.findOne({shortCode});

    // If URL not found
    if (!savedUrl) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }

    // Redirect User
    res.redirect(savedUrl.originalUrl);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});