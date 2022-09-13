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
                .find();
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    find: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(wilders)
                .findOneBy({ id: req.params.id });
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },

    update: async (req, res) => {
        try {
            const data = await dataSource
                .getRepository(wilders)
                .createQueryBuilder()
                .update(wilders)
                .set({ name: "updated wilder"})
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

    deleteone: async (req, res) => {
        try {
            const data = dataSource
                .getRepository(wilders)
                .createQueryBuilder()
                .delete(wilders)
                .where("id = :id", { id: req.params.id })
                .execute();
            res.status(200).json(data);    
        } catch(error) {
            res.status(404).json({ message: "sorry can't do that" })
        }
    },
}
