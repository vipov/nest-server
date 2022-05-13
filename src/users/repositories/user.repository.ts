import { AbstractRepository, EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";

// TODO fix dla nowej składni: https://github.com/typeorm/typeorm/blob/master/docs/custom-repository.md

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {

}
