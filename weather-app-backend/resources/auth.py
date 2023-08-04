from flask import request
from flask_jwt_extended import create_access_token
from flask_restful import Resource
from database.models import db, User
from database.schemas import register_schema, user_schema
from marshmallow import ValidationError
from sqlalchemy.exc import IntegrityError
from resources.email import send_reset_email
import datetime



class RegisterResource(Resource):
    """ User Registration, creates new user """
    def post(self):
        form_data = request.get_json()
        try:
            new_user = register_schema.load(form_data)
            new_user.hash_password()
            db.session.add(new_user)
            db.session.commit()
            return user_schema.dump(new_user), 201
        except ValidationError as err:
            return err.messages, 400
        except IntegrityError as err:
            return str(err.__dict__['orig']), 409

class LoginResource(Resource):
    """ User Login, responds with access token """
    def post(self):
        form_data = request.get_json()
        user = db.one_or_404(
            User.query.filter_by(email=form_data.get('email')),
            description=f"No user with that username."
        )
        authorized = user.check_password(form_data.get('password'))
        if not authorized:
            return {'error': 'email or password invalid'}, 401
        expires = datetime.timedelta(days=7)
        print(user.id)
        additional_claims = {
            'id': user.id,
            'email': user.email
        }
        access_token = create_access_token(identity=str(user.id), additional_claims=additional_claims, expires_delta=expires)
        return {'access': access_token}, 200

class ForgotPasswordResource(Resource):
    """ Forgot Password, sends reset password email """
    def post(self):
        data = request.get_json()
        email = data.get('email')

        # Check if the email exists in the database
        user = User.query.filter_by(email=email).first()

        if not user:
            return {"message": "Email not found"}, 404

        send_reset_email(user)

        return {"message": "Password reset email sent"}, 200

class ResetResource(Resource):
    """ Password Reset, reset user password """
    def post(self, token):
        form_data = request.get_json()
        new_password = form_data.get('new_password')

        # Find the user based on the reset token
        user_email = User.verify_reset_token(token)
        user = User.query.filter_by(email=user_email).first()

        if not user:
            return {"message": "Invalid token"}, 401

        # Update the user's password with the new one and hash it
        user.password = new_password
        user.hash_password()
        db.session.commit()

        return {"message": "Password reset successful"}, 200
