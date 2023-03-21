migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('jez0tpcsepkht0x');

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: 'r5t9gvos',
        name: 'rating',
        type: 'number',
        required: true,
        unique: false,
        options: {
          min: 1,
          max: 5,
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('jez0tpcsepkht0x');

    // remove
    collection.schema.removeField('r5t9gvos');

    return dao.saveCollection(collection);
  }
);
