const express = require('express')
const app = express()

app.all('*', async (req, res) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));



    if (req.method === 'OPTIONS') {
        res.send();
    } else {
        const targetURL = process.env.TARGET_URL
        res.send(await (await fetch(targetURL + req.url, {
            method: req.method,
            json: req.body,
            headers: { 'Authorization': req.header('Authorization') }
        })).text());
    }
})
app.listen(process.env.PORT || 3000)