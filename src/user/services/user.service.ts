import { Injectable } from '@nestjs/common';
import { UserRegisterRequestDto } from '../dto';
import { UserEntity, UserRole } from '../entities';
import { UserRoleEntity } from '../entities/user-role.entity';

@Injectable()
export class UserService {
  
  async findByCredentials(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    return UserEntity.findOne({ email, password });
  }

  async create(data: UserRegisterRequestDto): Promise<UserEntity> {
    let role: UserRoleEntity = await UserRoleEntity.findOne({
      name: UserRole.ADMIN,
    });
    if (!role) {
      role = UserRoleEntity.create({ name: UserRole.ADMIN });
      await UserRoleEntity.save(role);
    }

    const userEntity: UserEntity = UserEntity.create();

    userEntity.name = data.name;
    userEntity.email = data.email;
    userEntity.password = data.password;
    userEntity.roles = [role];

    await UserEntity.save(userEntity);

    return userEntity;
  }

  async getById(id: number): Promise<UserEntity> {
    return UserEntity.findOne(id);
  }
}
