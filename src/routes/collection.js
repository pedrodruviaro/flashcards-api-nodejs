const router = require("express").Router();
const tokenValidation = require("../services/tokenValidation");

const CollectionController = require("../controllers/CollectionController");

/*
    POST => /api/collection/create
    BODY => name, category, description, public
    BELONGS TO => USER
*/
router.post("/create", tokenValidation, CollectionController.create);

/*
    GET => /api/collection
    Gets all from a user
*/
router.get("/", tokenValidation, CollectionController.getCollections);

/*
    GET => /api/collection/:collectionId
    Gets FULL COLLECTION from a user
*/
router.get(
    "/:collectionId",
    tokenValidation,
    CollectionController.getFullCollection
);

/*
    DELETE => /api/collection/:collectionId
*/
router.delete("/:collectionId", tokenValidation, CollectionController.remove);

/*
    PUT => /api/collection/:collectionId
*/
router.put("/:collectionId", tokenValidation, CollectionController.update);

module.exports = router;
