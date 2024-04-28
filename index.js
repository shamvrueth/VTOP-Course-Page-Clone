import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
import pg from "pg";

env.config();
const app = express();
const port = 3000;

app.use(express.static("public"));

const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  });
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const chosenSem = await db.query("SELECT * FROM semester;");
let k=0;
app.get("/", async(req, res) => {
    res.render("index.ejs",{
        semester:chosenSem.rows
    })
})

app.post("/", async(req, res) => {
    const semester = req.body.semester
    const result = await db.query("SELECT * FROM subject WHERE semester_name LIKE $1",[semester.concat('%')]);
    //console.log(result.rows)
    res.render("index.ejs", {
        semester: [{name: result.rows[0].semester_name}],
        subject: result.rows,
        k:1
    })
})

app.post("/slot", async(req, res) => {

})

app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});