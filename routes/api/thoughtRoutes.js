const router = require("express").Router();
const thoughtController = require("../../controllers/thoughtController");

router
  .route("/:_id")
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);
router.route("/:userId").delete(thoughtController.deleteThought);

module.exports = router;
