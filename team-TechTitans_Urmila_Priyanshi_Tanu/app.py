from flask import Flask, render_template, request
import joblib

app = Flask(__name__)  # Corrected from _name_

model = joblib.load('model/phishing_model.pkl')
vectorizer = joblib.load('model/vectorizer.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    email = request.form['email']
    vectorized = vectorizer.transform([email])
    prediction = model.predict(vectorized)
    result = 'Phishing Email Detected 🚨' if prediction[0] == 1 else 'Legit Email ✅'
    return render_template('index.html', result=result)

if __name__ == '__main__':  # Corrected from _main_
    app.run(debug=True)
