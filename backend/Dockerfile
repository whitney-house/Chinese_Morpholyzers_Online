FROM python:3.10-slim-buster

WORKDIR /app/backend

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

RUN echo "==== 打印 /app/backend/models 内容 ====" && ls -la /app/backend/models

CMD exec uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}