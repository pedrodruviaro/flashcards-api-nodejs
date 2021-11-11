const CollectionValidation = require("../services/CollectionValidation");
const Collection = require("../models/Collection");
const Question = require("../models/Question");

class CollectionController {
    // POST
    async create(req, res) {
        const { userId } = req.user;

        const { error } = CollectionValidation.create(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const collection = {
                userId: userId,
                name: req.body.name,
                category: req.body.category,
                description: req.body.description,
                public: req.body.public,
            };

            const savedCollection = await Collection.create(collection);
            res.status(201).json(savedCollection);
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    // GET
    async getCollections(req, res) {
        const { userId } = req.user;

        try {
            const collections = await Collection.findAll({
                where: {
                    userId: userId,
                },
            });

            return res.status(200).json(collections);
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    async getFullCollection(req, res) {
        const { userId } = req.user;
        const { collectionId } = req.params;

        try {
            const collection = await Collection.findOne({
                where: {
                    id: collectionId,
                },
                include: [{ model: Question }],
            });

            if (collection.public === true) {
                return res.status(200).json(collection);
            }

            if (collection.userId !== userId) {
                return res.status(403).json({ error: "Unauthorized" });
            }

            return res.status(200).json(collection);
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    // DELETE
    async remove(req, res) {
        const { userId } = req.user;
        const collectionId = req.params.collectionId;

        try {
            const collection = await Collection.findByPk(collectionId);

            if (!collection) {
                return res.status(404).json({ error: "Collection not found" });
            }

            if (collection.userId !== userId) {
                return res.status(403).json({
                    error: "You can only delete your own collections",
                });
            }

            await Collection.destroy({
                where: {
                    id: collectionId,
                },
            });

            return res.status(200).json({ ok: true });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }

    // PUT
    async update(req, res) {
        const { userId } = req.user;
        const collectionId = req.params.collectionId;

        try {
            const collection = await Collection.findByPk(collectionId);

            if (!collection) {
                return res.status(404).json({ error: "Collection not found" });
            }

            if (collection.userId !== userId) {
                return res
                    .status(403)
                    .json({
                        error: "You can only update your own collections",
                    });
            }
            const newValues = req.body;
            await Collection.update(newValues, { where: { id: collectionId } });

            return res.status(200).json({ ok: true });
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
}

module.exports = new CollectionController();
