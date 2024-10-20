import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";
import { UserSession } from "../../util/definitions";

export default function Login() {
    const dispatch = useDispatch(); 
  const [formData, setFormData] = useState({
    contrasena: "",
    n_doc: ""  
    });
  const [msj, setMsj] = useState("");
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    try {
      const res = await fetch('https://servidor-2-uok1.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Aseguramos que el tipo de contenido sea JSON
        },
        body: JSON.stringify(formData), // Convertimos los datos a formato JSON
      });

      if (res.ok) {
        const datos = await res.json();
        console.log(datos);
        dispatch(login(datos.user  as UserSession))
        setMsj(datos.message);

      } else {
        const errorData = await res.json(); // Intentamos obtener más información del error
        setMsj(`Error: ${errorData.message || "Ocurrió un problema en el servidor."}`);
      }
    } catch (error) {
      setMsj(`Error: ${error}`);
    }
  };

  return (
    <main className="min-h-[80vh] p-20">
      {msj && <h1 style={{ margin: "0 0 20px 0", textAlign: "center" }}>{msj}</h1>}
      <h1 style={{ margin: "0 0 20px 0", textAlign: "center" }}>Login</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">

        <div className="mb-4">
            <label className="block text-gray-700">Número de Documento:</label>
            <input
                type="text"
                name="n_doc"
                value={formData.n_doc}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full"
                required
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </main>
  );
}
