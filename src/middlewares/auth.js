const globalVariable = (req, res, next) => {
  res.locals.fullname = null;
  if (req.session.isLogin) {
    res.locals.fullname = req.session.fullname;
  }
  next();
};
const isAdmin = (req, res, next) => {
  if (req.session.role == 0) {
    next();
  }
  res.redirect("/");
};
const isBoth = (req, res, next) => {
  if (req.session.role == 0 || req.session.username == req.params.username) {
    next();
  }
  res.redirect("/");
};

export default { globalVariable, isAdmin, isBoth };
