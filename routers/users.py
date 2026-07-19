from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User, Role
from schemas import UserResponse, UserUpdate
from dependencies import require_role

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# ==========================
# Get All Users
# ==========================
@router.get("/", response_model=list[UserResponse])
def get_all_users(
    db: Session = Depends(get_db)
):
    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role_id": user.role_id,
            "role_name": user.role.role_name if user.role else None,
        }
        for user in users
    ]


# ==========================
# Get User by ID
# ==========================
@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role_id": user.role_id,
        "role_name": user.role.role_name if user.role else None,
    }


# ==========================
# Update User
# ==========================
@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    updated_user: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("Admin"))
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    existing_username = db.query(User).filter(
        User.username == updated_user.username,
        User.id != user_id
    ).first()

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    existing_email = db.query(User).filter(
        User.email == updated_user.email,
        User.id != user_id
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    role = db.query(Role).filter(
        Role.id == updated_user.role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    user.username = updated_user.username
    user.email = updated_user.email
    user.role_id = updated_user.role_id

    db.commit()
    db.refresh(user)

    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role_id": user.role_id,
        "role_name": user.role.role_name if user.role else None,
    }


# ==========================
# Delete User
# ==========================
@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("Admin"))
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }


# ==========================
# Assign Role to User
# ==========================
@router.put("/{user_id}/role")
def assign_role(
    user_id: int,
    role_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_role("Admin"))
):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    user.role_id = role.id

    db.commit()
    db.refresh(user)

    return {
        "message": f"Role '{role.role_name}' assigned successfully.",
        "user_id": user.id,
        "username": user.username,
        "role_id": role.id,
        "role_name": role.role_name
    }