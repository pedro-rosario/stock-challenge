import { expressjwt } from 'express-jwt';
import jwtPermissions from 'express-jwt-permissions';
import { JWT_SECRET, USER_ROLES } from '../constants';

export const parseJWT = expressjwt({
  secret: JWT_SECRET,
  algorithms: ['HS256'],
});

const jwtPermissionsBuilder = jwtPermissions({ requestProperty: 'auth' });
export const checkAdminAcess = jwtPermissionsBuilder.check([USER_ROLES.ADMIN]);
export const checkUserAccess = jwtPermissionsBuilder.check([
  [USER_ROLES.ADMIN],
  [USER_ROLES.USER],
]);
