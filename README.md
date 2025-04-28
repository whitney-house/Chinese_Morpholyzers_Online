# Online Chinese Morpholyzer

This repository provides an online Chinese morphological analysis using jieba, THULAC, HanLp, LTP, snowNLP. It includes both a frontend (built with React) and a backend for handling model inference and processing. It includes two functions: **segment text** and **evaluate analyzers**. Due to the models(THULAC, HanLp, LTP) are huge, it may take a while to run. You can use **fn+F12** to check whether this app runs appropriately.

## Getting Started

Follow the instructions below to set up the project locally or deploy it online.

### Usage (For beginners)
**You need not use static file in /backend and you need to uncomment the static code in last lines in main.py if you follow instructions below:**

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Chinese_Morpholyzer_Online.git
cd Chinese_Morpholyzer_Online
```

#### 2. Setup Frontend (React)
Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```
To run the frontend locally:

```bash
npm run dev
```

#### 3. Setup Backend (Python)
Navigate to the backend directory:

```bash
cd backend
```
Create a virtual environment (optional but recommended):

```bash
conda create --name [xxx]
conda activate xxx
```

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

#### 4. Prepare Models
You will need to create a **models directory inside the backend folder and download the required models**.

Thulac & HanLP Models: You can download these models using the **prepare_models.py script** in the backend directory. Run the following command:

```bash
python prepare_models.py
```

This will automatically download the necessary Thulac and HanLP models.

For the LTP model, go to the LTP model page on [Hugging Face](https://huggingface.co/LTP/small/tree/main) and manually download the model files. Once downloaded, place them in the models directory (inside backend/models/ltp/small).

**You can decide what names of the folders including models are, then you need to change the init part of analyzers.py**

Running the Application
Frontend: Once the frontend is running, it will automatically fetch data from the backend API.

Backend: Run the backend server:

```bash
uvicorn main:app --reload
```

#### Reference 
This is where is the evaluation comes from [evauation](https://github.com/ownthink/evaluation/tree/master)
