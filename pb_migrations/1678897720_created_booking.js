migrate((db) => {
  const collection = new Collection({
    "id": "shnl487g4b8xwfd",
    "created": "2023-03-15 16:28:40.942Z",
    "updated": "2023-03-15 16:28:40.942Z",
    "name": "booking",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6fdvyskp",
        "name": "startDate",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "qbmakkzh",
        "name": "endDate",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("shnl487g4b8xwfd");

  return dao.deleteCollection(collection);
})
