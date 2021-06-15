module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      nivel: { type: String, required: true },
      origen: { type: String, required: true },
      descripcion: { type: String, required: true },
      entrada: { type: Object, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Error = mongoose.model("error", schema);
  return Error;
};