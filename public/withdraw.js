function Withdraw() {
	const [withdraw, setWithdraw]         = React.useState('');
	const [show, setShow]                 = React.useState(true);
	const [status, setStatus]             = React.useState('');
	const [user, setUser]                 = React.useState('');
	const [userEmail, setUserEmail]       = React.useState('');
	const [userPassword, setUserPassword] = React.useState('');
	const [balance, setBalance]           = React.useState('');
    const [buttonStatus, setButtonStatus] = React.useState(true);
  
	const ctx = React.useContext(UserContext);
  
	if (show) {
	  for (const { name, email, password, balance, loggedin } of ctx.users) {
		if (loggedin) {
		  setShow(false);
		  setUser(name);
		  setUserEmail(email);
		  setUserPassword(password);
		  setBalance(balance);
  
		  return;
		}
	  }
	}

    function handleChange(e){
        if(e.target.value === null) { 
            setButtonStatus(true)
            setWithdraw(e.currentTarget.value)
            
        } else {
            setButtonStatus(false)
            setWithdraw(e.currentTarget.value)
            
        }
    }

	function handleWithdraw() {
	  if (!isNaN(withdraw) && withdraw > 0 && withdraw <= balance) {
		let newBalance = Number(balance) - Number(withdraw);
  
		let tracker = false;
  
		for (const { email, password, balance } of ctx.users) {
		  if (userEmail === email && userPassword === password) {
			for (var i = 0, length = ctx.users.length; i < length; i++) {
			  if (ctx.users[i].email === userEmail) {
				ctx.users[i].balance = Number(newBalance);
  
				tracker = true;
			  }
			}
		  }
		}
  
		if (tracker) {
		  setStatus(`SUCCESS! $${withdraw} withdrawn from account`);
		  setTimeout(() => setStatus(''), 6000);
		  setWithdraw('');
		  setBalance(Number(newBalance));
		}
	  } else if (withdraw > balance) {
		setStatus(`Failed Transaction. Amount must be less than $${balance}.`);
		setWithdraw('');
		setTimeout(() => setStatus(''), 5000);
	  } else if (!isNaN(withdraw)) {
		setStatus('Failed Transaction. Amount must be greater than $0.00. ');
		setWithdraw('');
		setTimeout(() => setStatus(''), 5000);
	  } else {
		setStatus('Failed Transaction. The amount must be a numerical amount. No dollar signs, letters, punctuation, etc.');
		setWithdraw('');
		setTimeout(() => setStatus(''), 5000);
	  }
	  return;
	}
  
	return (
	  <Card
		bgcolor="dark"
		txtcolor="light"
		header="Withdraw"
		status={status}
		body={ (
			<>
			  <h4>Current Balance: ${balance}</h4>
			  <br />
			  Withdrawal Amount:
			  <br />
			  <input
				type="input"
				className="form-control"
				id="deposit"
				placeholder="$0.00"
				value={withdraw}
				onChange={handleChange}
			  />
			  <br />
			  <button
				type="submit"
				className="btn btn-light"
                bgcolor="danger"
                disabled={buttonStatus}
				onClick={handleWithdraw}
			  >
				Withdraw
			  </button>
			  <br />
			  <br />
			</>
		  )
		}
	  />
	);
  }





    