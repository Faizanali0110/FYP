"""
User Management System for Testing
A simple user management class with basic CRUD operations
"""

import re
from datetime import datetime
from typing import Dict, List, Optional


class User:
    """Represents a user in the system"""

    def __init__(self, user_id: int, username: str, email: str, password: str):
        self.user_id = user_id
        self.username = username
        self.email = email
        self.password = password  # In real apps, this should be hashed
        self.created_at = datetime.now()
        self.is_active = True
        self.login_attempts = 0
        self.last_login = None

    def __str__(self):
        return (
            f"User(id={self.user_id}, username='{self.username}', email='{self.email}')"
        )

    def __repr__(self):
        return self.__str__()


class UserManager:
    """Manages user operations like create, read, update, delete"""

    def __init__(self):
        self.users: Dict[int, User] = {}
        self.next_id = 1
        self.max_login_attempts = 3

    def validate_email(self, email: str) -> bool:
        """Validate email format"""
        if not email or not isinstance(email, str):
            return False

        pattern = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        return re.match(pattern, email) is not None

    def validate_username(self, username: str) -> bool:
        """Validate username (3-20 chars, alphanumeric + underscore)"""
        if not username or not isinstance(username, str):
            return False

        if len(username) < 3 or len(username) > 20:
            return False

        return re.match(r"^[a-zA-Z0-9_]+$", username) is not None

    def validate_password(self, password: str) -> bool:
        """Validate password (min 8 chars, at least 1 digit, 1 upper, 1 lower)"""
        if not password or not isinstance(password, str):
            return False

        if len(password) < 8:
            return False

        has_digit = any(c.isdigit() for c in password)
        has_upper = any(c.isupper() for c in password)
        has_lower = any(c.islower() for c in password)

        return has_digit and has_upper and has_lower

    def create_user(self, username: str, email: str, password: str) -> Optional[User]:
        """Create a new user"""
        # Validation
        if not self.validate_username(username):
            raise ValueError("Invalid username format")

        if not self.validate_email(email):
            raise ValueError("Invalid email format")

        if not self.validate_password(password):
            raise ValueError(
                "Password must be at least 8 characters with 1 digit, 1 uppercase, and 1 lowercase letter"
            )

        # Check for existing username or email
        for user in self.users.values():
            if user.username == username:
                raise ValueError("Username already exists")
            if user.email == email:
                raise ValueError("Email already exists")

        # Create user
        user = User(self.next_id, username, email, password)
        self.users[self.next_id] = user
        self.next_id += 1

        return user

    def get_user(self, user_id: int) -> Optional[User]:
        """Get user by ID"""
        return self.users.get(user_id)

    def get_user_by_username(self, username: str) -> Optional[User]:
        """Get user by username"""
        for user in self.users.values():
            if user.username == username:
                return user
        return None

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        for user in self.users.values():
            if user.email == email:
                return user
        return None

    def get_all_users(self) -> List[User]:
        """Get all users"""
        return list(self.users.values())

    def get_active_users(self) -> List[User]:
        """Get only active users"""
        return [user for user in self.users.values() if user.is_active]

    def update_user(self, user_id: int, **kwargs) -> bool:
        """Update user information"""
        user = self.get_user(user_id)
        if not user:
            return False

        if "username" in kwargs:
            if not self.validate_username(kwargs["username"]):
                raise ValueError("Invalid username format")
            # Check if username is taken by another user
            for uid, u in self.users.items():
                if uid != user_id and u.username == kwargs["username"]:
                    raise ValueError("Username already exists")
            user.username = kwargs["username"]

        if "email" in kwargs:
            if not self.validate_email(kwargs["email"]):
                raise ValueError("Invalid email format")
            # Check if email is taken by another user
            for uid, u in self.users.items():
                if uid != user_id and u.email == kwargs["email"]:
                    raise ValueError("Email already exists")
            user.email = kwargs["email"]

        if "password" in kwargs:
            if not self.validate_password(kwargs["password"]):
                raise ValueError("Invalid password format")
            user.password = kwargs["password"]

        return True

    def delete_user(self, user_id: int) -> bool:
        """Delete user by ID"""
        if user_id in self.users:
            del self.users[user_id]
            return True
        return False

    def deactivate_user(self, user_id: int) -> bool:
        """Deactivate user instead of deleting"""
        user = self.get_user(user_id)
        if user:
            user.is_active = False
            return True
        return False

    def activate_user(self, user_id: int) -> bool:
        """Activate user"""
        user = self.get_user(user_id)
        if user:
            user.is_active = True
            user.login_attempts = 0  # Reset login attempts
            return True
        return False

    def authenticate(self, username: str, password: str) -> Optional[User]:
        """Authenticate user login"""
        user = self.get_user_by_username(username)

        if not user:
            return None

        if not user.is_active:
            raise ValueError("User account is deactivated")

        if user.login_attempts >= self.max_login_attempts:
            raise ValueError("Account locked due to too many failed attempts")

        if user.password == password:
            user.login_attempts = 0
            user.last_login = datetime.now()
            return user
        else:
            user.login_attempts += 1
            if user.login_attempts >= self.max_login_attempts:
                user.is_active = False
            return None

    def reset_password(self, email: str, new_password: str) -> bool:
        """Reset user password by email"""
        user = self.get_user_by_email(email)
        if not user:
            return False

        if not self.validate_password(new_password):
            raise ValueError("Invalid password format")

        user.password = new_password
        user.login_attempts = 0
        user.is_active = True
        return True

    def get_user_stats(self) -> Dict:
        """Get user statistics"""
        total_users = len(self.users)
        active_users = len(self.get_active_users())
        inactive_users = total_users - active_users

        return {
            "total_users": total_users,
            "active_users": active_users,
            "inactive_users": inactive_users,
            "user_creation_rate": total_users,  # Could be expanded with time-based stats
        }


# Example usage and testing
if __name__ == "__main__":
    # Create user manager instance
    user_manager = UserManager()

    try:
        # Create some users
        user1 = user_manager.create_user("john_doe", "john@example.com", "Password123")
        user2 = user_manager.create_user(
            "jane_smith", "jane@example.com", "SecurePass456"
        )
        user3 = user_manager.create_user(
            "bob_wilson", "bob@example.com", "StrongPwd789"
        )

        print(f"Created users: {user1}, {user2}, {user3}")

        # Try to authenticate
        auth_user = user_manager.authenticate("john_doe", "Password123")
        print(f"Authentication successful: {auth_user}")

        # Update user
        user_manager.update_user(user1.user_id, email="john.doe@newdomain.com")
        print(f"Updated user: {user_manager.get_user(user1.user_id)}")

        # Get statistics
        stats = user_manager.get_user_stats()
        print(f"User statistics: {stats}")

        # Test validation failures
        try:
            user_manager.create_user("ab", "invalid-email", "weak")
        except ValueError as e:
            print(f"Validation error (expected): {e}")

    except Exception as e:
        print(f"Error: {e}")
