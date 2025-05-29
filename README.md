# 🤖 Sistema RAG con FastAPI, Ollama y PostgreSQL
Sistema de recuperación aumentada por generación (RAG) para documentos PDF con API REST

## 🎥 Video DEMO (POC)

[Ver video DEMO](./yes.mp4)


## ⚙️ Configuración
Requisitos previos

# Instalar Ollama
curl -fsSL https://ollama.com/install.sh | sh

## Descargar modelos necesarios
ollama pull all-minilm  # Para embeddings
ollama pull llama3.2    # Para generación
Instalación

## Clonar repositorio
git clone https://github.com/tu-usuario/rag-system.git
cd rag-system

## Instalar dependencias
pip install -r requirements.txt

## 🛠️ Configuración
Configurar PostgreSQL:

CREATE DATABASE rag_db;
CREATE EXTENSION vector;
Editar las credenciales en DB_URL si es necesario:

DB_URL = 'postgresql+asyncpg://usuario:contraseña@localhost:5432/rag_db'
Configurar el prompt del sistema en SYSTEM_PROMPT para ajustar el comportamiento del bot.

🚀 Cómo usar
Iniciar el servidor:

python3 agent.py

## Endpoints disponibles:
POST /upload-document/: Subir documentos PDF

curl -X POST -F "file=@documento.pdf" http://localhost:8017/upload-document/
POST /ask: Hacer preguntas sobre los documentos


curl -X POST -H "Content-Type: application/json" -d '{"question":"¿Cuál es el tema principal?"}' http://localhost:8017/ask

## 🏗️ Arquitectura
Diagram
Code


📂 Estructura del proyecto
bash
.
├── main.py               # Aplicación principal FastAPI
├── README.md             # Este archivo
├── requirements.txt      # Dependencias
└── documentos/           # Carpeta para documentos subidos (opcional)
