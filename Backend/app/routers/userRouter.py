from fastapi import APIRouter
from models.users import User

router = APIRouter(prefix="/users", tags=["Users"])

users_db = []  # temporary fake database


@router.post("/", response_model=User)
def create_user(user: User):
    users_db.append(user)
    return user


@router.get("/{user_id}", response_model=User)
def get_user(user_id: int):
    for user in users_db:
        if user.id == user_id:
            return user
    return {"error": "User not found"}
