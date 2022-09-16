const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name:"Skill",
    columns: {
        id:{
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "text",
            unique: true,
        },
    },
    relations: {
        upvotes: {
          type: "one-to-many",
          createForeignKeyConstraints: false,
          inverseSide: "skill",
          target: "Upvote",
        },
      },
});