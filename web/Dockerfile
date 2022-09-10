# syntax=docker/dockerfile:1
FROM ruby:3.1.0
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update -qq && apt-get install -y sqlite3 sudo nodejs
WORKDIR /myapp
RUN curl https://sh.rustup.rs -sSf > /tmp/install-rustup.sh
RUN chmod +x /tmp/install-rustup.sh
RUN /tmp/install-rustup.sh -y
RUN source /root/.cargo/env
RUN curl https://raw.githubusercontent.com/extism/cli/main/install.sh > /tmp/install-extism.sh
RUN chmod +x /tmp/install-extism.sh
RUN /tmp/install-extism.sh /usr/local/bin
RUN source "/root/.cargo/env" && extism --sudo --prefix /usr/local install git

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["bin/rails", "server", "-b", "0.0.0.0"]