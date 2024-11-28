# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the argument for the JAR file location
ARG JAR_FILE=target/bazaar-service-registry.jar

# Copy the JAR file to the container
COPY ${JAR_FILE} bazaar-service-registry.jar

# Expose the port for Eureka (default is 8761)
EXPOSE 8761

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "/bazaar-service-registry.jar"]

