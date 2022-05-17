module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nom: String,
      description: String,
      prix: String,
      quantite: Number,
      image: String, //images: [],
      originalite: String,
      userId: String,
      userTel: String,
      expertId: String
    },
   { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("produit", schema);
  return Tutorial;
};
