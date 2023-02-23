migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x04ixfpz",
    "name": "address",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x04ixfpz",
    "name": "street_address",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
