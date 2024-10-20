import { useState } from "react";

export default function Registro() {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    contrasena: "",
    n_doc: "",
    t_doc: "",
  });
  const [msj, setMsj] = useState("");
  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
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
      const res = await fetch('https://servidor-2-uok1.onrender.com/api/crear-cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Aseguramos que el tipo de contenido sea JSON
        },
        body: JSON.stringify(formData), // Convertimos los datos a formato JSON
      });

      if (res.ok) {
        const datos = await res.json();
        console.log(datos);
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
      <h1 style={{ margin: "0 0 20px 0", textAlign: "center" }}>Registro</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Nombres:</label>
          <input
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Apellidos:</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
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
          <label className="block text-gray-700">Tipo de Documento:</label>
          <select
            name="t_doc"
            value={formData.t_doc}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full"
            required
          >
            <option value="">Seleccione un tipo de documento</option>
            <option value="1">DNI</option>
            <option value="2">Carnet de extranjería</option>
            <option value="3">Pasaporte</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Registrarse
          </button>
        </div>
      </form>
    </main>
  );
}
