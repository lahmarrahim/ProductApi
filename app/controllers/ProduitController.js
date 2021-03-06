const db = require("../models");
const Tutorial = db.tutorials;


// Create and Save a new Product
exports.add = (req, res) => {
  // Validate request
  if ((!req.body.nom) || (!req.body.description) || (!req.body.prix) || (!req.body.quantite) || (!req.files.images) || (!req.body.userId) || (!req.body.userTel) ) {
    res.status(400).send({ message: "Remplir tous les champs svp!" });
    return;
  }
const imagesList=[]
for (let i=0; i<req.files.images.length; i++){
 const imageUrl="/upload/products/"+ Date.now().toString().trim() +"." + req.files.images[i].mimetype.split('/')[1] 
 req.files.images[i].mv(
   "."+imageUrl
 )
 imagesList.push("http://localhost:8090"+imageUrl)

}
  // Create a Product
  const tutorial = new Tutorial({
    nom: req.body.nom,
    description: req.body.description,
    prix: req.body.prix,
    quantite: req.body.quantite,
    images : imagesList,
    userId : req.body.userId,
    userTel : req.body.userTel
  });

  // Save Product in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du produit."
      });
    });
};

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if ((!req.body.nom) || (!req.body.description) || (!req.body.prix) || (!req.body.quantite) || (!req.body.image) || (!req.body.userId) || (!req.body.userTel) ) {
    res.status(400).send({ message: "Remplir tous les champs svp!" });
    return;
  }

  // Create a Product
  const tutorial = new Tutorial({
    nom: req.body.nom,
    description: req.body.description,
    prix: req.body.prix,
    quantite: req.body.quantite,
    image : req.body.image,
    userId : req.body.userId,
    userTel : req.body.userTel
  });

  // Save Product in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la création du produit."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const nom = req.query.nom;
  var condition = nom ? { nom: { $regex: new RegExp(nom), $options: "i" } } : {};

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération du produit."
      });
    });
};

// Retrieve all Products from the database by UserId.
exports.findAllByUser = (req, res) => {
  // const nom = req.query.nom;
  const userId = req.body.userId;

  var condition = { userId: { $eq: userId } }

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération du produit."
      });
    });
};

// Retrieve all Products from the database by UserId for Modify.
exports.findAllByUserForModify = (req, res) => {
  // const nom = req.query.nom;
  const userId = req.body.userId;

  var condition = { userId: { $eq: userId } , originalite:{$exists:false} }

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération du produit."
      });
    });
};

// Retrieve all Products from the database where Originalite null.
exports.findAllOrgNull = (req, res) => {
  const nom = req.query.nom;

  var condition = {originalite:{$exists:false}}

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération du produit."
      });
    });
};

// Retrieve all Products from the database where Originalite non null.
exports.findAllOrg = (req, res) => {
  const nom = req.query.nom;

  var condition = {originalite:{$exists:true}}

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération du produit."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Produit non trouvé avec identifiant " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Erreur lors de la récupération du produit avec l'identifiant=" + id });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  console.log("req")
  if ( (!req.body.nom) || (!req.body.description) || (!req.body.prix) || (!req.body.quantite) ) {
    return res.status(400).send({
      message: "Les données à mettre à jour ne peuvent pas être vides!"
    });
  }
  

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour le produit avec l'identifiant=${id}. Peut-être que Produit n'a pas été trouvé!`
        });
      } else res.send({ message: "Le produit a été mis à jour avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour du produit avec l'ID=" + id
      });
    });
};

// Update a Product by the id in the request by Expert
exports.updateByExpert = (req, res) => {
  if ((!req.body.originalite) || (!req.body.expertId)) {
    return res.status(400).send({
      message: "Les données à mettre à jour ne peuvent pas être vides!"
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de mettre à jour le produit avec l'identifiant=${id}. Peut-être que Produit n'a pas été trouvé!`
        });
      } else res.send({ message: "Le produit a été mis à jour avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur lors de la mise à jour du produit avec l'ID=" + id
      });
    });
};

// Retrieve all Products from the database by ExpertId.
exports.findAllByExpert = (req, res) => {
  // const nom = req.query.nom;
  const expertId = req.body.expertId;

  var condition = { expertId: { $eq: expertId } }

  Tutorial.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération du produit."
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le produit avec l'identifiant=${id}. Peut-être que le produit n'a pas été trouvé!`
        });
      } else {
        res.send({
          message: "Le produit a été supprimé avec succès!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Impossible de supprimer le produit avec l'identifiant=" + id
      });
    });
};

// Delete all Products from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Le produit a été supprimé avec succès!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la suppression de tous les produits."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des produits."
      });
    });
};
