import Auth from "./components/Auth";
import Header from "./components/Header";

function App() {



  const onAdd = () => {
    console.log("clicked");
  }

  return (
    <div className = "container">
        {/* <Header title = "Your tasks" onClick = {onAdd}/> */}

        <Auth />
    </div>
  );
}

export default App;
