# Aplicación de chat

## Descripción
Una aplicacion de Mensajeria a tiempo real, que cuenta con soporte para la creacion de un perfil, y un buscador para buscar a otro usuarios e iniciar una conversaciones. 


## 💻 Tecnologias
* React.js
* Node.js
* PostgreSQL

## ⚙️ Instalación del Proyecto
Para configurar y ejecutar este proyecto en tu entorno de desarrollo:
1. Clona el repositorio:
    ```bash
    git clone https://github.com/robertrz1008/app-chat.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd app-chat
    

##  Configuración del Back End
1. Accede a la carpeta **server**:
```bash
cd server
```
2. Instala las dependencias:
```bash
npm install
```
2. crear una base de datos llamado "appChatdb".

3. En el archivo  **pg.sql** dentro de la carpeta **utils** copiar todo el script y pegarlo en su cliente de postgres, que conformara todas las tabla de la base de datos.

4. Modifica el codigo del archivo **connectiondb.ts** segun la configuracion de gestor de su base de datos postgres.
```ts
import pgSql from "pg"

const connectdb = new pgSql.Pool({
    host: "Localhost",
    user: "postgres",
    port: 5432, 
    password: "****",
    database: "appChatdb",
})

export default connectdb
```

5. Ejecuta el servidor escribiendo en su teminal:
```bash
npm run dev
```
##  Configuración del Front End
1. Accede a la carpeta **client**:
```bash
cd client
```
2. Instala las dependencias:
```bash
npm install
```
3. Ejecuta el cliente escribiendo en su teminal:
```bash
npm run dev
```