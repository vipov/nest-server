import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../models';

export const Roles = (...args: UserRole[]) => SetMetadata('roles', args);
