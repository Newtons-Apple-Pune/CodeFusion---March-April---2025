import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os

# Ensure model folder exists
os.makedirs("model", exist_ok=True)

# Sample dataset
data = {
    'text': [
        'Update your bank details now',
        'Claim your free gift card',
        'Meeting at 10am tomorrow',
        'Your invoice for last month',
        'Verify your account immediately',
        'Let’s catch up over coffee',
        'Reset your password immediately',
        'Free vacation offer just for you',
        'Lunch at the new cafe?',
        'Monthly report is ready',
        'Login to your account for urgent update',
        'Grab your exclusive deal now',
        'Project discussion at 4 PM',
        'Annual performance review scheduled',
        'Win a free smartphone today!'
    ],
    'label': [1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1]
}


df = pd.DataFrame(data)

X_train, X_test, y_train, y_test = train_test_split(df['text'], df['label'], test_size=0.2, random_state=42)

vectorizer = CountVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

model = MultinomialNB()
model.fit(X_train_vec, y_train)

preds = model.predict(X_test_vec)
print("Accuracy:", accuracy_score(y_test, preds))

joblib.dump(model, 'model/phishing_model.pkl')
joblib.dump(vectorizer, 'model/vectorizer.pkl')

for text, pred, actual in zip(X_test, preds, y_test):
    print(f"Email: {text} | Predicted: {pred} | Actual: {actual}")
