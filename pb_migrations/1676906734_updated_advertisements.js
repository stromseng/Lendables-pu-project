migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // add
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "megujpjd",
    "name": "zipcode",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ogoezxgz",
    "name": "phone",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cxhbk9h1",
    "name": "email",
    "type": "email",
    "required": false,
    "unique": false,
    "options": {
      "exceptDomains": null,
      "onlyDomains": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z1poad6ycsuu5k")

  // remove
  collection.schema.removeField("x04ixfpz")

  // remove
  collection.schema.removeField("megujpjd")

  // remove
  collection.schema.removeField("ogoezxgz")

  // remove
  collection.schema.removeField("cxhbk9h1")

  return dao.saveCollection(collection)
})
