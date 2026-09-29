# SummaText: Deployment Guide

This guide provides step-by-step instructions to deploy the SummaText application. The frontend is built with React and deployed to Vercel. The backend is built with FastAPI and deployed to Hugging Face Spaces.

## 1. Prerequisites

Before beginning the deployment process, ensure you have the following installed and set up:
- **Git** installed on your local machine.
- A **GitHub** account (to host the repository).
- A **Vercel** account (for frontend deployment).
- A **Hugging Face** account (for backend deployment).
- The SummaText project code organized into `frontend` and `backend` directories.

---

## 2. Backend Deployment (Hugging Face Spaces)

Hugging Face Spaces provides an excellent environment for Python-based NLP applications. We will use the Docker SDK to handle custom dependencies like NLTK data.

1. Log in to your Hugging Face account and navigate to **Spaces**.
2. Click **Create new Space**.
3. Fill in the Space details:
   - **Space name**: `summatext-api` (or any unique name).
   - **License**: Choose an open-source license (e.g., MIT).
   - **Select the Space SDK**: Choose **Docker** (Select the "Blank" template).
   - **Space hardware**: Free tier (CPU Basic) is sufficient.
4. Click **Create Space**.
5. Clone the space repository locally:
   ```bash
   git clone https://huggingface.co/spaces/<your-username>/summatext-api
   ```
6. Copy the contents of your local `backend/` directory into this cloned repository. Ensure your `Dockerfile`, `requirements.txt`, and `main.py` are at the root of the space repo.
7. Commit and push the code:
   ```bash
   git add .
   git commit -m "Initial backend deployment"
   git push
   ```
8. The Space will automatically build the Docker container. You can view the logs in the Hugging Face UI.
9. Once the build is complete (Status: Running), your API is live. Note the URL. It will follow this format: 
   `https://<your-username>-<space-name>.hf.space`

---

## 3. Frontend Deployment (Vercel)

Vercel provides seamless deployment for React applications directly from GitHub.

1. Push your entire SummaText project (including the `frontend` folder) to a repository on your GitHub account.
2. Log in to Vercel and click **Add New** -> **Project**.
3. Import the GitHub repository containing your project.
4. In the configuration screen, set the following:
   - **Framework Preset**: Vite (Vercel should auto-detect this).
   - **Root Directory**: Click "Edit" and select the `frontend` folder.
5. Expand the **Environment Variables** section and add:
   - **Name**: `VITE_API_URL`
   - **Value**: The Hugging Face Space URL you created in step 2 (e.g., `https://<your-username>-<space-name>.hf.space`). *Ensure there is no trailing slash.*
6. Click **Deploy**.
7. Vercel will build and deploy the React application. Once finished, it will provide a live URL for your frontend.

---

## 4. CORS Configuration

Cross-Origin Resource Sharing (CORS) is a security mechanism that prevents your frontend (hosted on Vercel) from making unauthorized requests to your backend (hosted on Hugging Face).

In your backend code (`main.py`), CORS is configured using FastAPI's `CORSMiddleware`. For the deployment to work, you must update the backend to allow requests from your specific Vercel URL.

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", # For local development
        "https://your-vercel-project-url.vercel.app" # The deployed frontend URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
*Note: After deploying the frontend on Vercel and obtaining its URL, you must update the `allow_origins` list in your backend code and push the changes to Hugging Face.*

---

## 5. Environment Variables

Environment variables keep configuration separate from code.

**Frontend (Vercel):**
- `VITE_API_URL`: Points to the deployed Hugging Face backend API. (e.g., `https://username-summatext.hf.space`)

**Backend (Hugging Face Spaces):**
- The backend for this specific project is stateless and does not require complex environment variables (like API keys for databases or external LLMs). However, if you add future integrations, configure them via the Spaces settings UI under "Variables and secrets".

---

## 6. Troubleshooting

**Issue: CORS Errors in the browser console.**
- **Solution**: Verify that the `VITE_API_URL` in Vercel exactly matches your backend URL. Ensure that your Vercel URL is exactly listed in the `allow_origins` array in the backend's CORS configuration (no trailing slashes).

**Issue: API Requests timeout or fail initially (Cold Start).**
- **Solution**: Hugging Face free tier Spaces may go to sleep after inactivity. The first request will wake it up but may timeout on the frontend. Wait 30 seconds and try again.

**Issue: NLTK Data Missing Error (e.g., 'Resource punkt not found').**
- **Solution**: Ensure your backend `main.py` explicitly downloads NLTK data at startup, or ensure it is handled in the Dockerfile.
  ```python
  import nltk
  nltk.download('punkt')
  nltk.download('stopwords')
  ```

**Issue: Vercel Build Fails.**
- **Solution**: Check the Vercel build logs. Ensure the Root Directory is correctly set to `frontend`. Ensure there are no unresolved TypeScript/ESLint errors preventing the Vite build.

---

## 7. Redeployment

To update your application:

**Updating the Frontend:**
Simply push your changes to the `main` branch of your GitHub repository. Vercel will automatically detect the push, rebuild, and redeploy the frontend.

**Updating the Backend:**
Navigate to your local clone of the Hugging Face space repository, make your code changes, commit, and push back to Hugging Face. The Space will automatically rebuild the Docker container.
```bash
git add .
git commit -m "Update API logic"
git push
```

---

## 8. Deployment Architecture Diagram

```text
+-----------------------+           HTTP POST (JSON)          +--------------------------+
|                       |  ---------------------------------> |                          |
|    Client Browser     |                                     |  Hugging Face Spaces     |
|   (React Frontend)    |                                     |    (FastAPI Backend)     |
|  Hosted on Vercel     | <---------------------------------  |      Docker Container    |
|                       |           JSON Response             |                          |
+-----------------------+     (Summary & Stats Data)          +--------------------------+
           |                                                               |
           |                                                               |
           v                                                               v
+-----------------------+                                     +--------------------------+
|                       |                                     |  - NLTK Preprocessing    |
| - Text Input          |                                     |  - TF-IDF / TextRank     |
| - UI Components       |                                     |  - ROUGE Evaluation      |
| - Statistics Charts   |                                     |  - CORS Middleware       |
|                       |                                     |                          |
+-----------------------+                                     +--------------------------+
```
