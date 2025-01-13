# Proyectos de Microservicios: Estudiantes y Cursos

Este repositorio contiene dos microservicios: **Estudiantes** y **Cursos**, implementados con Spring Boot y utilizando MySQL como base de datos. A continuación, se describen los pasos para construir y ejecutar estos proyectos.

---

## Requisitos previos

Antes de ejecutar los proyectos, asegúrate de tener instalados:

- **Java Development Kit (JDK)** 17 o superior
- **Apache Maven** 3.8 o superior
- **Docker** y **Docker Compose**

---

## Configuración inicial

1. **Clona este repositorio** en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio


## Generar los archivos JAR

1. Generar los archivos JAR
Primero, genera los archivos JAR para cada microservicio.

    Proyecto Estudiantes:
    bash
    Copiar código
    cd estudiantes
    mvn clean package -DskipTests
    cd ..


    Proyecto Cursos:
    bash
    Copiar código
    cd cursos
    mvn clean package -DskipTests
    cd ..
    Nota: Si deseas ejecutar las pruebas, elimina la opción -DskipTests.



Aquí tienes el archivo completo README.md listo para usar:

markdown
Copiar código
# Proyectos de Microservicios: Estudiantes y Cursos

Este repositorio contiene dos microservicios: **Estudiantes** y **Cursos**, implementados con Spring Boot y utilizando MySQL como base de datos. A continuación, se describen los pasos para construir y ejecutar estos proyectos.

---

## Requisitos previos

Antes de ejecutar los proyectos, asegúrate de tener instalados:

- **Java Development Kit (JDK)** 17 o superior
- **Apache Maven** 3.8 o superior
- **Docker** y **Docker Compose**

---

## Configuración inicial

1. **Clona este repositorio** en tu máquina local:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
Estructura del proyecto:
css
Copiar código
.
├── estudiantes/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
├── cursos/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
├── docker-compose.yml
└── README.md
Construcción y ejecución
1. Generar los archivos JAR
Primero, genera los archivos JAR para cada microservicio.

Proyecto Estudiantes:


cd estudiantes
mvn clean package -DskipTests
cd ..


Proyecto Cursos:

cd cursos
mvn clean package -DskipTests
cd ..

Nota: Si deseas ejecutar las pruebas, elimina la opción -DskipTests.


2. Construir las imágenes Docker
Desde el directorio raíz del proyecto, ejecuta:

    docker-compose build


3. Levantar los contenedores
Ejecuta el siguiente comando para iniciar los servicios:

    docker-compose up


5. Acceso a los servicios
    Microservicio Estudiantes:

    URL base: http://localhost:8003
    Endpoints de ejemplo:
    GET /estudiantes
    POST /estudiantes

    Microservicio Cursos:

    URL base: http://localhost:8004
    Endpoints de ejemplo:
    GET /cursos
    POST /cursos
