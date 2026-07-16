from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserResponse
from auth import hash_password

router = APIRouter(prefix="/auth", tags=["Authentication"])