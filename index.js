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

let result;
app.post("/", async(req, res) => {
    const semester = req.body.semester
    result = await db.query("SELECT * FROM subject WHERE semester_name LIKE $1",[semester.concat('%')]);
    res.render("index.ejs", {
        semester: [{name: result.rows[0].semester_name}],
        subject: result.rows,
        k:1
    })
})

let subject;
app.post("/course", async(req, res) => {
    subject = req.body.subject
    // console.log(subject)
    const slot = await db.query("SELECT * FROM faculty WHERE subject_name LIKE $1",[subject.concat('%')]);
    // console.log(slot.rows);
    res.render("index.ejs", {
        semester: [{name: result.rows[0].semester_name}],
        subject: [{subject_name: subject}],
        k:1,
        c:1,
        slot: slot.rows
    })
})

app.post("/slot", async(req, res) => {
    // console.log(req.body)
    // selectedSlot = req.body.slot
    const slot = await db.query("SELECT * FROM faculty WHERE subject_name LIKE $1 AND slot = $2",[subject.concat('%'),req.body.slot]);
    res.render("index.ejs", {
        semester: [{name: result.rows[0].semester_name}],
        subject: [{subject_name: subject}],
        k:1,
        c:1,
        x:1,
        slot: slot.rows
    })
})

app.post("/faculty", async(req, res) => {
    // console.log(req.body.faculty)
    const slot = await db.query("SELECT * FROM faculty WHERE subject_name LIKE $1 AND faculty LIKE $2",[subject.concat('%'),req.body.faculty.concat('%')]);
    res.render("index.ejs", {
        semester: [{name: result.rows[0].semester_name}],
        subject: [{subject_name: subject}],
        k:1,
        c:1,
        x:1,
        y:1,
        slot: slot.rows
    })
})

app.post("/download", async(req, res) => {
    console.log(req.body.faculty)
    const result = await db.query("SELECT * FROM download WHERE faculty_name LIKE $1",[req.body.faculty.concat('%')]);
    console.log(result.rows)
    res.render("content.ejs",{
        result: result.rows
    })
})

app.listen(port, () => {
    console.log(`Successfully started server on port ${port}.`);
});

