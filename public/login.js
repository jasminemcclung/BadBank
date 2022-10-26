function Login() {
	const [show, setShow]                     = React.useState(true);
	const [status, setStatus]                 = React.useState('');
	const [name, setName]                     = React.useState('');
	const [email, setEmail]       			  = React.useState('');
	const [currentAccount, setCurrentAccount] = React.useState('');
	const [emailValue, setEmailValue]             = React.useState('');
	const [passwordValue, setPasswordValue]       = React.useState('');
    const [buttonStatus, setButtonStatus]     = React.useState(true);
	const ctx = React.useContext(UserContext);
  
	if (show) {
	  for (const { name, email, loggedin } of ctx.users) {
		if (loggedin) {
		  setShow(false);
		  setEmail(email);
		  setName(name);
  
		  return;
		}
	  }
	}
  
    function handleChange(e){
        if(e.target.value === null){
            setButtonStatus(true);
            setPasswordValue(e.currentTarget.value);
        } else {
            setButtonStatus(false);
            setPasswordValue(e.currentTarget.value);
        }
    }

	function validate(field, label) {
	  if (!field) {
		setStatus('Error: Missing ' + label);
		setTimeout(() => setStatus(''), 3000);
		return false;
	  }
	  return true;
	}

	function handleLogin() {
	  if (!validate(emailValue,    'email')) return;
	  if (!validate(passwordValue, 'password')) return;
	  let tracker = false;
  
	  for (const { email, password } of ctx.users) {
		if (emailValue === email && passwordValue === password) {
		  for (var i = 0, length = ctx.users.length; i < length; i++) {
			if (ctx.users[i].email === email) {
			  ctx.users[i].loggedin = true;
			  tracker = true;
			}
		  }
		}
	  }
  
	  if (tracker) {
		setShow(false);
		setCurrentAccount(emailValue);
	  } else {
		setStatus('Invalid login. Please create an account');
		setTimeout(() => setStatus(''), 6000);
	  }
	}
  
	function logout() {
	  for (var i = 0, length = ctx.users.length; i < length; i++) {
		ctx.users[i].loggedin = false;
	  }
	  setShow(true);
	}
  
	return (
	  <Card
		bgcolor="dark"
		txtcolor="light"
		header="Login"
		status={status}
		body={
		  show ? (
			<>
			  <br />
			  Email
			  <br />
			  <input
				type="input"
				className="form-control"
				id="email"
				placeholder="Enter Email"
				value={emailValue}
				onChange={(e) => setEmailValue(e.currentTarget.value)}
			  />
			  <br />
			  Password
			  <br />
			  <input
				type="password"
				className="form-control"
				id="password"
				placeholder="Enter Password"
				value={passwordValue}
				onChange={handleChange}
			  />
			  <br />
			  <button
				type="submit"
				className="btn btn-light"
                disabled={buttonStatus}
				onClick={handleLogin}
			  >
				Login
			  </button>
			  <br />
			  <br />
			</>
		  ) : (
			<>
			  <h5> {`Welcome back ${currentAccount}! `} </h5>
			  <br />
			  Check your account information {' '}
			  <a href="#/alldata" className="text-light">
				here
			  </a>!
			 
			  <br />
			  <br />
			  <button
				type="submit"
				className="btn btn-light"
				onClick={logout}
			  >
				Logout
			  </button>
			</>
		  )
		}
	  />
	);
  }