const express = require("express");

const wilderController = require("./controllers/wilder");

const skillsController = require("./controllers/skills");

const wilderSkillController = require("./controllers/wilderSkills");

const dataSource = require("./utils");
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hello WCS !")
});

/// ///  WILDERS ROUTES /// ///
app.get("/api/wilders", wilderController.findAll)
app.get("/api/wilders/:id", wilderController.find)
app.post("/api/wilders/create", wilderController.create);
app.put("/api/wilders/update/:id", wilderController.update);
app.delete("/api/wilders/delete", wilderController.delete);
app.delete("/api/wilders/deleteone/:id", wilderController.deleteone);

/// /// SKILLS ROUTES /// /// 
app.get("/api/skills", skillsController.findAll)
app.get("/api/skills/:id", skillsController.find)
app.post("/api/skills/create", skillsController.create);
app.put("/api/skills/update/:id", skillsController.update);
app.delete("/api/skills/delete", skillsController.delete);
app.delete("/api/skills/deleteone/:id", skillsController.deleteone);

/// /// ADD SKILLS /// ///
app.post("/api/wilderskills/:id", wilderSkillController.wilderSkill)


const start = async() => {
    await dataSource.initialize();
    app.listen(port, () => {
        console.log("server started on port :", port)
    });
};
start();
