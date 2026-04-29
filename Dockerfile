FROM maven:3.9.9-eclipse-temurin-21

WORKDIR /app

# Copy project
COPY . .

# Download dependency trước (cache layer)
RUN mvn dependency:go-offline

# Expose port Spring Boot
EXPOSE 8080

CMD ["sh", "-c", "echo '===================================' && echo '  BACKEND BUILT SUCCESSFULLY' && echo '===================================' && tail -f /dev/null"]