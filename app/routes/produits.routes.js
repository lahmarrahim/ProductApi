module.exports = app => {
  const produitsController = require("../controllers/ProduitController.js");


  var router = require("express").Router();


  // Create a new Product
  router.post("/create", produitsController.create);

  // Retrieve all Products
  router.get("/findAll", produitsController.findAll);

  // Retrieve all Products by User
  router.post("/MesProduits", produitsController.findAllByUser);

  // Retrieve all Products by User to Modify
  router.post("/MesProduitsNonApprouves", produitsController.findAllByUserForModify);

  // Retrieve all Products where Org Null
  router.get("/ProduitsNonApprouves", produitsController.findAllOrgNull);

  // Retrieve all Products where Org non Null
  router.get("/Catalogue", produitsController.findAllOrg);

  // Retrieve all published Products
  router.get("/published", produitsController.findAllPublished);

  // Retrieve a single Product with id
  router.get("/find/:id", produitsController.findOne);

  // Update a Product with id by user
  router.put("/update/:id", produitsController.update);

  // Update a Product with id by expert
  router.put("/updateByExpert/:id", produitsController.updateByExpert);

   // Retrieve all Products by Expert
   router.post("/ProduitsApprouvesParMoi", produitsController.findAllByExpert);

  // Delete a Product with id
  router.delete("/delete/:id", produitsController.delete);

  // Create a new Product
  router.delete("/", produitsController.deleteAll);






  app.use("/api/produits", router);
};