import { SetMetadata } from '@nestjs/common';
import { Roles } from '../entities';

export const SetRoles = (...args: Roles[]) => SetMetadata('roles', args);
