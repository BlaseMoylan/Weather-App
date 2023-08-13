from flask import current_app
from flask_mail import Message, Mail

mail = Mail()

def send_reset_email(user):

    token = user.get_reset_token()

    msg = Message()
    msg.subject = "My Skies Password Reset"
    msg.sender = current_app.config.get('MAIL_USERNAME')
    msg.recipients = [user.email]
    msg.html = f"<p>Click the following link to reset your password: <a href='{current_app.config.get('FRONTEND_URL')}/resetpassword/{token}'>Reset Password</a></p>"

    mail.send(msg)