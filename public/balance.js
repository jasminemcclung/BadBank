
function Balance(props) {
    const [show, setShow] = React.useState(true)
    const [status, setStatus] = React.useState('')
    const [balance, setBalance] = React.useState('')
  
  
    return (
      <Card
        bgcolor='dark'
        header='Balance'
        status={status}
        body={
          show ? (
            <>
              <BalanceForm
                user={props.user}
                setShow={setShow}
                setStatus={setStatus}
                setBalance={setBalance}
              />
            </>
          ) : (
            <>
              {' '}
              <BalanceMsg setShow={setShow} setStatus={setStatus} />
              <h5>Your Current Balance is ${balance}</h5>
            </>
          )
        }
      />
    )
  }
  
  function BalanceMsg(props) {
    return (
      <>
        <h5>Success</h5>
        <button
          type='submit'
          className='btn btn-light'
          onClick={() => {
            props.setShow(true)
            props.setStatus('')
          }}
        >
          Check balance again
        </button>
      </>
    )
  }
  
  function BalanceForm(props) {
    // const [email, setEmail]   = React.useState('');
  
    function handle() {
      fetch(`/account/findOne/${props.user.email}`)
        .then(response => response.text())
        .then(text => {
          try {
            const data = JSON.parse(text)
            props.setStatus(data.balance)
            props.setShow(false)
            props.setBalance(data.balance)
            console.log('JSON:', data)
          } catch (err) {
            props.setStatus(text)
            console.log('err:', text)
          }
        })
    }
  
    //tried changing email to user. I think I need to adapt to non form so no input. How????
  
    return (
      <>
        User
        <br />
        <p>{props.user.email}</p>
        <button type='submit' className='btn btn-light' onClick={handle}>
          Check Balance
        </button>
      </>
    )
  }