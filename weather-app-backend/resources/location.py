from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource
from database.models import db, Location
from database.schemas import location_schema, locations_schema

class Locations(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        data = request.get_json()
        new_location = location_schema.load(data)
        new_location.user_id = user_id
        db.session.add(new_location)
        db.session.commit()
        return location_schema.dump(new_location), 201

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        locations = Location.query.filter_by(user_id = user_id)
        return locations_schema.dump(locations), 200

class IndividualLocation(Resource):
    @jwt_required()
    def get(self, location_id):
        location = Location.query.get_or_404(location_id)
        return location_schema.dump(location), 200

    @jwt_required()
    def delete(self, location_id):
        location = Location.query.get_or_404(location_id)
        db.session.delete(location)
        db.session.commit()
        return f'{location.name} Successfully Deleted', 200