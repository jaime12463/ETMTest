const obtenerJsonConHash = require("./transformacionJson.js");

let datos = JSON.parse(`{
    "clientes": [
        {
            "codigoCliente": 120104325,
            "detalles": {
                "nombreComercial": "CREM LA MORENITA"
            },
            "visitasPlanificadas": [
                {
                    "dia": "2021-06-08",
                    "secuencia": 3
                },
                {
                    "dia": "2021-06-17",
                    "secuencia": 5
                }
            ],
            "fechasEntrega": [
                {
                    "fechaVisita": "2021-06-09",
                    "fechaEntrega": "2021-06-10"
                },
                {
                    "fechaVisita": "2021-06-10",
                    "fechaEntrega": "2021-06-11"
                },
                {
                    "fechaVisita": "2021-06-17",
                    "fechaEntrega": "2021-06-18"
                }
            ],
            "configuracionPedido": {
                "montoVentaMinima": 1000,
                "cantidadMaximaUnidades": 999
            },
            "portafolio": [
                {
                    "codigoProducto": 1860,
                    "esVentaSubunidades": true,
                    "precios": [
                        {
                            "precioConImpuestoUnidad": 106,
                            "precioConImpuestoSubunidad": 8.84,
                            "vigenciaInicioPrecio": "2017-09-07",
                            "vigenciaFinPrecio": "2017-09-31"
                        },
                        {
                            "precioConImpuestoUnidad": 105,
                            "precioConImpuestoSubunidad": 8.75,
                            "vigenciaInicioPrecio": "2017-10-01",
                            "vigenciaFinPrecio": "2021-06-18"
                        }
                    ]
                }
            ]
        },
        {
            "codigoCliente": 234,
            "detalles": {
                "nombreComercial": "LA LUPITA"
            },
            "visitasPlanificadas": [
                {
					"dia": "2017-09-08",
					"secuencia": "15"
                },
                {
					"dia": "2017-09-10",
					"secuencia": "5"
                }
            ],
            "fechasEntrega": [
				{
					"fechaVisita": "2017-09-06",
					"fechaEntrega": "2017-09-07"
				},
				{
					"fechaVisita": "2017-09-08",
					"fechaEntrega": "2017-09-09"
				}
            ],
            "configuracionPedido": {
                "montoVentaMinima": 1000,
                "cantidadMaximaUnidades": 999
            },
            "portafolio": [
                {
                    "codigoProducto": 1860,
                    "esVentaSubunidades": true,
                    "precios": [
                        {
                            "precioConImpuestoUnidad": 106,
                            "precioConImpuestoSubunidad": 8.84,
                            "vigenciaInicioPrecio": "2017-09-07",
                            "vigenciaFinPrecio": "2017-09-31"
                        },
                        {
                            "precioConImpuestoUnidad": 105,
                            "precioConImpuestoSubunidad": 8.75,
                            "vigenciaInicioPrecio": "2017-10-01",
                            "vigenciaFinPrecio": "9999-12-31"
                        }
                    ]
                }
            ]
        }		
    ],
    "productos": [
        {
            "codigoProducto": 1860,
            "nombre": "YOLI LIMON BOT 600L NR 12PK",
            "presentación": 12
        },
        {
            "codigoProducto": 1885,
            "nombre": "YOLI LIMON BOT 900 NR 12PK",
            "presentación": 12
        }
    ]
}`)

let jsonConHash = `{"clientes":{"234":{"codigoCliente":234,"detalles":{"nombreComercial":"LA LUPITA"},"visitasPlanificadas":[{"dia":"2017-09-08","secuencia":"15"},{"dia":"2017-09-10","secuencia":"5"}],"fechasEntrega":[{"fechaVisita":"2017-09-06","fechaEntrega":"2017-09-07"},{"fechaVisita":"2017-09-08","fechaEntrega":"2017-09-09"}],"configuracionPedido":{"montoVentaMinima":1000,"cantidadMaximaUnidades":999},"portafolio":[{"codigoProducto":1860,"esVentaSubunidades":true,"precios":[{"precioConImpuestoUnidad":106,"precioConImpuestoSubunidad":8.84,"vigenciaInicioPrecio":"2017-09-07","vigenciaFinPrecio":"2017-09-31"},{"precioConImpuestoUnidad":105,"precioConImpuestoSubunidad":8.75,"vigenciaInicioPrecio":"2017-10-01","vigenciaFinPrecio":"9999-12-31"}]}]},"120104325":{"codigoCliente":120104325,"detalles":{"nombreComercial":"CREM LA MORENITA"},"visitasPlanificadas":[{"dia":"2021-06-08","secuencia":3},{"dia":"2021-06-17","secuencia":5}],"fechasEntrega":[{"fechaVisita":"2021-06-09","fechaEntrega":"2021-06-10"},{"fechaVisita":"2021-06-10","fechaEntrega":"2021-06-11"},{"fechaVisita":"2021-06-17","fechaEntrega":"2021-06-18"}],"configuracionPedido":{"montoVentaMinima":1000,"cantidadMaximaUnidades":999},"portafolio":[{"codigoProducto":1860,"esVentaSubunidades":true,"precios":[{"precioConImpuestoUnidad":106,"precioConImpuestoSubunidad":8.84,"vigenciaInicioPrecio":"2017-09-07","vigenciaFinPrecio":"2017-09-31"},{"precioConImpuestoUnidad":105,"precioConImpuestoSubunidad":8.75,"vigenciaInicioPrecio":"2017-10-01","vigenciaFinPrecio":"2021-06-18"}]}]}},"productos":{"1860":{"codigoProducto":1860,"nombre":"YOLI LIMON BOT 600L NR 12PK","presentación":12},"1885":{"codigoProducto":1885,"nombre":"YOLI LIMON BOT 900 NR 12PK","presentación":12}}}`

test('comparacion json', () => {
    expect(JSON.stringify(obtenerJsonConHash.obtenerJsonConHash(datos))).toBe(jsonConHash);
  });
