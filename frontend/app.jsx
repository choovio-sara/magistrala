const API_BASE = 'http://localhost';
const USERS_PORT = 9002;

function App() {
  const [token, setToken] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const login = async () => {
    try {
      const res = await fetch(`${API_BASE}:${USERS_PORT}/tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        setToken(data.access_token);
      } else {
        const err = await res.text();
        alert(`Login failed: ${err}`);
      }
    } catch (err) {
      alert('Login request failed.');
    }
  };

  const signup = async () => {
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email,
      credentials: {
        username,
        secret: password,
      },
    };

    try {
      const res = await fetch(`${API_BASE}:${USERS_PORT}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert('User created. You can log in now.');
      } else {
        const err = await res.text();
        alert(`Signup failed: ${err}`);
      }
    } catch (err) {
      alert('Signup request failed.');
    }
  };

  if (!token) {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <h1>Magistrala</h1>
        <div>
          <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={login}>Login</button>
        <hr />
        <h2>Sign up</h2>
        <div>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <input placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <input placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <button onClick={signup}>Create Account</button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>Authenticated</h1>
      <p>Token: {token}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
