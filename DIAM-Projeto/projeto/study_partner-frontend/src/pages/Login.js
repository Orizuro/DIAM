import { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const auth = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn);


  useEffect(() => {
    setIsLoggedIn(auth.isLoggedIn)
  }, [auth.isLoggedIn])

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      auth.login(username, password);
      return;

    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      {
        !isLoggedIn ?
          <form onSubmit={handleSubmit}>
            <label>Username: </label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Password: </label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
          </form>

          :
          <button type="button" onClick={() => auth.logout()}>Logout</button>
      }
    </div>
  );
}

export default Login;
