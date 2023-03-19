migrate((db) => {
  const collection = new Collection({
    "id": "jez0tpcsepkht0x",
    "created": "2023-03-18 19:53:14.233Z",
    "updated": "2023-03-18 19:53:14.233Z",
    "name": "ratings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hzjqx9sz",
        "name": "userRated",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "phesj4is",
        "name": "userGivingRating",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "maxSelect": 1,
          "displayFields": []
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
  const collection = dao.findCollectionByNameOrId("jez0tpcsepkht0x");

  return dao.deleteCollection(collection);
})
