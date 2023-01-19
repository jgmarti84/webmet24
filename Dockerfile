FROM python:2.7-alpine

RUN apk add --update \
    mariadb-dev \
    supervisor \ 
    python-dev \
    build-base \
    linux-headers \
    pcre-dev \
    py-pip \  
    nano \    
    bash \
    jpeg-dev \
    zlib-dev \
    build-base \
    gcc \
    abuild \
    binutils \
    linux-headers \
    make \
    musl-dev \
    python-dev \
    postgresql-client \
    postgresql-dev

RUN mkdir /app

COPY ./ /app/website

RUN pip install --upgrade pip
RUN pip install -r /app/website/deploy/requirements.txt

RUN mkdir /app/logs
RUN chmod 777 /app/logs -R 
RUN mkdir /app/run

WORKDIR /app/website/
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

