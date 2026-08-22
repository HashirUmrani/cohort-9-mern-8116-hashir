const { Router } = require("express");

const noteController = require("../controllers/note.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const noteRouter = Router();

/**
 * @route GET /api/notes/get-notes
 * @description getting a notes
 * @acess private
 */
noteRouter.get("/get-notes", authMiddleware.authUser, noteController.getNotes);

/**
 * @route GET /api/notes/:id
 * @description getting a note by id
 * @acess private
 */
noteRouter.get("/:id", authMiddleware.authUser, noteController.getNoteById);

/**
 * @route POST /api/notes/create-note
 * @description creating a note
 * @acess private
 */
noteRouter.post(
  "/create-note",
  authMiddleware.authUser,
  noteController.createNote,
);

/**
 * @route PUT /api/notes/update-note
 * @description upadting a existing note
 * @acess private
 */
noteRouter.put(
  "/update-note/:id",
  authMiddleware.authUser,
  noteController.updateNote,
);

/**
 * @route DELETE /api/notes/delete-note
 * @description deleting a note
 * @acess private
 */
noteRouter.delete(
  "/delete-note/:id",
  authMiddleware.authUser,
  noteController.deleteNote,
);

module.exports = noteRouter;
