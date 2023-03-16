const verifyRoles = (roles: any) => {
  (req: any, res: any, next: any) => {
    if (req.roles[0] === "admin") {
      return roles;
    }
    return;
  };
};
