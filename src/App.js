import Header from "./components/Header";

function App() {



  const onAdd = () => {
    console.log("clicked");
  }

  return (
    <div className = "container">
        <Header title = "Your tasks" onClick = {onAdd}/>
    </div>
  );
}

export default App;
