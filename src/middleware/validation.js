export default (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    console.log("error", error);

    if (error) {
      return res.status(400).json({
        message: "You have provided a bad data",
        error: error,
      });
    }

    next();
  };
};
