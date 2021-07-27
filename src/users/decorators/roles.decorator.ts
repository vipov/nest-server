import { SetMetadata } from '@nestjs/common';
import { Roles } from '../entities';

export const ROLES_KEY = 'roles';

export const SetRoles = (...args: Roles[]) => SetMetadata(ROLES_KEY, args);
