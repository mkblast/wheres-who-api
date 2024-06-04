const Router = require("express").Router();
const Level = require("../modules/level");
const { body, validationResult } = require("express-validator");

const SQUAR_SIZE = 150;

Router.get("/levels/:levelId/",
  body("character")
    .isInt({ min: 0, max: 2 })
    .withMessage("character must be a valid Number and not exceed 2."),

  body("x")
    .isNumeric()
    .withMessage("x must be a valid Number."),

  body("y")
    .isNumeric()
    .withMessage("y must be a valid Number."),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const level = await Level.findOne({ level_number: +req.params.levelId }).exec();
      if (!level) {
        return res.status(404).json({ errors: [{ result: "Failed.", msg: "Level not found." }] });
      }

      const { character, x, y } = req.body;

      const characterX = level.characters[character].x;
      const characterY = level.characters[character].y;

      const result = (
        x > (characterX - SQUAR_SIZE / 2) && x < (characterX + SQUAR_SIZE / 2)
        &&
        y > (characterY - SQUAR_SIZE / 2) && y < (characterY + SQUAR_SIZE / 2)
      );

      if (result) {
        return res.status(200).json({ result: "Succeed.", msg: "Character Found." });
      }

      return res.status(404).json({ errors: [{ result: "Failed.", msg: "Character Not Found." }] });
    } catch (err) {
      next(err);
    }
  });

module.exports = Router;
