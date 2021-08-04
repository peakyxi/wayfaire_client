import MainBlock from './components/mainBlock'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';



function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          header
        </div>
      </div>
      <div className="row">
        <div className="col-1">
          Navbar
        </div>
        <div className="col">
          <MainBlock />

        </div>
      </div>
    </div>

  );
}

export default App;
