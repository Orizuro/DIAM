import { useState } from "react";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      auth.login(username, password);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username: </label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password: </label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
