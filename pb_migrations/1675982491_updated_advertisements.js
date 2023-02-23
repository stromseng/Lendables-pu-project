migrate(
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('4z1poad6ycsuu5k');

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: '8nmfbi2s',
        name: 'pictures',
        type: 'file',
        required: false,
        unique: false,
        options: {
          maxSelect: 32,
          maxSize: 5242880,
          mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/gif',
            'image/webp',
          ],
          thumbs: [],
        },
      })
    );

    return dao.saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('4z1poad6ycsuu5k');

    // update
    collection.schema.addField(
      new SchemaField({
        system: false,
        id: '8nmfbi2s',
        name: 'pictures',
        type: 'file',
        required: false,
        unique: false,
        options: {
          maxSelect: 10,
          maxSize: 5242880,
          mimeTypes: [
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/gif',
            'image/webp',
          ],
          thumbs: [],
        },
      })
    );

    return dao.saveCollection(collection);
  }
);
