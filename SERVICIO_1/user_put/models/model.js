const Joi = require("joi");

module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      user: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      pwd: { type: String, required: true },
      type: { type: String, required: true },
      address: { type: Array, required: true },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Usuario = mongoose.model("user", schema);
  return Usuario;
};

module.exports.ValidationSchema = Joi.object().keys({
  user: Joi.string().max(50).min(1).trim().required(),
  name: Joi.string().max(50).min(1).trim().required(),
  email: Joi.string().max(50).min(1).trim().required(),
  pwd: Joi.string().max(50).min(1).trim().required(),
  type: Joi.string().max(50).min(1).trim().required(),
  address: Joi.array().required(),
});