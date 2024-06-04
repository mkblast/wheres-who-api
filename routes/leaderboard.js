const Router = require("express").Router();
const { body, validationResult } = require("express-validator");
const Record = require("../modules/record")

Router.post("/leaderboard/:levelId",
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty.")
    .isAlphanumeric()
    .withMessage("Name must be Alphanumeric."),

  body("record")
    .isInt({ min: 1 })
    .withMessage("record can not be 0."),

  async (req, res, next) => {
    try {
      if (+req.params.levelId > 1) {
        return res.status(404).json({ errors: [{ msg: "Level Not Found." }] });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, record } = req.body;

      const newRecord = new Record({
        name,
        level: +req.params.levelId,
        record,
      });

      await newRecord.save();

      return res.status(200).json({ msg: "Record submited successfully." }, newRecord);
    } catch (err) {
      next(err);
    }
  }
);

Router.get("/leaderboard", async (req, res, next) => {
  try {
    const records = await Record.find().exec();
    return res.status(200).json(records);
  } catch (err) {
    next(err)
  }
})


Router.get("/leaderboard/:levelId", async (req, res, next) => {
  try {
    if (+req.params.levelId > 1) {
      return res.status(404).json({ errors: [{ msg: "Level Not Found." }] });
    }

    const records = await Record.find({ level: +req.params.levelId }).exec();

    return res.status(200).json(records);
  } catch (err) {
    next(err)
  }
})
