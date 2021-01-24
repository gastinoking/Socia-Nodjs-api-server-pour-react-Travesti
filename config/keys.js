module.exports = {
  mogooseUrl:
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/damsocial",
  secretOrKey: "secret",
};
