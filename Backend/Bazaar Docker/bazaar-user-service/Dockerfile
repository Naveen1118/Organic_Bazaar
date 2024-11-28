# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the argument for the JAR file location
ARG JAR_FILE=target/bazaar-user-service.jar

# Copy the JAR file to the container with the same name
COPY ${JAR_FILE} bazaar-user-service.jar

# Expose the port (adjusted if necessary)
EXPOSE 8081

# Command to run the JAR file
ENTRYPOINT ["java", "-jar", "/bazaar-user-service.jar"]

