migrate((db) => {
  const collection = new Collection({
    "id": "4z1poad6ycsuu5k",
    "created": "2023-02-08 10:49:02.763Z",
    "updated": "2023-02-08 10:49:02.763Z",
    "name": "advertisements",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zm6mrwla",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 0,
          "max": 100,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "vfqt5dgz",
        "name": "price",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k");

  return dao.deleteCollection(collection);
})
