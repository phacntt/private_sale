import { AppDataSource } from "../utils/dataSource"
import { UserModel } from "../entities/user.model"

export const User = AppDataSource.getRepository(UserModel).extend({
    store(data: any) {
        return this.save(data)
    },
    findById(id: number) {
        return this.findOneBy({ id })
    },
    findByAddress(address: string) {
        return this.findOneBy({ address })
    }
})
