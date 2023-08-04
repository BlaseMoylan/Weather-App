from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask import current_app
from time import time
import jwt

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phone_number = db.Column(db.String(255))

    def __repr__(self):
        return self.email

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_reset_token(self, expires_in_seconds = 1800):
        return jwt.encode({'reset_password_for': self.email, 'exp': time() + expires_in_seconds}, key=current_app.config.get('JWT_SECRET_KEY'))

    @staticmethod
    def verify_reset_token(token):
        try:
            email = jwt.decode(token, key=current_app.config.get('JWT_SECRET_KEY'))['reset_password_for']
            return email
        except Exception as e:
            print(e)
            return None


class Location(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    lattitude= db.Column(db.Integer(), nullable=False)
    longitude = db.Column(db.Integer(), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))