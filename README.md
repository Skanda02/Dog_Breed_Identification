# Dog Breed Identification

An end-to-end dog breed classification app. Upload a photo of a dog and get its predicted breed, along with the top 5 most likely breeds and confidence scores.

- **Backend:** Flask REST API powered by a TensorFlow/Keras model
- **Frontend:** React + Vite single-page app that talks to the API
- **Training:** Original work in the `DOG_clf.ipynb`  notebooks (Kaggle **Dog Breed Identification** dataset, 120 breeds)

---

## Features

- Predicts the breed of a dog from an image (PNG, JPG, JPEG, WEBP, GIF)
- Returns the **top 5 breed predictions with confidence percentages**
- Serves the built React frontend directly from the backend (production-ready single deployable)
- Lightweight health-check endpoint for load balancers / deploy platforms
- Docker image + GitHub Actions CI + Render/Railway deploy configs included

---

## Tech Stack

| Layer     | Tech |
|-----------|------|
| Frontend  | React 18, Vite 5, React Router, Tailwind CSS, Axios |
| Backend   | Flask, Flask-CORS, gunicorn |
| ML        | TensorFlow 2.20, Keras, TensorFlow Hub |
| Infra     | Docker, GitHub Actions, Render / Railway |

---

## Models Used

The classifier is a **transfer-learned MobileNetV2** model:

- Base: `MobileNetV2` (`input_shape=(224, 224, 3)`, `include_top=False`) with ImageNet-pretrained weights (kept frozen)
- Head: `GlobalAveragePooling2D` → `Dense(120, activation="softmax")` (120 = number of dog breeds)
- Trained with the **Adam** optimizer and **CategoricalFocalCrossentropy** loss (see `DOG_clf.ipynb`)

Two training variants were explored in the notebooks:

1. **TensorFlow Hub MobileNetV2** (`hub.KerasLayer`) + Dense softmax head
2. **`tf.keras.applications.MobileNetV2`** + GlobalAveragePooling2D + Dense softmax head ← **the one used in production**

The saved weights live in `backend/Models/`:

```
backend/Models/
├── Full_img.h5                                              # Weights-only, used by the app
└── 20251226-05331766727215-1000-image-mobilenetv2-Adam.h5   # TF Hub variant checkpoint
```

> Note: `Full_img.h5` is a **weights-only** H5 file (no architecture). The app rebuilds the MobileNetV2 architecture and calls `load_weights()`, so no internet access is needed at startup.

---

## Project Structure

```
.
├── backend/                    # Flask API + ML model
│   ├── app.py                  # Entry point: Flask app, API routes, serves frontend build
│   ├── utils.py                # Image preprocessing helper
│   ├── labels.json             # Class index → breed name mapping (120 breeds)
│   ├── Models/                 # Trained model weights (.h5)
│   ├── tests/test_smoke.py     # Smoke tests (health, breeds, predict)
│   ├── requirements.txt        # Pinned runtime deps
│   ├── requirements-dev.txt    # Dev deps (ruff, pytest)
│   └── pyproject.toml          # Ruff + pytest config
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── App.jsx             # Routes (/ and /about)
│   │   ├── pages/              # Home, About
│   │   ├── components/         # Navbar, Hero, UploadCard, Loader, ResultCard
│   │   └── services/api.js     # API client (VITE_API_URL)
│   ├── index.html
│   ├── package.json
│   └── eslint.config.js        # ESLint (flat config)
├── Dockerfile                  # Multi-stage: build frontend → bundle with backend
├── .dockerignore
├── render.yaml                 # Render blueprint (auto-deploy)
├── .github/workflows/ci.yml    # GitHub Actions CI
├── .python-version             # 3.13
├── .env.example                # Sample environment variables
├── DOG_clf.ipynb               # Training notebook
└── custom.ipynb                # Training experiments notebook
```

---

## API Endpoints

| Method | Route         | Description |
|--------|---------------|-------------|
| `GET`  | `/api/health` | Health check (alias: `/health`) |
| `POST` | `/api/predict`| Upload an image (`multipart/form-data`, field name `image`) → top-5 predictions |
| `GET`  | `/api/breeds` | List all 120 supported breeds |
| `GET`  | `/` and any non-API path | Serves the built React app (SPA fallback) |

Example `POST /api/predict` response:

```json
{
  "breed": "Rottweiler",
  "confidence": 97.9,
  "topPredictions": [
    { "breed": "Rottweiler", "confidence": 97.9 },
    { "breed": "Black-And-Tan Coonhound", "confidence": 1.12 }
  ]
}
```

---

## How to Run Locally

### Prerequisites

- **Python 3.9+** (3.13 recommended — see `.python-version`)
- **Node.js 18+** and **npm** (only needed to build the frontend)
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/Skanda02/Dog_Breed_Identification.git
cd Dog_Breed_Identification
```

### 2. Set up the backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt  # or requirements-dev.txt for dev + testing
cd ..
```

### 3. Build the frontend (once)

```bash
cd frontend
npm install
npm run build                    # outputs frontend/dist
cd ..
```

### 4. Run the app

```bash
cd backend
FRONTEND_DIST=../frontend/dist python app.py
```

The app is now served at **http://localhost:5001** — both the API **and** the built frontend (`FRONTEND_DIST` points the backend at the frontend build output). Try it in your browser or with curl:

```bash
curl http://localhost:5001/api/health
curl -F "image=@Sample.jpg" http://localhost:5001/api/predict
```

---

### Frontend development mode (hot reload)

While developing the React app, run two processes:

```bash
# Terminal 1 — backend API
cd backend && python app.py

# Terminal 2 — Vite dev server (proxies /api to localhost:5001)
cd frontend && npm install && npm run dev
```

Open **http://localhost:3000**. Optionally set `VITE_API_URL` in `frontend/.env` (copy from `frontend/.env.example`) to point the SPA at a different API.

---

### Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable        | Default  | Description |
|-----------------|----------|-------------|
| `PORT`          | `5001`   | Port the backend listens on |
| `FLASK_DEBUG`   | `0`      | Set to `1` to enable Flask debug mode |
| `FRONTEND_DIST` | `backend/dist` | Path to the built frontend (defaults to `backend/dist`; for a local `npm run build` use `../frontend/dist` relative to `backend/`) |
| `VITE_API_URL`  | `/api`   | (Frontend) API base URL — leave unset in production |

---

## Running Tests & Linting

```bash
# Backend: tests + lint (from backend/)
pytest
ruff check .
ruff format --check .

# Frontend: lint + build (from frontend/)
npm run lint
npm run build
```

---

## Docker

```bash
docker build -t dog-breed .
docker run -p 8000:8000 -e PORT=8000 dog-breed
# → http://localhost:8000
```

The multi-stage Dockerfile builds the React app, then packages it with the Flask backend and runs it with **gunicorn**. The container reads the `PORT` environment variable (default `8000`).

---

## Deployment

This repo is deploy-ready for any container platform.

**Render** — commit `render.yaml` (or connect the repo through the Render dashboard):

- The blueprint uses `runtime: docker` with `dockerfilePath: Dockerfile` and `healthCheckPath: /health`
- Render injects `PORT` automatically

**Railway** — Railway auto-detects the `Dockerfile`; no extra config needed.

**GitHub Actions** — `.github/workflows/ci.yml` runs lint + tests + Docker smoke test on every push/PR to `main`.

---

## Acknowledgements

- Dataset: [Kaggle — Dog Breed Identification](https://www.kaggle.com/c/dog-breed-identification/data)
- Pretrained backbone: [MobileNetV2 (ImageNet)](https://keras.io/api/applications/mobilenet/)
