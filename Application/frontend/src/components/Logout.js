import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const navigate = useNavigate();

  function logout_user(){
    
    localStorage.removeItem('token')
    navigate("/");
  }
 
  useEffect(() => logout_user())
  return (
    <div>
      <p>Logging Out</p>
    </div>
  )
}
export default Logout
