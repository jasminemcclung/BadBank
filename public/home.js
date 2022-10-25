function Home(){
  return (
    <Card
      txtcolor= "dark"
      bgcolor="light"
      header="Banking Home"
      title="Welcome to the Bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />    
  );  
}
