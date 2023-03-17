import { AccessControl } from "accesscontrol";

const ac = new AccessControl();
export const roles = (function () {
  ac.grant("member").readOwn("account").updateOwn("account");

  ac.grant("admin")
    .readAny("account")
    .createAny("account")
    .updateAny("account");

  return ac;
})();
