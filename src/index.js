const express = require("express");
const typeorm = require("typeorm");
const wilders = require("./entity/wilders");
const app = express();
const port = 3000;

const dataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [require("./entity/wilders")],
})

app.get('/', (req, res) => {
    res.send("hello WCS !")
});

const start = async() => {
    await dataSource.initialize();
    dataSource.getRepository(wilders).save({name: "First Wilder"});
    app.listen(port, () => {
        console.log("server started on port :", port)
    });
};
start();
