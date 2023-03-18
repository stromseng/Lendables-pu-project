migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "evnqozdy",
    "name": "city",
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

  // remove
  collection.schema.removeField("evnqozdy")

  return dao.saveCollection(collection)
})
