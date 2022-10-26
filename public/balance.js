function Balance() {
  const ctx = React.useContext(UserContext); 
  const [data, setData] = React.useState('');
  const [status, setStatus]     = React.useState(true);

  function fetchAccount() {
      if (ctx.user!=='') { 
      fetch(`/account/balance/${ctx.email}`)
      .then(response => response.json())
      .then(data => {
              console.log(data);
              setData('$' + data[0].balance);
      });
      } else {
          setStatus('Login to see account balance');
          setTimeout(() => setStatus(''),3000);
      }
  }

  return (
      <Card
          bgcolor="dark"
          header="Balance"
          text={data}
          status={status}
          body={
              <>
              <CardForm
                  showName="none"
                  showPassword="none"
                  showAmount="none"
                  showEmail="none"              
              />
              {<button type="submit" className="btn btn-light" onClick={fetchAccount}>See Balance</button>}
              </>
          }
      />
  )
}