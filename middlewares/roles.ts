import { AccessControl } from "accesscontrol";
import dotenv from "dotenv";
dotenv.config();

const userRoleNumber = process.env.USER_ROLE_NUMBER;
const adminRoleNumber = process.env.ADMIN_ROLE_NUMBER;
const employeeRoleNumber = process.env.EMPLOYEE_ROLE_NUMBER;

const ac = new AccessControl();
export const roless = (function () {
  ac.grant("member").readOwn("account").updateOwn("account");
  ac.grant("supervisor").extend("member").readAny("account");
  ac.grant("admin")
    .extend("supervisor")
    .extend("member")
    .readAny("account")
    .createAny("account")
    .updateAny("account");

  return ac;
})();

interface IRoles {
  user?: number;
  admin?: number;
  employee?: number;
}

export const roles: IRoles = {
  user: 2312,
  admin: 4672,
  employee: 4562,
};
