const typeorm = require("typeorm");

const dataSource = new typeorm.DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [
        require("./entity/wilders"), 
        require("./entity/skills"),
        require("./entity/Upvote"),
    ],
    logging: ["query", "error"]
});

module.exports = dataSource;