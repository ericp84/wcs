const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name:"Wilder",
    columns: {
        id:{
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "text",
        },
        city: {
            type: "text"
        }
    },
    relations: {
        upvotes: {
          type: "one-to-many",
          onDelete: "CASCADE",
        //   createForeignKeyConstraints: false,
          inverseSide: "wilder",
          target: "Upvote",
        },
      },
});