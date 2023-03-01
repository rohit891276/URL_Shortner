const UrlModel = require('../models/urlModel.js');
const ShortId = require('shortid');

const { isValid, checkUrl } = require('../validations/validator.js');


//=============================================[API:TO SHOW THE DATA IN FRONT-END] =============================================

const getData = async (req, res) => {
    const findUrls = await UrlModel.find();
    res.render("index.ejs", { shortUrl: findUrls });
}

//=============================================[API:FOR CREATING URL DB] =============================================

const createUrl = async (req, res) => {
    try {
        const data = req.body;
        const { longUrl } = data;
        const baseUrl = "http://localhost:8080/";
        if (Object.keys(data).length !== 0) {

            //Long Url validation
            if (!isValid(longUrl)) {
                return res.status(400).json({ status: false, message: "Please enter longUrl and it must be a typeof string only" });
            }
            if (!checkUrl(longUrl)) {
                return res.status(400).json({ status: false, message: "This Url is not Valid" });
            }


            // Checking for duplication of URL
            const checkShortUrl = await UrlModel.findOne({ longUrl: longUrl });
            if (checkShortUrl) {
                return res.status(400).json({ status: true, message: `This URL: ${longUrl} has already been shorten`, ShortUrl: checkShortUrl.shortUrl })
            }

            const urlCode = ShortId.generate();
            const urlShort = baseUrl + urlCode;
            data.shortUrl = urlShort;
            data.urlId = urlCode;

            // Saving the details in DB
            const urlCreated = await UrlModel.create(data);
            let finalResponse = {
                longUrl: urlCreated.longUrl,
                shortUrl: urlCreated.shortUrl,
                urlId: urlCreated.urlId
            };

            res.redirect('/')
            // res.status(201).json({ status: true, data: finalResponse }); // this is fro Postman

        } else {
            return res.status(400).json({ status: false, message: "Request body cannot remain empty" });
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

//=============================================[API:FOR GETTING LIST OF SHORT URLS AND TO REDIRECT]=============================================


const getUrl = async (req, res) => {
    try {
        const urlCode = req.params.urlKey;

        //  Searching the URLs in DB
        const findUrl = await UrlModel.findOne({ urlId: urlCode });
        if (!findUrl) {
            return res.status(404).json({ status: false, message: "No such url present" });
        }
        console.log("checking ", findUrl.longUrl);
        res.redirect(302, findUrl.longUrl);

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}


module.exports = { getData, createUrl, getUrl };