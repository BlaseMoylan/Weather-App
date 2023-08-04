from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_migrate import Migrate
from database.models import db
from database.schemas import ma
from resources.email import mail
from resources.auth import LoginResource, RegisterResource, ForgotPasswordResource, ResetResource
from resources.location import Locations, IndividualLocation
from dotenv import load_dotenv
from os import environ

# Adds variables from .env file to environment
load_dotenv()

# Creates instances of additional libraries
bcrypt = Bcrypt()
jwt= JWTManager()
cors = CORS()
migrate = Migrate()

def create_app():
    """
    App factory that creates app instance
    """
    # Creates app instance
    app = Flask(__name__)

    # Loads config properties from .env file
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['JWT_SECRET_KEY'] = environ.get('JWT_SECRET_KEY')
    app.config['FRONTEND_URL'] = 'http://localhost:3000'

    # Flask-Mail configuration using environment variables
    app.config['MAIL_SERVER'] = environ.get('MAIL_SERVER')
    app.config['MAIL_PORT'] = int(environ.get('MAIL_PORT'))
    app.config['MAIL_USE_TLS'] = environ.get('MAIL_USE_TLS') == 'True'
    app.config['MAIL_USERNAME'] = environ.get('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = environ.get('MAIL_PASSWORD')

    # Registers all routes with API
    api = create_routes()

    # Registers Flask app with additional libraries created/imported above
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    cors.init_app(app)
    api.init_app(app)
    migrate.init_app(app, db)
    mail.init_app(app)

    return app


def create_routes():
    """
    Creates Flask Restful instance and registers all Resource routes
    """
    api = Api()
    api.add_resource(RegisterResource, '/api/auth/register')
    api.add_resource(LoginResource, '/api/auth/login')
    api.add_resource(Locations, '/api/locations')
    api.add_resource(IndividualLocation, '/api/location/<int:location_id>')
    api.add_resource(ForgotPasswordResource, '/api/auth/forgot_password')
    api.add_resource(ResetResource, '/api/auth/reset_password/<str:token>')

    return api

app = create_app()