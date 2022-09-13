const dataSource = require("../utils");
const skills = require("../entity/skills");

module.exports = {
    create: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(skills)
                .save(req.body);
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    findAll: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(skills)
                .find();
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    find: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(skills)
                .findOneBy({ id: req.params.id });
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    update: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(skills)
                .createQueryBuilder()
                .update(skills)
                .set({ name: "updated skills"})
                .where("id = :id", { id: req.params.id })
                .execute();
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    delete: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(skills)
                .createQueryBuilder()
                .delete('*')
                .from(skills)
                .execute()
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    deleteone: async (req, res) => {
        try {
            const data = dataSource
                .getRepository(skills)
                .createQueryBuilder()
                .delete(skills)
                .where("id = :id", { id: req.params.id })
                .execute();
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },
}
