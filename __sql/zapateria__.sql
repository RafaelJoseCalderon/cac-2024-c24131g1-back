DROP TABLE IF EXISTS Facturas_Productos;
DROP TABLE IF EXISTS Facturas;
DROP TABLE IF EXISTS Productos;
DROP TABLE IF EXISTS Usuarios;
DROP TABLE IF EXISTS Categorias;


-- tablas
CREATE TABLE Usuarios
(
  id           BIGINT           NOT NULL AUTO_INCREMENT,
  nombre       VARCHAR(255)     NOT NULL               ,
  apellido     VARCHAR(255)     NOT NULL               ,
  contrasenia  VARCHAR(255)     NOT NULL               ,
  email        VARCHAR(255)     NULL                   ,
  imagen       VARCHAR(255)     NULL                   ,
  PRIMARY KEY (id)
);


CREATE TABLE Facturas
(
  id           BIGINT           NOT NULL AUTO_INCREMENT,
  id_usuario   BIGINT           NOT NULL               ,
  monto        DOUBLE PRECISION NOT NULL               ,
  fecha        DATE             NOT NULL               ,
  PRIMARY KEY (id)
);


CREATE TABLE Productos
(
  id           BIGINT           NOT NULL AUTO_INCREMENT,
  id_categoria BIGINT           NULL                   ,
  nombre       VARCHAR(255)     NOT NULL               ,
  precio       DOUBLE PRECISION NOT NULL               ,
  stock        INT              NOT NULL               ,
  estado       VARCHAR(64)      NOT NULL               ,
  imagen       VARCHAR(255)     NULL                   ,
  PRIMARY KEY (id)
);


CREATE TABLE Categorias
(
  id           BIGINT           NOT NULL AUTO_INCREMENT,
  nombre       VARCHAR(255)     NOT NULL               ,
  descripcion  VARCHAR(255)     NULL                   ,
  PRIMARY KEY (id)
);


CREATE TABLE Facturas_Productos
(
  id_factura   BIGINT           NOT NULL               ,
  id_producto  BIGINT           NOT NULL
);


-- restricciones
ALTER TABLE Facturas
  ADD CONSTRAINT FK_Usuarios_TO_Facturas
    FOREIGN KEY (id_usuario)
    REFERENCES Usuarios (id);


ALTER TABLE Facturas_Productos
  ADD CONSTRAINT FK_Facturas_TO_Facturas_Productos
    FOREIGN KEY (id_factura)
    REFERENCES Facturas (id);


ALTER TABLE Facturas_Productos
  ADD CONSTRAINT FK_Productos_TO_Facturas_Productos
    FOREIGN KEY (id_producto)
    REFERENCES Productos (id);


ALTER TABLE Productos
  ADD CONSTRAINT FK_Categoria_TO_Productos
    FOREIGN KEY (id_categoria)
    REFERENCES Categorias (id);


-- datos 
INSERT INTO Usuarios -- todos las contrasenia son 123
  (id,      nombre,   apellido,                                                    contrasenia,                 email, imagen) VALUES
  ( 1,      "Adan", "AdanAdan", "$2a$08$kzuSqKwbAeNwBVTGRoON3O175t7ANZIcdB3UZ7ortMLGtTrmXyL4S",      "adan@email.com",     ""),
  ( 2,       "Eva",   "EvaEva", "$2a$08$TZ/T5f.QWpdC/J/H3/lasu6UsLwNlFeM7bQQGSYfCq.jULBLh6f52",       "eva@email.com",     ""),
  ( 3, "Bonifacio",    "Gomez", "$2a$08$52Z/Qxy.hV1/rTl1o/WbBuQDOKnwHdOYEI/wrJFO1inDo5Yo.aHae", "bonifacio@email.com",     ""),
  ( 4,  "Clemente",    "Lopez", "$2a$08$eonwczfMchMquiKJKRUGTOJr6QZR.qkmCtmQPDodAiqf32UEKPjx6",  "clemente@email.com",     ""),
  ( 5,  "Dalmacio", "Martinez", "$2a$08$79VU74UMI0D750g1YdCcZ.kyo6eYzqWHIZZziEKK7DyH9NO01fKVi",  "dalmacio@email.com",     ""),
  ( 6,  "Emeterio",   "Garcia", "$2a$08$h4HEhPOunQkyiULPyLVPruYkf8hYKnxmLfHxTT9lfbht8haMq8zp.",  "emeterio@email.com",     ""),
  ( 7,   "Taciana",   "Moyano", "$2a$08$o1qiWG5Qnkgn.IoNqgAjjuVl.5OTux4Tdo2fmvOhk3WDI5G6VyBEa",   "taciana@email.com",     ""),
  ( 8,    "Ursula",   "Campos", "$2a$08$KnhvgwzuFjpmMConvrMpJuT.TsM8ZJTc9IIIr4E.3HSy7ci88pmQG",    "ursula@email.com",     ""),
  ( 9, "Valentina",     "Soto", "$2a$08$6vzoaUkSrMgZHagNQDpkYOkNr/FY/1rjZBgY.Prn5as/cNjwjaiiS", "valentina@email.com",     ""),
  (10,  "Zeferina",   "Chávez", "$2a$08$Tp12mtLLl2Hpfjx1Qrx12egO2p3VxHlaINyifTYPzlHE7GoQ5VpHa",  "zeferina@email.com",     "");


INSERT INTO Categorias
  (id,       nombre,                      descripcion) VALUES
  ( 1,     "ninios", "categoria ninios y adolecentes"),
  ( 2,      "damas",                "categoria damas"),
  ( 3, "caballeros",           "categoria caballeros");


INSERT INTO Productos
  (id, id_categoria,          nombre,  precio, stock,     estado,     imagen) VALUES
  ( 1,            1, "producto_0001", 50140.0,   100, "EN_VENTA", "0001.png"),
  ( 2,            1, "producto_0002", 88382.0,   100, "EN_VENTA", "0002.png"),
  ( 3,            1, "producto_0003", 98366.0,   100, "EN_VENTA", "0003.png"),
  ( 4,            1, "producto_0004", 61040.0,   100, "EN_VENTA", "0004.png"),
  ( 5,            1, "producto_0005", 67090.0,   100, "EN_VENTA", "0005.png"),
  ( 6,            1, "producto_0006", 59528.0,   100, "EN_VENTA", "0006.png"),
  ( 7,            1, "producto_0007", 67532.0,   100, "EN_VENTA", "0007.png"),
  ( 8,            1, "producto_0008", 51553.0,   100, "EN_VENTA", "0008.png"),
  ( 9,            1, "producto_0009", 92907.0,   100, "EN_VENTA", "0009.png"),
  (10,            1, "producto_0010", 78896.0,   100, "EN_VENTA", "0010.png"),
  (11,            1, "producto_0011", 61203.0,   100, "EN_VENTA", "0011.png"),
  (12,            1, "producto_0012", 65273.0,   100, "EN_VENTA", "0012.png"),
  (13,            1, "producto_0013", 56861.0,   100, "EN_VENTA", "0013.png"),
  (14,            1, "producto_0014", 99858.0,   100, "EN_VENTA", "0014.png"),
  (15,            2, "producto_0015", 64961.0,   100, "EN_VENTA", "0015.png"),
  (16,            2, "producto_0016", 50064.0,   100, "EN_VENTA", "0016.png"),
  (17,            2, "producto_0017", 53670.0,   100, "EN_VENTA", "0017.png"),
  (18,            2, "producto_0018", 52193.0,   100, "EN_VENTA", "0018.png"),
  (19,            2, "producto_0019", 56115.0,   100, "EN_VENTA", "0019.png"),
  (20,            2, "producto_0020", 73601.0,   100, "EN_VENTA", "0020.png"),
  (21,            2, "producto_0021", 51845.0,   100, "EN_VENTA", "0021.png"),
  (22,            3, "producto_0022", 77822.0,   100, "EN_VENTA", "0022.png"),
  (23,            3, "producto_0023", 65793.0,   100, "EN_VENTA", "0023.png"),
  (24,            3, "producto_0024", 63715.0,   100, "EN_VENTA", "0024.png"),
  (25,            3, "producto_0025", 75263.0,   100, "EN_VENTA", "0025.png"),
  (26,            3, "producto_0026", 60620.0,   100, "EN_VENTA", "0026.png"),
  (27,            3, "producto_0027", 74471.0,   100, "EN_VENTA", "0027.png"),
  (28,            3, "producto_0028", 52555.0,   100, "EN_VENTA", "0028.png"),
  (29,            3, "producto_0029", 87606.0,   100, "EN_VENTA", "0029.png"),
  (30,            3, "producto_0030", 95330.0,   100, "EN_VENTA", "0030.png"),
  (31,            3, "producto_0031", 88977.0,   100, "EN_VENTA", "0031.png");


INSERT INTO Facturas
  (id, id_usuario,    monto,        fecha) VALUES
  ( 1,          8, 377373.0, "2024-02-17"),
  ( 2,          4, 319697.0, "2024-03-03"),
  ( 3,          7, 292156.0, "2024-04-21"),
  ( 4,          5, 390221.0, "2024-05-09"),
  ( 5,          9, 349579.0, "2024-06-26");


INSERT INTO Facturas_Productos
  (id_factura, id_producto) VALUES
  (         1,           3),
  (         1,           8),
  (         1,          13),
  (         1,          25),
  (         1,          30),
  (         2,           7),
  (         2,          10),
  (         2,          15),
  (         2,          18),
  (         2,          19),
  (         3,           1),
  (         3,          14),
  (         3,          16),
  (         3,          26),
  (         3,          27),
  (         4,           6),
  (         4,           9),
  (         4,          11),
  (         4,          29),
  (         4,          31),
  (         5,           5),
  (         5,          12),
  (         5,          20),
  (         5,          22),
  (         5,          23);
