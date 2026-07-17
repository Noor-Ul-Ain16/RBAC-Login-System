from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas import UserLogin, Token
from auth import verify_password, create_access_token
from database import get_db
from models import User,Role
from schemas import UserCreate, UserResponse
from dependencies import get_current_user
from auth import hash_password


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register", response_model=UserResponse)
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    # Check if email already exists
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    # Check if the selected role exists
    role = db.query(Role).filter(
        Role.id == user.role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    # Hash the password
    hashed_password = hash_password(user.password)

    # Create the new user
    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        role_id=user.role_id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login", response_model=Token)
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    # Find the user by email
    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    # If user doesn't exist
    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Verify the password
    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # Create JWT token
    access_token = create_access_token(
        data={"user_id": db_user.id}
    )

    # Return the token
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me", response_model=UserResponse)
def get_me(
    current_user: User = Depends(get_current_user)
):
    return current_user