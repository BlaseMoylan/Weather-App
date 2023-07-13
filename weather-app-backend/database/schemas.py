from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    password = fields.String(required=True)
    email = fields.String(required=True)
    phone_number = fields.String()
    class Meta:
        fields = ("id", "password", "email", "phone_number")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)

class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    email = fields.String(required=True)
    phone_number = fields.String()
    class Meta:
        fields = ("id", "email", "phone_number")

register_schema = RegisterSchema()
user_schema = UserSchema()
users_schema = UserSchema(many=True)

class LocationSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    name = fields.String(required=True)
    lattitude = fields.Integer(required=True)
    longitude = fields.Integer(required=True)
    user_id = fields.Integer(required=True)

    class Meta:
        fields = ("id", "name", "lattitude", "longitude", "user_id")

location_schema = LocationSchema()
locations_schema = LocationSchema(many=True)