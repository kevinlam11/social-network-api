const { Thought, User } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .lean()
      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createThought(req, res) {
    Thought.create(req.body)

      .then((thought) => {
        res.json(thought);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: "No such thought exists" });
        }
        return User.deleteMany({ _id: { $in: thought.users } });
      })
      .then(() => {
        res.json({ message: "Thought deleted :)" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;
