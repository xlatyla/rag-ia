# 🤖 Sistema RAG con FastAPI, Ollama y PostgreSQL

Sistema de Recuperación Aumentada por Generación (RAG) para documentos PDF con API REST

![Interfaz de ejemplo](./interface.png)

## 🚀 Características principales
- **Procesamiento de documentos PDF**
- **Embeddings locales** con modelo all-minilm
- **Generación de respuestas** con Llama3
- **Almacenamiento vectorial** en PostgreSQL con extensión pgvector
- **API REST** con FastAPI
- **Fácil configuración** e instalación

## ⚙️ Requisitos previos

### 📦 Software necesario
- Python 3.8+
- PostgreSQL 13+ con extensión pgvector
- Ollama (para modelos de LLM)

### 🔧 Instalación de dependencias
#### Instalar Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

####  Descargar modelos necesarios
    ollama pull all-minilm  # Para embeddings
    ollama pull llama3.2    # Para generación


#### Instalar dependencias

    pip install -r requirements.txt


## 🛠️ Configuración
    Configurar PostgreSQL:
    CREATE DATABASE rag_db;
    CREATE EXTENSION vector;
   

    Editar las credenciales en DB_URL si es necesario:
```bash
DB_URL = 'postgresql+asyncpg://usuario:contraseña@localhost:5432/rag_db'
```

**Configurar el prompt del sistema en SYSTEM_PROMPT para ajustar el comportamiento del bot.**

## 🚀 Cómo usar
Iniciar el backend:
    python3 agent.py
Iniciar el frontend:
    npm run dev

## Endpoints disponibles:
POST /upload-document/: Subir documentos PDF

curl -X POST -F "file=@documento.pdf" http://localhost:8017/upload-document/

POST /ask: Hacer preguntas sobre los documentos

curl -X POST -H "Content-Type: application/json" -d '{"question":"¿Cuál es el tema principal?"}' http://localhost:8017/ask


## 📂 Estructura del proyecto (Backend)
    backend
    ├── main.py               # Aplicación principal FastAPI
    ├── README.md             # Este archivo
    ├── requirements.txt      # Dependencias
    └── documentos/           # Carpeta para documentos subidos (opcional)
