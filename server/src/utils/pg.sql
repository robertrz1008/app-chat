-- Active: 1719705734888@@localhost@5432@appChatdb
CREATE TABLE images (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    data BYTEA NOT NULL
);
CREATE TABLE type_chat (
    id SERIAL PRIMARY KEY,
    description VARCHAR(20) NOT NULL
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(45) NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    id_image INT,
    FOREIGN KEY (id_image) REFERENCES images(id)
);

CREATE TABLE chats (
    id SERIAL PRIMARY KEY,
    id_type INT NOT NULL,
    FOREIGN KEY (id_type) REFERENCES type_chat(id)
);

CREATE TABLE users_chat (
    id_user INT NOT NULL,
    id_chat INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_chat) REFERENCES chats(id),
    PRIMARY KEY (id_user, id_chat)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    containe TEXT NOT NULL,
    id_user INT NOT NULL,
    id_chat INT NOT NULL,
    creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_chat) REFERENCES chats(id)
);