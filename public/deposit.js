function Deposit() {
  const ctx = React.useContext(UserContext); 
  const [status, setStatus]     = React.useState(true);

  function depositAmount() {
      if (ctx.user!=='') { 
      setStatus(`$${ctx.balance} deposit successful!`);
      setTimeout(() => setStatus(''),2000);

      ctx.balance.toString();
      const url = `/account/deposit/${ctx.user}/${ctx.balance}`;
      (async () => {
          var res = await fetch(url);
          var data = await res.json();
          console.log(data);
      })();
      } else {
          setStatus('Login to make a deposit');
          setTimeout(() => setStatus(''),3000);
      }
  }

  return (
      <Card
          bgcolor="dark"
          header="Deposit"
          text=""
          status={status}
          body={
              <>
              <CardForm
                  showName="none"
                  showPassword="none"
                  showEmail="none"
              />
              {<button type="submit" className="btn btn-light" onClick={depositAmount}>Deposit</button>}
              </>
          }
      />
  )
}