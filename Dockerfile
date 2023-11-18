FROM registry.gitlab.com/gruporadar/frontend/webmet/webmet:base

RUN pip install django-cors-headers

RUN mkdir /app
COPY ./ /app/website

WORKDIR /app/website/
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
