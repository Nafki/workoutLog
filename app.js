const Express = require("express");
const app = Express();
const dbConnection = require("./db");



require("dotenv").config();
app.use(Express.json());

const controllers = require("./controllers");

app.use("/user", controllers.userController);

app.use(require("./middleware/validate-jwt"));
app.use("/log", controllers.logController);

//app.get("/", (req,res) => {
   // res.send("worklog")    //all above and below makes server
//})

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(5000, () => {
    console.log(`[Server]: App is listening on 5000.`);
    });
})
.catch((err) => {
console.log(`[Server]: Server crashed. Error = ${err}`);
});

