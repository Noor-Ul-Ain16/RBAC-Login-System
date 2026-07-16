from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

# Import the SQLAlchemy Role model
from models import Role

# Import Pydantic schemas
from schemas import RoleCreate, RoleUpdate, RoleResponse

# Import database session dependency
from database import get_db

# Create an APIRouter for Role endpoints
router = APIRouter(
    prefix="/roles",   # All routes will start with /roles
    tags=["Roles"]     # Group these endpoints under "Roles" in Swagger UI
)


# ==========================
# Create a New Role
# ==========================
@router.post("/", response_model=RoleResponse)
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    """
    Create a new role in the database.
    """

    # Create a Role object using the request data
    db_role = Role(name=role.name)

    # Add the object to the session
    db.add(db_role)

    # Save changes to the database
    db.commit()

    # Refresh to get generated values like ID
    db.refresh(db_role)

    # Return the created role
    return db_role


# ==========================
# Get a Role by ID
# ==========================
@router.get("/{role_id}", response_model=RoleResponse)
def get_role(role_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single role by its ID.
    """

    # Search for the role
    role = db.query(Role).filter(Role.id == role_id).first()

    # If role doesn't exist, return 404
    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    # Return the found role
    return role


# ==========================
# Get All Roles
# ==========================
@router.get("/", response_model=list[RoleResponse])
def get_all_roles(db: Session = Depends(get_db)):
    """
    Retrieve all roles from the database.
    """

    # Return all roles
    return db.query(Role).all()


# ==========================
# Update an Existing Role
# ==========================
@router.put("/{role_id}", response_model=RoleResponse)
def update_role(role_id: int, role: RoleUpdate, db: Session = Depends(get_db)):
    """
    Update an existing role.
    """

    # Find the role by ID
    db_role = db.query(Role).filter(Role.id == role_id).first()

    # If role doesn't exist, return 404
    if not db_role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    # Update the role name
    db_role.name = role.name

    # Save changes
    db.commit()

    # Refresh the object with updated data
    db.refresh(db_role)

    # Return the updated role
    return db_role


# ==========================
# Delete a Role
# ==========================
@router.delete("/{role_id}")
def delete_role(role_id: int, db: Session = Depends(get_db)):
    """
    Delete a role by its ID.
    """

    # Find the role
    db_role = db.query(Role).filter(Role.id == role_id).first()

    # If role doesn't exist, return 404
    if not db_role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    # Delete the role
    db.delete(db_role)

    # Commit the deletion
    db.commit()

    # Return