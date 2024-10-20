const ContactController = (req, res) => {
  return res.render("main", {
    data: {
      title: "Contact",
      page: "contact",
    },
  });
};
export default ContactController;
