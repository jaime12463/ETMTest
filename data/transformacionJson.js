  const obtenerJsonConHash = (json) => {
    const clientesHash = transformacionJsonConHash(
      json.clientes,
      "codigoCliente"
    );

    const productosHash = transformacionJsonConHash(
      json.productos,
      "codigoProducto"
    );

    let jsonFinal = JSON.parse(`{"clientes":${clientesHash}, "productos":${productosHash}}`)
    return jsonFinal
  }

  const transformacionJsonConHash = (array, elementoHash) => {
    const objeto = array.reduce(
      (acumulado, elemento) => ({
        ...acumulado,
        [elemento[elementoHash]]: elemento
      }),
      {}
    );
    return JSON.stringify(objeto);
  };

  exports.obtenerJsonConHash = obtenerJsonConHash
