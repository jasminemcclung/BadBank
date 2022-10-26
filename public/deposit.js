function Deposit() {
	const [show, setShow]                   = React.useState(true);
	const [status, setStatus]               = React.useState('');
	const [user, setUser]                   = React.useState('');
	const [loginEmail, setLoginEmail]       = React.useState('');
	const [loginPassword, setLoginPassword] = React.useState('');
	const [balance, setBalance]             = React.useState('');
	const [deposit, setDeposit]             = React.useState('');
	const ctx                               = React.useContext(UserContext);
    const [buttonStatus, setButtonStatus]   = React.useState(true);

	if (show) {
	  for (const { name, email, password, balance, loggedin } of ctx.users) {
		if (loggedin) {
		  setShow(false);
		  setUser(name);
		  setLoginEmail(email);
		  setLoginPassword(password);
		  setBalance(balance);
		  return;
		}
	  }
	}
  
    function handleChange(e){
        if(e.target.value === null) { 
            setButtonStatus(true)
            setDeposit(e.currentTarget.value)
            
        } else {
            setButtonStatus(false)
            setDeposit(e.currentTarget.value)
            
        }
       
    }

	function HandleDeposit() {
	  if (!isNaN(deposit) && deposit > 0) {
		let newBalance = Number(balance) + Number(deposit);
		let tracker = false;
		setBalance(newBalance);
		setDeposit('');
		setStatus(`$${deposit} was successfully deposited into your account`);
        setTimeout(()=> setStatus(''), 5000);
        
  
		
		for (const { email, password, balance } of ctx.users) {
		  if (loginEmail === email && loginPassword === password) {
			for (var i = 0, length = ctx.users.length; i < length; i++) {
			  if (ctx.users[i].email === loginEmail) {
				ctx.users[i].balance = Number(newBalance);
  
				tracker = true;
			  }
			}
		  }
		}
  
		if (tracker) {
		  setStatus(`$${deposit} deposited into account`);
		  setTimeout(() => setStatus(''), 5000);
		  setDeposit('');
		  setBalance(Number(newBalance));
          setButtonStatus(true);
		}
	  } 
	   else {
		setStatus('Failed Transaction. The amount must be a numerical amount. No dollar signs, letters, punctuation, etc.');
		setDeposit('');
		setTimeout(() => setStatus(''), 5000);
        setButtonStatus(true);
	  }
	  return;
	}
  
	return (
	  <Card
		bgcolor="dark"
		txtcolor="light"
		header="Deposit"
		status={status}
		body={ (
			<>
			  <h4>Current Balance: ${balance}</h4>
			  <br />
			  Deposit Amount:
			  <br />
			  <input
				type="input"
				className="form-control"
				id="deposit"
				placeholder="$0.00"
				value={deposit}
				onChange={handleChange}
			  />
			  <br />
			  <>
				<button
                  id="button"  
				  type="submit"
				  className="btn btn-light"
                  disabled={buttonStatus}
				  onClick={HandleDeposit}
				>
				  Deposit
				</button>
				<br />
				<br />
				<div className="text-left"></div>
			  </>
			</>
		  )
		}
	  />
	);
  }