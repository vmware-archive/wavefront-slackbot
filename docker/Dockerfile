FROM hypriot/rpi-node:8
ARG API_KEY
ENV WAVEFRONT_TOKEN=$API_KEY
ENV WAVEFRONT_URL=$WAVEFRONT_URL
ENV SLACK_OAUTH=$SLACK_OAUTH
RUN apt-get install -y git
WORKDIR /app
RUN git clone https://github.com/krisclarkdev/wfslackbot.git /app
RUN cd /app
RUN npm install
CMD node index.js
EXPOSE 8081