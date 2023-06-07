CREATE DATABASE database_it;
create table users
(
    id         bigserial               not null
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    name       varchar                 not null,
    status     boolean                 not null,
    email      varchar                 not null,
    password   varchar                 not null,
    cpf        varchar                 not null,
    date_birth date                    not null,
    profile    integer                 not null,
    gender     varchar                 not null,
    avatar_src varchar,
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

INSERT INTO users (id, name, status, email, password, cpf, date_birth, profile, gender, avatar_src, created_at, updated_at) VALUES (1, 'Admin', true, 'admin@email.com', '$2b$10$DwLhSjC32I.urSHMpMDYdeEoJ/C3bXvfiGUXwaLMZqfu3NFt/TLra', '702.721.454-75', '2000-05-09', 1, '1', 'file-1685370301254-282844283', '2023-05-29 08:25:01.228000', '2023-05-29 08:25:01.228000');