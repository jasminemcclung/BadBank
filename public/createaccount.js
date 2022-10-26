function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
      if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

function regName(){
  const reqName = /^[a-zA-Z]+ [a-zA-Z]+$/
if (reqName.test(name)){
  return true;
}
setStatus(`Name must be composed of firstname and lastname`);
return false;
}

function emailFormula() {
 const reqFormula = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
if (reqFormula.test(email)){
  return true;
}
setStatus(`Email must be valid address`);
return false;
}

  function passwordEffective() {
    const minEffective = 10;
    if (password.length >= minEffective) {
        return true;
    }
    setStatus(`Password must contain ${minEffective} characters or more`);
    return false;
}

  function handleCreate(){
    console.log(name,email,password);
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    if (!regName()) return;
    if (!emailFormula()) return;
    if (!passwordEffective()) return;
    ctx.users.push({name,email,password,balance:100});
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="dark"
      header="Create A BadBank Account"
      status={status}
      body={show ? (  
              <>
              Full Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}