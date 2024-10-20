const HomeController = (req, res) => {
  return res.render("main", {
    data: {
      title: "Trang chủ",
    },
  });
};
export { HomeController };
