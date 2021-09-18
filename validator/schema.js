module.exports =
{
  "USER_SCHEMA": {
    "title": "User",
    "description": "User schema",
    "type": "object",
    "additionalProperties": false,
    "properties": {

 

      "email": {
        "type": "string"
      },
      "password": {
        "type": "string"
      },
      "mobileNumber": {
        "type": "string"
      },
      "cnicNumber": {
        "type": "string"
      },

      "confirmationCode": {
        "type": "string"

      }

    }
  }
}