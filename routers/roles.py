from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from models import Role
from schemas import RoleCreate, RoleUpdate, RoleResponse
from database import get_db
from dependencies import require_role


router = APIRouter(
    prefix="/roles",
    tags=["Roles"]
)


# ==========================
# Create a New Role
# ==========================
@router.post("/", response_model=RoleResponse)
def create_role(
    role: RoleCreate,
    db: Session = Depends(get_db)
):
    existing_role = db.query(Role).filter(
        Role.role_name == role.role_name
    ).first()

    if existing_role:
        raise HTTPException(
            status_code=400,
            detail="Role already exists"
        )

    db_role = Role(
        role_name=role.role_name
    )

    db.add(db_role)
    db.commit()
    db.refresh(db_role)

    return db_role


# ==========================
# Get All Roles
# ==========================
@router.get("/", response_model=list[RoleResponse])
def get_all_roles(
    db: Session = Depends(get_db)
):
    return db.query(Role).all()


# ==========================
# Admin Dashboard (RBAC Test)
# ==========================
@router.get("/admin")
def admin_dashboard(
    current_user=Depends(require_role("Admin"))
):
    return {
        "message": "Welcome to Admin Dashboard"
    }

# ==========================
# Get Role By ID
# ==========================
@router.get("/{role_id}", response_model=RoleResponse)
def get_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return role


# ==========================
# Update Role
# ==========================
@router.put("/{role_id}", response_model=RoleResponse)
def update_role(
    role_id: int,
    role: RoleUpdate,
    db: Session = Depends(get_db)
):
    db_role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not db_role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    existing_role = db.query(Role).filter(
        Role.role_name == role.role_name,
        Role.id != role_id
    ).first()

    if existing_role:
        raise HTTPException(
            status_code=400,
            detail="Role already exists"
        )

    db_role.role_name = role.role_name

    db.commit()
    db.refresh(db_role)

    return db_role

# ==========================
# Delete Role
# ==========================
@router.delete("/{role_id}")
def delete_role(
    role_id: int,
    db: Session = Depends(get_db)
):
    db_role = db.query(Role).filter(
        Role.id == role_id
    ).first()

    if not db_role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    db.delete(db_role)
    db.commit()

    return {
        "message": "Role deleted successfully"
    }
