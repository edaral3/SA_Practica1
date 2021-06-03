module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      tipo: { type: String, required: true },
      id_usuario: { type: String, required: true },
      nombre_usuario: { type: String, required: true },
      nivel: { type: String, required: true },
      origen: { type: String, required: true },
      informacion: { type: Object, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Log = mongoose.model("log", schema);
  return Log;
};