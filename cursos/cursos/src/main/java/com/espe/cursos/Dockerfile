# Usar una imagen base de OpenJDK
FROM openjdk:17-jdk-slim

# Crear un directorio de trabajo
WORKDIR /app

# Copiar el JAR específico del servicio cursos
COPY target/cursos-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto correspondiente al servicio
EXPOSE 8002

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
