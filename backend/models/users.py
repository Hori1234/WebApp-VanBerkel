from backend.app import db
from flask_login import UserMixin
from hashlib import sha256
from base64 import b64encode
import bcrypt


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)

    def __init__(self, username: str, password: str):
        self.username = username
        self.set_password(password)

    def set_password(self, password: str):
        """
        Hashes and stores the password using bcrypt.
        The password is first hashed using sha256, after which it is base64 encoded.
        This to prevent bcrypt only using the first 72 characters.

        :param password: the new password of the user
        """
        self.password = bcrypt.hashpw(b64encode(sha256(password.encode()).digest()), bcrypt.gensalt())

    def check_password(self, password: str):
        """
        Checks if the password of the user is correct.

        :returns bool: whether the password was correct
        """
        return bcrypt.checkpw(b64encode(sha256(password.encode()).digest()), self.password)
