require("dotenv").config();
import express from "express";
import congifViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";


let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
congifViewEngine(app);

initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, ()=> {
    console.log('TESDA Lyceum of Alabang is running at the port ' + port);
});