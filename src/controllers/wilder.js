const dataSource = require("../utils");
const wilders = require("../entity/wilders");

module.exports = {
    create: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(wilders)
                .save(req.body);
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    findAll: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(wilders)
                .find({ relations: ["upvotes", "upvotes.skill"] });
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    find: async (req, res) => {
        const wilderId = req.params.wilderId;
        try {
            const data = await dataSource
                .getRepository(wilders)
                .findOneBy({ id: wilderId });
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    update: async (req, res) => {
        const wilderId = req.params.wilderId;
        try {
            const data = await dataSource
                .getRepository(wilders)
                .createQueryBuilder()
                .update(wilders)
                .set({ name: req.body.name, city: req.body.city})
                .where("id = :id", { id: wilderId })
                .execute();
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    delete: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(wilders)
                .createQueryBuilder()
                .delete('*')
                .from(wilders)
                .execute()
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },
    // deleteone: async (req, res) => {
    //     const wilderId = req.params.wilderId;
    //     const repository = dataSource.getRepository("Wilder");
        
    //     repository.query("DELETE FROM wilder WHERE id=?", [wilderId]).then(
    //         () => {
    //           res.json({ success: true });
    //         },
    //         (err) => {
    //           console.error("Error when removing: ", err);
    //           res.json({ success: false });
    //         }
    //       );
    // },

    deleteone: async (req, res) => {
        const wilderId = req.params.wilderId;
        try {
            const data = dataSource
                .getRepository(wilders)
                .createQueryBuilder()
                .delete(wilders)
                .where("id = :id", { id: wilderId })
                .execute();
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    addSkill: (req, res) => {
        const wilderId = req.params.wilderId;
        const skillId = req.body.skillId;
        const manager = dataSource.manager;
    
        manager
          .query(
            "INSERT INTO wilder_skills_skill(wilderId, skillId) VALUES (?, ?)",
            [wilderId, skillId]
          )
          .then(
            (id) => {
              manager
                .query(
                  `
                  SELECT wilder.id AS wilderId, wilder.name AS wilderName, skill.id AS skillId, skill.name AS skillName 
                  FROM wilder 
                  LEFT JOIN wilder_skills_skill AS wss ON wss.wilderId = wilder.id
                  LEFT JOIN skill ON skill.id = wss.skillId
                  WHERE wilder.id=?
                `,
                  [wilderId]
                )
                .then((rows) => {
                  // because of the left join, we got as many rows as the wilder has skills
                  // we need to flatten them
                  const wilder = {
                    id: rows[0].wilderId,
                    name: rows[0].wilderName,
                    skills: rows // 1st remove all rows not related to skills, then map them to recreate skill entities
                      .filter(
                        (row) => row.skillId !== null && row.skillId !== undefined
                      )
                      .map((row) => ({ id: row.skillId, name: row.skillName })),
                  };
                  res.json(wilder);
                });
            },
            (err) => {
              console.error("Error: ", err);
              res.json({ success: false });
            }
          );
    
        /* 
        datasource
          .getRepository("Wilder")
          .findOneByOrFail({ id: wilderId })
          .then((wilderToUpdate) => {
            datasource
              .getRepository("Skill")
              .findOneByOrFail({ id: skillId })
              .then((skillToInsert) => {
                wilderToUpdate.skills.push(skillToInsert);
                datasource
                  .getRepository("Wilder")
                  .save(wilderToUpdate)
                  .then(
                    (updatedWilder) => {
                      res.json(updatedWilder);
                    },
                    (err) => {
                      console.error("Error when saving: ", err);
                      res.json({ success: false });
                    }
                  );
              });
          }); */
      },
      addSkills: async (req, res) => {
        const wilderId = req.params.wilderId;
        const skillsIds = req.body.skillsIds;
        const repository = dataSource.getRepository("Wilder");
    
        const wilder = await repository.findOneByOrFail({ id: wilderId });
        const skills = await dataSource
          .getRepository("Skill")
          .find({ where: { id: In(skillsIds) } });
    
        wilder.skills = skills;
    
        const updatedWilder = await repository.save(wilder);
        res.json(updatedWilder);
      },
    
}
