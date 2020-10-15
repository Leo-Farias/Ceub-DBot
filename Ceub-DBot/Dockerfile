FROM debian:buster

# Configuracao de ambiente
RUN apt update && apt upgrade -y
RUN apt install -y sudo curl


RUN apt install -y python3 python3-pip
RUN pip3 install pytest


RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - && \
sudo apt-get install -y nodejs

# Testes
RUN npm -v
RUN node -v

# Instalacao

WORKDIR /opt

ENV ENV PRODUCTION

CMD ["node index.js"]