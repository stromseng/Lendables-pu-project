migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('shnl487g4b8xwfd');

    // add
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: '2a6kz0yy',
        name: 'totalPrice',
        type: 'number',
        required: false,
        unique: false,
        options: {
          min: 0,
          max: null,
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('shnl487g4b8xwfd');

    // remove
    collection.schema.removeField('2a6kz0yy');

    return dao.saveCollection(collection);
  }
);
