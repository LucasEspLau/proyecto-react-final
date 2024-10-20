import { useEffect, useState } from "react";
import { CardProducto } from "../../components/Catalogo/CardProducto";
import { useSelector } from "react-redux";
import { Producto } from "../../util/definitions";
import { UserState } from "../../redux/slices/userSlice";


export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>();

  const getProductos=()=>{
    fetch("https://servidor-2-uok1.onrender.com/api/products")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }
  // Fetch de productos cuando se monta el componente
  useEffect(() => {
    getProductos()
  }, []);


  
  function actualizarLista(productId: number) {
    setProductos((prev: Producto[] | undefined) => {
      if (prev === undefined) {
        return []; // Si el estado es undefined, retorna un array vacío o lo que tenga sentido para tu caso
      }
      return prev.filter((prod) => prod.id !== productId);
    });
  }
  
  const user = useSelector((state:{user:UserState}) => state.user);
  console.log(user)
  return (
    <main style={{ minHeight: "80vh", padding: "20px" }}>
      <h1 style={{ margin: "0 0 20px 0", textAlign: "center" }}>
        Catálogo de Productos
      </h1>
    
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {productos && productos.map((producto) => (
          <CardProducto key={producto.id} producto={producto} actualizarLista={actualizarLista} obtenerProductos={getProductos}/>
        ))}
      </div>
    </main>
  );
}
