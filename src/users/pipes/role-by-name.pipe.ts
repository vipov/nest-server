import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role, RoleNames } from '../entities/user.entity';

@Injectable()
export class RoleByNamePipe implements PipeTransform {

  
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async transform(name: RoleNames, metadata: ArgumentMetadata): Promise<Role> {
    
    const role = await this.roleRepository.findOneBy({ name });

    if(!role) {
      throw new NotFoundException(`Rola ${name} nie znaleziona`)
    }

    return role;
  }
}
