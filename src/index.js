const express = require("express");

const wilderController = require("./controllers/wilder");

const skillsController = require("./controllers/skills");

const wilderSkillController = require("./controllers/wilderSkills");

const upvotesController = require("./controllers/Upvotes");


const dataSource = require("./utils");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send("hello WCS !")
});

const asyncHandler = (controller) => {
    return async function (req, res) {
      try {
        await controller(req, res);
      } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ error: err.message || "Error occured" });
      }
    };
  };

/// ///  WILDERS ROUTES /// ///
app.get("/api/wilders", wilderController.findAll)
app.get("/api/wilders/:wilderId", wilderController.find)
app.post("/api/wilders/create", wilderController.create);
app.put("/api/wilders/update/:wilderId", wilderController.update);
app.delete("/api/wilders/delete", wilderController.delete);
app.delete("/api/wilders/deleteone/:wilderId", wilderController.deleteone);

/// /// SKILLS ROUTES /// /// 
app.get("/api/skills", skillsController.findAll)
app.get("/api/skills/:skillId", skillsController.find)
app.post("/api/skills/create", skillsController.create);
app.put("/api/skills/update/:skillId", skillsController.update);
app.delete("/api/skills/delete", skillsController.delete);
app.delete("/api/skills/deleteone/:skillId", skillsController.deleteone);

/// /// ADD SKILLS /// ///
app.post("/api/wilderskills/:id", wilderSkillController.wilderSkill)

/// /// UP VOTES /// ///
app.post("/api/upvotes", asyncHandler(upvotesController.create));
app.put(
  "/api/upvotes/:upvoteId/upvote",
  asyncHandler(upvotesController.upvote)
);

const start = async() => {
    await dataSource.initialize();
    app.listen(port, () => {
        console.log("server started on port :", port)
    });
};
start();
