# Proyecto

Este es un proyecto que utiliza una arquitectura moderna con Django en el backend y un frontend separado. El proyecto está configurado para ejecutarse en contenedores Docker para facilitar el desarrollo y despliegue.

## Estructura del Proyecto

```
.
├── backend/          # Aplicación Django
├── frontend/         # Frontend de la aplicación
├── .devcontainer/    # Configuración de VS Code Dev Container
├── docker-compose-local.yml  # Configuración de Docker Compose para desarrollo
├── Dockerfile.local  # Dockerfile para el entorno de desarrollo
```

## Requisitos Para Probar

- Docker
- Git

## Configuración del Entorno de Desarrollo

1. Clona el repositorio:
```bash
git clone https://github.com/GenaroVogelius/proyecto
cd proyecto
```


3. Construye y ejecuta los contenedores:
```bash
docker-compose -f docker-compose-local.yml up --build
```


4. Ejecuta el frontend en un navegador:
```bash
cd frontend
npm install
npm run dev
```
## Servicios Disponibles

- **Backend (Django)**: http://localhost:8000
- **Daphne (WebSocket)**: http://localhost:8001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## Comandos Útiles


- Detener los servicios:
```bash
docker-compose -f docker-compose-local.yml down
```

- Ver logs:
```bash
docker-compose -f docker-compose-local.yml logs -f
```


## Desarrollo

El proyecto está configurado con hot-reload, por lo que los cambios en el código se reflejarán automáticamente en los contenedores.

### Backend

El backend está basado en Django y se ejecuta en el puerto 8000. Los cambios en el código Python se reflejarán automáticamente gracias al servidor de desarrollo de Django.

### Frontend

El frontend se encuentra en el directorio `frontend/` y está configurado para trabajar con el backend a través de la API.

## Base de Datos

La base de datos PostgreSQL persiste los datos en el directorio `postgres_data/`. Los datos se mantienen entre reinicios de los contenedores.

## Redis

Redis se utiliza como caché y para manejar sesiones. Se ejecuta en el puerto 6379.


