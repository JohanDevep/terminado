import React, { useEffect, useState } from "react";

const TablaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const establishmentId = localStorage.getItem("establishmentId");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3099/api/v1/establecimiento/${establishmentId}/clientes`
        );
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        const data = await response.json();
        setClientes(data.clientes);
      } catch (error) {
        console.error("Error al obtener clientes:", error.message);
      }
    };

    if (establishmentId) {
      fetchClientes();
    }
  }, [establishmentId]);

  const handleEliminarCliente = async (id) => {
    try {
      const response = await fetch(`http://localhost:3099/api/v1/establecimiento/clientes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar cliente');
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const headerCellStyle = {
    backgroundColor: "#f2f2f2",
    color: "#333",
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const cellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  };

  const buttonStyle = {
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const evenRowStyle = {
    backgroundColor: "#f9f9f9",
  };

  const hoverRowStyle = {
    backgroundColor: "#f1f1f1",
  };

  return (
    <div>
      <h1>Clientes por Establecimiento</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Usuario</th>
            <th style={headerCellStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={cliente._id} style={index % 2 === 0 ? evenRowStyle : {}}>
              <td style={cellStyle}>{cliente.usuario}</td>
              <td style={cellStyle}>
                <button style={buttonStyle} onClick={() => handleEliminarCliente(cliente._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaClientes;
