const dataSource = require("../utils");
const skills = require("../entity/skills");
const wilders = require("../entity/wilders");

module.exports = {
    wilderSkill: async (req, res) => {
        try {
            const getWilderToBeUpdated = await dataSource
                .getRepository(wilders)
                .findOneBy({ id: req.params.id });

            const skillToBeAdded = await dataSource
                .getRepository(skills)
                .findOneBy({ name: req.body.name });
                getWilderToBeUpdated.skills = [ ...getWilderToBeUpdated.skills, skillToBeAdded];

            await dataSource
                .getRepository(wilders)
                .save(getWilderToBeUpdated);
            res.status(200).json({ getWilderToBeUpdated });    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },
}
