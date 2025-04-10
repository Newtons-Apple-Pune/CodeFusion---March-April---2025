# 📧 Phishing Email Detection System

A simple yet effective machine learning-powered web application that detects whether an email message is phishing or legit, built for the Ethical Hacking – Corporate Cybersecurity Services domain.

---

## 🔍 Description

This system helps users identify suspicious or potentially harmful phishing emails by analyzing the email text. It uses a Naive Bayes machine learning model trained on sample email content, and presents the result via a clean web interface using *Flask*.

---

## ✨ Features

- 🧠 Machine Learning-based phishing detection
- 🌐 Web interface built with Flask
- 💬 Instant prediction feedback
- ⚠ Validation for proper input formatting
- ✅ Lightweight and easy to run locally

---

## 🛠 Tech Stack

| Layer            | Technology              |
|------------------|--------------------------|
| ML Model         | Scikit-learn (Naive Bayes) |
| Data Handling    | Pandas                  |
| Frontend         | HTML, CSS               |
| Backend          | Python, Flask           |
| Model Persistence| Joblib                  |

---

## 🚀 Setup & Usage

### Step 1: Clone the repository
```bash
git clone https://github.com/your-username/phishing-email-detector.git
cd phishing-email-detector

Step 2: Create & activate virtual environment (optional but recommended)

Step 3: Install dependencies
pip install flask pandas scikit-learn joblib

Step 4: Train the ML model (only once)
python model/train_model.py 

Step 5: Run the Flask app
python app.py 

Then open http://127.0.0.1:5000 in your browser to use the app.

👥 Team Members
Priyanshi Ramteke 
Urmila Chaudhary
Tanu Gupta 

