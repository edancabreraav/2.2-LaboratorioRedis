# Sobre el archivo

Archivo con información sobre el modelado de la base de datos y la utilización de url endpoints de acuerdo a lo solicitado por las Querys 1 a 6.

# Modelado de la base de datos

### Productos (HASH)

**Llave**

`SUCURSAL:*idSucursal*:PRODUCTO:*idProducto*`

**Valor**

`nombre *nombre* precio *precio* categoria *categoría* datosAdicionales *inormación*`

**Ejemplo**

```docker
HSET SUCURSAL:1000:PRODUCTO:100 nombre "Cemento Portland" precio 150 categoria "Material de construcción" datosAdicionales "Resistencia a la compresión"
```

### Clientes (SET, conjunto)

**Llave**

`CLIENTES`

**Valor**

`"cliente:RFC*rfc:*nombre:*nombre*"`

**Ejemplo**

```docker
SADD CLIENTES "cliente:RFC00000:nombre:'Construcciones Pérez S.A. de C.V.'"
```

### **Ventas (HASH)**

Para el caso de la venta se pensó en crear dos hash al momento de realizar una venta, uno que contiene los datos del cliente, el total de la venta y la fecha de la venta, el otro que contiene los productos de la venta (id del producto, nombre del producto, cantidad de piezas compradas, total de ese producto)

**Llave**

`SUCURSAL:*idSucursal:*VENTA:*#Venta*`

**Valor**

`cliente '*datosCliente*' total *precioTotal* fecha *fecha*` 

**Llave**

`SUCURSAL:idSucursal:VENTA:*#Venta:*PRODUCTOS`

**Valor**

`idProducto "nombreProducto, valorUnitario, totalPorducto"`

**Ejemplo**

```docker
#Se realizó una venta
HSET SUCURSAL:1000:VENTA:001 cliente "00000, Construcciones Pérez S.A. de C.V." total 13500 fecha "2024-09-24"
HSET SUCURSAL:1000:VENTA:001:PRODUCTOS 101 "Tabique rojo recocido, 1000, 6000" 104 "Mortero, 100, 7500"
```

### Sucursales (Geospatial y String)

Para añadir una sucursal, añadimos sus datos geográficos y también un String con la información de la sucursal

GEOSPATIAL

**Llave**

`SUCURSAL*:*UBICACION`

**Valor**

`*longitud latitud "nombreSucursal"*`

STRING

**Llave**

`SUCURSAL:*idSucursal:*INFO`

**Valor**

`'{"id":*idSucursal*, "nombre":"*nombre*", "telefono":"teléfono", "dirección": "dirección", "longitud": *longitud*, "latitud": *latitud*}'`

**Ejemplo**

```docker
GEOADD SUCURSAL:UBICACION -104.89709233215308 21.50563520844721 "Tornillin Centro"
SET SUCURSAL:1000:INFO '{"id":1000, "nombre":"Tornillin Centro", "telefono":"3111234567", "dirección": "Durango Sur 187", "longitud": -104.89709233215308, "latitud": 21.50563520844721}'
```

### Sucursal-Clientes (SET, conjunto)

**Llave**

`SUCURSAL:*#Sucursal:*CLIENTES`

**Valor**

`"cliente:*rfc:*nombre:'*nombre'*"`

**Ejemplo**

```docker
SADD SUCURSAL:1000:CLIENTES "00000, Construcciones Perez S.A. de C.V."
SADD SUCURSAL:1000:CLIENTES "11111, Juan Garcia"
```

# Estructura de los endpoints

### Q1. Obtener los detalles de un producto dado su ID

GET `/products/*idSucursal/*product/*idProducto*`

**Ejemplo**

```docker
GET http://localhost:3000/products/1000/product/100
```

### Q2. Añadir un nuevo cliente al conjunto de clientes de una sucursal y verificar que no exista previamente

POST `/client/add`

**Ejemplo**

```docker
POST http//:3000/client/add
#body:
{
    "rfc": "22222",
    "nombre": "Ferreteria El Tornillo",
    "sucursalId": "1000"
}
```

### Q3. Registrar una venta para un cliente en específico

POST `/sale/add`

**Ejemplo**

```docker
POST http://localhost:3000/sale/add
#body
{
    "sucursalId": "1004",
    "ventaId": "004",
    "cliente": "Edson Cabrera",
    "rfc": "RFC12345",
    "total": 875,
    "fecha": "2024-09-24",
    "productos": {
        "101": "Tabique rojo recocido, 100, 600",
        "103": "Tubo de PVC, 5, 275"
    }
}
```

### Q4. Buscar sucursales cercanas a una ubicación geográfica específica usando consultas geoespaciales

GET `/branch/*longitud*/*latitud*/*radio*`

**Ejemplo**

```docker
GET http://localhost:3000/branch/-104.88556612586837/21.525108866523528/5
```

### Q5. Obtener el conjunto de clientes que han comprado en una sucursal específica

GET `/client/sucursal/1000/clientes`

**Ejemplo**

```docker
GET http://localhost:3000/client/sucursal/1000/clientes
```

### Q6. Registros histórico de los clientes que han hecho compras en cada sucursal

GET `/client/sucursal/1000/clientes`

**Ejemplo**

```docker
GET http://localhost:3000/client/sucursal/1000/clientes
```
