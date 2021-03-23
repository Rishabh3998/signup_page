const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/" , function(req , res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/" , function(req , res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const emailAddress = req.body.email;

    const data = {
        members: [
            {
                email_address: emailAddress,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/0698e869df";
    const options = {
        method: "POST",
        auth: "rishabh1:42b00805221a8f8e060833483d546e31-us1"
    }

    const request = https.request(url , options , function(Response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data" , function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure" , function(req , res) {
    res.redirect("/");
})

app.listen(3000 , function() {
    console.log("Server is running on port 3000");
})



//API key MailChimp
//42b00805221a8f8e060833483d546e31-us1
//uniqueID
//0698e869df