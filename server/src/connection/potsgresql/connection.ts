import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

export class Connection {
  private sequelize: Sequelize;
  private host = process.env.DB_HOST || 'localhost';
  private port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
  database = process.env.DB_NAME || 'almacen';
  username = process.env.DB_USER || 'fl0';
  private password = process.env.DB_PASSWORD || undefined;

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
