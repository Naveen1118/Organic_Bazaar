# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the argument for the JAR file location
ARG JAR_FILE=target/bazaar-api-gateway.jar

# Copy the JAR file to the container with the same name
COPY ${JAR_FILE} bazaar-api-gateway.jar

# Expose the port (adjusted for API Gateway service)
EXPOSE 8080

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "/bazaar-api-gateway.jar"]

