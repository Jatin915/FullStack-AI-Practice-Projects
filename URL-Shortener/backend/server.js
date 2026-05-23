const express = require("express");
const { nanoid } = require("nanoid");

const app = express();

app.use(express.json());

const urlDatabase = {};

// Home Route
app.get("/", (req, res) => {
    res.send("URL Shortener Backend Running");
});

// Create Short URL
app.post("/shorten", (req, res) => {

    const { originalUrl } = req.body;

    // Validation
    if (!originalUrl) {
        return res.status(400).json({
            message: "Original URL is required"
        });
    }

    // Generate Short Code
    const shortCode = nanoid(6);

    // Store in Memory
    urlDatabase[shortCode] = originalUrl;

    // Send Response
    res.json({
        shortUrl: `http://localhost:5000/${shortCode}`,
        originalUrl
    });

});

// Redirect Route
app.get("/:shortCode", (req, res) => {

    const { shortCode } = req.params;

    const originalUrl = urlDatabase[shortCode];

    // If URL not found
    if (!originalUrl) {
        return res.status(404).json({
            message: "Short URL not found"
        });
    }

    // Redirect User
    res.redirect(originalUrl);

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});