import pandas as pd
import json

# Download the CSV file
url = "https://docs.google.com/spreadsheets/d/10seflFrgXci7KovdYPe396UUZE_OXbrHItZldWLQ2JM/gviz/tq?tqx=out:csv&sheet=award"
df = pd.read_csv(url)

print(df)

df = df.drop(df.columns[[0, 1]], axis=1)

print(df)

# Convert the DataFrame to JSON-LD
json_data = df.to_json(orient="index", lines=True)

print(json_data)

json_data = json.loads(json_data)


# Save the JSON-LD to a file
with open("output/data.jsonld", "w", encoding='utf-8') as file:    
    json.dump(json_data, file, ensure_ascii=False, indent=4)
