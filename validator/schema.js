module.exports =
{
  "USER_SCHEMA": {
    "title": "User",
    "description": "User schema",
    "type": "object",
    "additionalProperties": false,
    "properties": {

 
      "storeName": {
        "type": "string"
      },
      "streetAddress": {
        "type": "string"
      },

      "email": {
        "type": "string"
      },
      "password": {
        "type": "string"
      },
      "postalCode": {
        "type": "number"
      },
      "city": {
        "type": "string"
      },
      "preferredLanguage": {
        "type": "string"
      },
      "confirmationCode": {
        "type": "string"

      }

    }
  }
}