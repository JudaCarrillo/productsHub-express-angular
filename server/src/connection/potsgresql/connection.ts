import { Sequelize } from "sequelize";

export class Connection {
  private sequelize: Sequelize;
  private host = "ep-crimson-band-53171710.us-east-2.aws.neon.fl0.io";
  private port = 5432;
  database = "almacen";
  username = "fl0user";
  private password = "cTZwGzD65bia";

  constructor() {
    this.sequelize = new Sequelize(
      this.database,
      this.username,
      this.password,
      {
        host: this.host,
        port: this.port,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: false,
          },
        },
      }
    );

    this.exportSequelize();
  }

  testConnection = async () => {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };

  exportSequelize() {
    return this.sequelize;
  }
}
