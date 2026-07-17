from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User , Role
from schemas import UserResponse, UserUpdate

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# ==========================
# Get All Users
# ==========================
@router.get("/", response_model=list[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    return db.query(User).all()


# ==========================
# Get User by ID
# ==========================
@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


# ==========================
# Update User
# ==========================
@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    updated_user: UserUpdate,
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

    user.username = updated_user.username
    user.email = updated_user.email
    user.role_id = updated_user.role_id

    db.commit()
    db.refresh(user)

    return user


# ==========================
# Delete User
# ==========================
@router.delete("/{user_id}")
def delete_user(
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
    db: Session = Depends(get_db)
):
    # Find the user
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Check if the role exists
    role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    # Assign the role
    user.role_id = role_id

    db.commit()
    db.refresh(user)

    return {
        "message": f"Role '{role.role_name}' assigned successfully.",
        "user_id": user.id,
        "role_id": role.id
    }