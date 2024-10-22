FROM python:3.9
LABEL maintainer="bohdanfariyon"

ENV PYTHONUNBUFFERED=1

COPY ./requirements.txt /tmp/requirements.txt
COPY ./requirements.dev.txt /tmp/requirements.dev.txt
COPY ./app /app
WORKDIR /app
EXPOSE 8000
ARG DEV=false

# Set up the virtual environment and install dependencies
RUN python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apt-get update && \
    apt-get install -y postgresql-client && \
    apt-get install -y --no-install-recommends build-essential libpq-dev && \
    /py/bin/pip install -r /tmp/requirements.txt && \
    if [ "$DEV" = "true" ]; then \
        /py/bin/pip install -r /tmp/requirements.dev.txt ; \
    fi && \
    rm -rf /var/lib/apt/lists/* /tmp/* && \
    apt-get purge -y --auto-remove build-essential libpq-dev && \
    apt-get clean && \
    adduser --disabled-password --no-create-home django-user

# Add the virtual environment to PATH
ENV PATH="/py/bin:$PATH"

# Use the non-root user for running the app
USER django-user
