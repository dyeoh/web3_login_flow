import { Sequelize, INTEGER, STRING } from "sequelize";
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: __dirname + "/db/sqlite.db",
});
import { User } from "./models/User.model";

const tryInit = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
};

tryInit();

// Init all models
User.init(
  {
    nonce: {
      allowNull: false,
      type: INTEGER.UNSIGNED, // SQLITE will use INTEGER
      defaultValue: () => Math.floor(Math.random() * 10000), // Initialize with a random nonce
    },
    publicAddress: {
      allowNull: false,
      type: STRING,
      unique: true,
      validate: { isLowercase: true },
    },
    username: {
      type: STRING,
      unique: true,
    },
  },
  {
    modelName: "user",
    sequelize, // This bit is important
    timestamps: false,
  }
);

sequelize.sync();
