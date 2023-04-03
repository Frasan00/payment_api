import "bootstrap/dist/css/bootstrap.css";
import './App.css';

// components import
import { NavBar } from './components/NavBar';
import { ItemList } from "./components/ItemList";

function App() {
  return (
    <div className="Main app">
      <NavBar />
      <br></br>
      <ItemList />
    </div>
  );
}

export default App;
