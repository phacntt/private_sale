import { AppDataSource } from "./dataSource"

const initDatabase = async () => {
    try {
        await AppDataSource.initialize()
        console.log("🚀 Connected to POSTGRESQL - ADV inside docker 🚀")
    } catch (error) {
        console.log("🚀 POSTGRESQL failed 🚀", error)
        // process.exit(1)
    }
}

export default initDatabase
