import sys
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import LabelEncoder
import json

df = pd.read_csv('python/user.csv')

label_cols = ['gender', 'budget', 'travelStyle', 'preferredCompanion', 'season', 'spontaneity', 'connectWithOthers']
for col in label_cols:
    df[col] = LabelEncoder().fit_transform(df[col].astype(str))

df['age'] = df['age'].fillna(df['age'].mean())

feature_cols = ['age', 'gender', 'budget', 'travelStyle', 'preferredCompanion', 'season', 'spontaneity', 'connectWithOthers']
X = df[feature_cols]

model = NearestNeighbors(n_neighbors=5, metric='euclidean')
model.fit(X)

user_id = sys.argv[1]

target = df[df['id'] == user_id][feature_cols]

target = target.fillna(df['age'].mean())

distances, indices = model.kneighbors(target)

matches = []
for i, dist in zip(indices[0], distances[0]):
    match_id = df.iloc[i]['id']
    score = max(0, 100 - dist * 10)
    if match_id != user_id: 
        matches.append({"userId": match_id, "score": round(score, 2)})
matches = sorted(matches, key=lambda x: x['score'], reverse=True)
print(json.dumps(matches))  
