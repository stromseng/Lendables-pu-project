migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r85mnbfj",
    "name": "telephone_number",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 99999999
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r85mnbfj",
    "name": "telephone_number",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": 99999999
    }
  }))

  return dao.saveCollection(collection)
})
