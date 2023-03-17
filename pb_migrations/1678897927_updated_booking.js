migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shnl487g4b8xwfd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wxav5whb",
    "name": "advertisement",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "4z1poad6ycsuu5k",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "title"
      ]
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kakvm5xp",
    "name": "bookedByUser",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "username"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shnl487g4b8xwfd")

  // remove
  collection.schema.removeField("wxav5whb")

  // remove
  collection.schema.removeField("kakvm5xp")

  return dao.saveCollection(collection)
})
