# Use the official Cypress image as a base
FROM cypress/included:10.10.0

# Install X11 and other dependencies for running GUI
RUN apt-get update && apt-get install -y \
    xvfb \
    x11-xkb-utils \
    xfonts-100dpi \
    xfonts-75dpi \
    xfonts-scalable \
    xfonts-cyrillic \
    x11-apps \
    clang \
    libdbus-1-dev \
    libgtk2.0-dev \
    libnotify-dev \
    libgconf-2-4 \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xauth \
    xvfb

# Set up the environment variables for GUI
ENV DISPLAY=:99

# Set your working directory
WORKDIR /e2e
COPY /tests /e2e

# Start Xvfb
RUN Xvfb -ac :99 -screen 0 1280x1024x16 &
