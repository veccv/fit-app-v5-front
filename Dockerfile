# Używamy oficjalnego obrazu Node.js jako bazy
FROM node:21

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /usr/src/app

# Kopiujemy plik package.json i package-lock.json (jeśli istnieje)
COPY package*.json ./

# Instalujemy zależności naszej aplikacji
RUN npm install

# Kopiujemy resztę kodu źródłowego naszej aplikacji
COPY . .

# Nasza aplikacja będzie dostępna na porcie 3000
EXPOSE 3000

# Uruchamiamy aplikację
CMD [ "npm", "start" ]
