# Usar una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Crear un directorio de trabajo
WORKDIR /app

# Copiar el archivo JAR del servicio cursos
COPY target/*.jar app.jar

# Exponer el puerto del servicio
EXPOSE 8002

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
