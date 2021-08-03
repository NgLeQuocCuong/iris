from django.core import mail
from datetime import datetime, timedelta
from django.conf import settings 

import jwt

EXP = timedelta(days=5)

def active_email_sender(domain, email):
    SUBJECT = 'Please active your account on IRIS system'
    
    TOKEN_DATA = {
        'email': email,
        'exp': datetime.now() + EXP
    }

    LINK = 'http://' + str(domain) + '/api/auth/active?token=' + jwt.encode(TOKEN_DATA, settings.SECRET_KEY)

    mail.send_mail(
        subject=SUBJECT,
        from_email='',
        message=LINK,
        recipient_list=[email]
    )

def forgot_password_email_sender(domain, email):
    SUBJECT = 'Reset your password here'

    TOKEN_DATA = {
        'email':email,
        'exp': datetime.now() + EXP
    }

    LINK = f'http://{str(domain)}/api/auth/rest_password?token=' + jwt.encode(TOKEN_DATA, settings.SECRET_KEY)

    mail.send_mail(
        subject=SUBJECT,
        from_email='',
        message=LINK,
        recipient_list=[email]
    )

