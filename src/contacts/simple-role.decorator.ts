import { SetMetadata } from '@nestjs/common';
import { SimpleRoleNames } from './contact.dto';

export const SIMPLE_ROLE_KEY = 'simple-role';

export const SimpleRole = (...args: SimpleRoleNames[]) =>
  SetMetadata(SIMPLE_ROLE_KEY, args);
