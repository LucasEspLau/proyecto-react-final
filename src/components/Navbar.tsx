import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserState } from "../redux/slices/userSlice";
import { logout } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

export default function Navbar() {
    const dispatch = useDispatch(); 

    const user = useSelector((state:{user:UserState}) => state.user);


    return (
        <nav className="min-h-[10vh] max-h-[10vh] flex flex-row justify-between items-center bg-white px-6 shadow-md">
            <Link to="/" className="text-2xl font-bold text-black hover:text-blue-700 transition-colors">
                Inicio
            </Link>
            <ul className="flex flex-row gap-6">
                <li>
                    <Link
                        to="/crear-producto"
                        className="text-lg text-blue-500 hover:text-blue-600 transition-colors"
                    >
                        Crear Producto
                    </Link>
                </li>
                <li>
                    <Link
                        to="/catalogo"
                        className="text-lg text-blue-500 hover:text-blue-600 transition-colors"
                    >
                        Catálogo
                    </Link>
                </li>
    
                {
                    user.isLoggedIn ? (
                        <li>

                            <Link
                                to={"/"}
                                className="text-lg text-blue-500 hover:text-blue-600 transition-colors"
                                onClick={()=>dispatch(logout())}
                                >
                                Cerrar Sesión
                            </Link>
                        </li>

                    ) : (
                        <>
                        <li>
                            <Link
                                to="/registrarse"
                                className="text-lg text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                Registrarse
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="text-lg text-blue-500 hover:text-blue-600 transition-colors"
                            >
                                Iniciar Sesión
                            </Link>

                        </li>

                        </>

                    )
                }


            </ul>
        </nav>
    );
}
