# ==============================
# BUILD STAGE
# ==============================
FROM maven:3.9.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom first for dependency caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline

# Copy source code
COPY src ./src

# Build application
RUN mvn clean package -DskipTests


# ==============================
# RUNTIME STAGE
# ==============================
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy built jar
COPY --from=builder /app/target/*.jar ai-startup-platform-0.0.1-SNAPSHOT.jar

# Expose Spring Boot port
EXPOSE 8080

# JVM optimizations for containers
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "ai-startup-platform-0.0.1-SNAPSHOT.jar"]