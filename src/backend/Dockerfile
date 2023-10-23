FROM openjdk:17
EXPOSE 8080
ADD /target/rentabook-0.0.1-SNAPSHOT.jar rentabook.jar
COPY /src/main/kotlin/br/puc/projeto/rentabook/images /images
ENTRYPOINT ["java","-jar","rentabook.jar"]