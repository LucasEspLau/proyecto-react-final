import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo/Catalogo';
import CrearProducto from './pages/Catalogo/Crear';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { UserState } from './redux/slices/userSlice';

function App() {

  const user = useSelector((state:{user:UserState}) => state.user);



  return (
    <Router>
      <>
      <Navbar/>

      <Routes>

        {user.isLoggedIn && user.userSession?.t_rol==2&&(
          <>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/catalogo' element={<Catalogo/>}/>
            <Route path='/crear-producto' element={<CrearProducto/>}/>
          </>
        )}
        {user.isLoggedIn && user.userSession?.t_rol==1 && (
          <>
            <Route path='/' element={<Inicio/>}/>
            <Route path='/catalogo' element={<Catalogo/>}/>
          </>
        )}
        <Route path='*' element={<Inicio/>}/>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/catalogo' element={<Catalogo/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/registrarse' element={<Registro/>}/>


      </Routes>
      <Footer/>

      </>
    </Router>
  );
}

export default App
