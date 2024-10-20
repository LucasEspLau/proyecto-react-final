import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo/Catalogo';
import CrearProducto from './pages/Catalogo/Crear';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Footer from './components/Footer';

function App() {


  return (
    <Router>
      <>
      <Navbar/>

      <Routes>

        <Route path='/' element={<Inicio/>}/>
        <Route path='/catalogo' element={<Catalogo/>}/>
        <Route path='/crear-producto' element={<CrearProducto/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registrarse' element={<Registro/>}/>


      </Routes>
      <Footer/>

      </>
    </Router>
  );
}

export default App
