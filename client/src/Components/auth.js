import jwt_decode from "jwt-decode";

export const getRoleFromToken = (token) => {
  if (token) {
    const decodedToken = jwt_decode(token);
    const role = decodedToken.role; // Assuming the role is stored in the 'role' field
    return role;
  }
  return null;
};
