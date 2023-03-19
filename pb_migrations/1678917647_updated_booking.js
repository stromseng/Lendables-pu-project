migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('shnl487g4b8xwfd');

    collection.listRule = '';
    collection.viewRule = '';
    collection.createRule = '';
    collection.updateRule = '';
    collection.deleteRule = '';

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('shnl487g4b8xwfd');

    collection.listRule = null;
    collection.viewRule = null;
    collection.createRule = null;
    collection.updateRule = null;
    collection.deleteRule = null;

    return dao.saveCollection(collection);
  }
);
