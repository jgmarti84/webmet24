FROM registry.gitlab.com/gruporadar/frontend/webmet/base:latest

RUN mkdir /app
COPY ./ /app/website

# RUN mkdir /app/logs
# RUN chmod 777 /app/logs -R 
# RUN mkdir /app/run

WORKDIR /app/website/
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
