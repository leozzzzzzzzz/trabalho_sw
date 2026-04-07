create table tipos (
   codigo serial not null primary key, 
   nome varchar (20) not null,
   tarifa numeric (10,2) not null
);

create table locais (
   codigo serial not null primary key, 
   nome varchar (20) not null,
   localizacao varchar (20) not null
);

create table veiculos (
   id serial not null primary key, 
   tipo integer not null references tipos (codigo),
   placa varchar (7) not null,
   check (
    placa ~ '^[A-Z]{3}[0-9]{4}$' 
    or 
    placa ~ '^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$'
    ),
   cor varchar (20) not null
);

create table passagens (
   id serial not null primary key, 
   veiculo integer not null references veiculos (id),
   local integer not null references locais (codigo),
   data_hora timestamp not null default current_timestamp,
   valor numeric (10,2) not null,
   pago boolean not null default false
);

create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
   cpf varchar(11) not null,
	telefone varchar(14)  not null, 
	nome varchar(50) not null,
   tipo CHAR(1) not null DEFAULT 'c' CHECK (tipo IN ('c', 'a')) -- comum ou administrador
);
-- mock
-- tipos
INSERT INTO tipos (nome, tarifa) VALUES
('Moto', 5.00), ('Carro', 10.00), ('Caminhão', 25.00);
-- locais
INSERT INTO locais (nome, localizacao) VALUES
('Pedágio Norte', 'SP-330 km 12'),
('Pedágio Sul', 'SP-330 km 87'),
('Posto Leste', 'BR-116 km 45');
-- veiculos
INSERT INTO veiculos (tipo, placa, cor) VALUES
(1, 'ABC1234', 'Preto'),
(2, 'DEF5678', 'Branco'),
(2, 'GHI2B34', 'Prata'),
(3, 'JKL9012', 'Vermelho');
-- passagens
INSERT INTO passagens (veiculo, local, data_hora, valor, pago) VALUES
(1, 1, '2025-03-10 08:15:00', 5.00, true),
(2, 2, '2025-03-10 09:40:00', 10.00, true),
(3, 1, '2025-03-11 14:22:00', 10.00, false),
(4, 3, '2025-03-12 07:05:00', 25.00, false);
-- usuarios
INSERT INTO usuarios (email, senha, cpf, telefone, nome, tipo) VALUES
('admin@via.com', 'admin123', '00000000000', '(11)99999-0000', 'Admin', 'a'),
('joao@email.com', 'senha123', '12345678901', '(11)91234-5678', 'João Silva', 'c'),
('ana@email.com', 'ana2025', '98765432100', '(21)98765-4321', 'Ana Costa', 'c');