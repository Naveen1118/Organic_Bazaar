# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the argument for the JAR file location
ARG JAR_FILE=target/bazaar-order-service.jar

# Copy the JAR file to the container with the same name
COPY ${JAR_FILE} bazaar-order-service.jar

# Expose the port (adjusted for product service)
EXPOSE 8082

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "/bazaar-order-service.jar"]
