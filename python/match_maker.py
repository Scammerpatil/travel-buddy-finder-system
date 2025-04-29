import sys
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import LabelEncoder

# Read CSV
df = pd.read_csv('python\users.csv')

# Preprocessing
label_cols = ['gender', 'budget', 'travelStyle', 'preferredCompanion', 'season', 'spontaneity', 'connectWithOthers']
for col in label_cols:
    df[col] = LabelEncoder().fit_transform(df[col].astype(str))

feature_cols = ['age', 'gender', 'budget', 'travelStyle', 'preferredCompanion', 'season', 'spontaneity', 'connectWithOthers']
X = df[feature_cols]

# KNN Model
model = NearestNeighbors(n_neighbors=5, metric='euclidean')
model.fit(X)

# Target user
user_id = sys.argv[1]
target = df[df['id'] == user_id][feature_cols]

# Find Matches
distances, indices = model.kneighbors(target)

matches = []
for i, dist in zip(indices[0], distances[0]):
    match_id = df.iloc[i]['id']
    score = max(0, 100 - dist*10)  # Lower distance = Higher score
    if score >= 90:
        matches.append({"userId": match_id, "score": score})

print(matches)
