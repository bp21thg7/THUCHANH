const globalVariable = (req, res, next) => {
  res.locals.fullname = null;
  res.locals.isLogin = null;
  res.locals.username = null;
  res.locals.role = null;
  if (!res.locals.messageError) {
    res.locals.messageError = null;
  }
  if (req.session.isLogin) {
    res.locals.isLogin = req.session.isLogin;
    res.locals.fullname = req.session.fullname;
    res.locals.username = req.session.username;
    res.locals.role = req.session.role;
  }
  next();
};
const isMineAuthAdmin = (req, res, next) => {
  if (req.session.isLogin) {
    if (req.session.role == 0) {
      return next();
    }
    if (req.session.username == req.params.username) {
      return next();
    }
  }
  res.redirect("/viewalluser");
};
export default { globalVariable, isMineAuthAdmin };
