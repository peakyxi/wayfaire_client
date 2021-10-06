import MainBlock from './components/mainBlock'
import 'bootstrap/dist/css/bootstrap.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';



function App() {
  return (
    <div className="container">
      <ToastContainer />
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
