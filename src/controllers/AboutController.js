const AboutController = (req, res) => {
  return res.render("main", {
    data: {
      title: "About",
      page: "about",
    },
  });
};
export default AboutController;
