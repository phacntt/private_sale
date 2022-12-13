import { join } from "path";
import { DataSourceOptions } from "typeorm";
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, NODE_ENV } from "../config";
import { UserModel } from "../entities/user.model";

// export const typeOrmConfig: DataSourceOptions = {
//     type: "postgres",
//     host: process.env.DB_HOST,
//     port: 5432,
//     username: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     entities: [UserModel],
//     synchronize: process.env.NODE_ENV === "development" ? true : false,
// }

export const typeOrmConfig: DataSourceOptions = {
    type: "postgres",
    host: DB_HOST,
    port: 5459,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    // entities: [UserModel, CampaignModel, AdModel, AdCreativeModel, AdTargetingModel, NotificationModel],
    entities: [join(__dirname, '../entities/index.model{.ts,.js}')],
    synchronize: NODE_ENV === "development" ? true : false,
}