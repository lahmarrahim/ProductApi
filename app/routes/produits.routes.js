module.exports = app => {
  const produitsController = require("../controllers/ProduitController.js");


  var router = require("express").Router();


  // Create a new Product
  router.post("/create", produitsController.create);

  // Retrieve all Products
  router.get("/findAll", produitsController.findAll);

  // Retrieve all Products by User
  router.post("/findAllByUser", produitsController.findAllByUser);

  // Retrieve all Products where Org Null
  router.get("/findAllOrgNull", produitsController.findAllOrgNull);

  // Retrieve all Products where Org non Null
  router.get("/findAllOrg", produitsController.findAllOrg);

  // Retrieve all published Products
  router.get("/published", produitsController.findAllPublished);

  // Retrieve a single Product with id
  router.get("/find/:id", produitsController.findOne);

  // Update a Product with id by user
  router.put("/update/:id", produitsController.update);

  // Update a Product with id by expert
  router.put("/updateByExpert/:id", produitsController.updateByExpert);

  // Delete a Product with id
  router.delete("/delete/:id", produitsController.delete);

  // Create a new Product
  router.delete("/", produitsController.deleteAll);






  app.use("/api/produits", router);
};