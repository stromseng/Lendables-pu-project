migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bfnuh5uo",
    "name": "category",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8nmfbi2s",
    "name": "pictures",
    "type": "file",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 10,
      "maxSize": 5242880,
      "mimeTypes": [],
      "thumbs": []
    }
  }))

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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // remove
  collection.schema.removeField("bfnuh5uo")

  // remove
  collection.schema.removeField("8nmfbi2s")

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
})
