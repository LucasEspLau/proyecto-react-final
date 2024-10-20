import { useState } from 'react';
import { Producto } from '../../util/definitions';

export function CardProducto({ producto, actualizarLista,obtenerProductos }:{producto:Producto,actualizarLista:any,obtenerProductos:any}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoEdit, setProductoEdit] = useState<Producto | null>(null);

    // Eliminar un producto
    const handleDeleteProducto = (productId:number) => {
        console.log("PRODUCTO ID ", productId);
        fetch(`https://servidor-2-uok1.onrender.com/api/products/${productId}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                actualizarLista(productId);
            } else {
                console.error('Error al eliminar el producto');
            }
        })
        .catch((error) => console.error('Error al eliminar el producto:', error));
    };

    // Abrir la modal y pasar los datos del producto
    const handleEditProducto = (producto:Producto) => {
        setProductoEdit(producto); // Setea el producto que vas a editar
        setIsModalOpen(true);      // Abre la modal

    };

    return (
        <div className='border border-1 text-center p-4 rounded-xl min-w-[30vh] m-2' style={{boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                {producto.nombre}
            </h2>

            <p style={{ fontSize: '16px', color: '#888', marginBottom: '4px' }}>
                Precio: S/{producto.precio}
            </p>

            <p style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
                {producto.descripcion}
            </p>

            <p style={{ fontSize: '14px', color: producto.stock > 0 ? '#28a745' : '#dc3545', marginBottom: '8px' }}>
                {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Sin stock'}
            </p>
            <div className='flex justify-center'>
                <img width={100} src={producto.img} alt={producto.nombre} style={{ borderRadius: '4px', objectFit: 'cover' }} />
            </div>
            
            <div className="flex flex-row justify-between">
                <button onClick={() => handleDeleteProducto(producto.id)}>Eliminar</button>
                <button onClick={() => handleEditProducto(producto)}>Editar</button>
            </div>

            {isModalOpen && productoEdit && (
                <ModalEdit 
                    producto={productoEdit} 
                    closeModal={() => setIsModalOpen(false)} 
                    actualizarLista={actualizarLista}
                    obtenerProductos={obtenerProductos}
                />
            )}
        </div>
    );
}

function ModalEdit({ producto, closeModal, actualizarLista,obtenerProductos }:{producto:Producto,closeModal:any,actualizarLista:any,obtenerProductos:any}) {
    const [formData, setFormData] = useState({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        img: producto.img,
        precio: producto.precio,
        stock: producto.stock,
    });

    // Manejar el cambio en los campos del formulario
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Actualizar el producto
    const handleUpdateProduct = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Aquí puedes realizar la lógica de actualización del producto.
        fetch(`https://servidor-2-uok1.onrender.com/api/products/${producto.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((updatedProduct) => {
            actualizarLista(updatedProduct);
            obtenerProductos()
            closeModal();  // Cerrar la modal después de actualizar
        })
        .catch((error) => console.error('Error al actualizar el producto:', error));
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <form className="flex flex-col gap-4" onSubmit={handleUpdateProduct}>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre del producto"
                        className="p-3 border border-blue-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción del producto"
                        className="p-3 border border-blue-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleInputChange}
                        placeholder="URL de la imagen"
                        className="p-3 border border-blue-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        placeholder="Precio del producto"
                        className="p-3 border border-blue-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="Stock del producto"
                        className="p-3 border border-blue-300 rounded-lg focus:ring focus:ring-blue-200"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Actualizar Producto
                    </button>
                    <button 
                        type="button" 
                        className="p-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-colors"
                        onClick={closeModal}
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}
