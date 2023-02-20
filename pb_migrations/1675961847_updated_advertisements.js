migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ga9scii",
    "name": "seller",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9ga9scii",
    "name": "seller",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": [
        "name"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
