import pandas as pd
import json
import requests
import os

# Download the CSV file
url = "https://docs.google.com/spreadsheets/d/10seflFrgXci7KovdYPe396UUZE_OXbrHItZldWLQ2JM/gviz/tq?tqx=out:csv&sheet=award"
df = pd.read_csv(url)

print(df[['identifier','ImageObject.contentUrl','ImageObject.old']])

# Download and save the images
for index, row in df.iterrows():
    if not pd.isna(row['ImageObject.old']):
        image_url = row['ImageObject.old']
        image_name = row['identifier']+".svg"
        print(f"Image Name {image_name}")
        
        image_path = f"images/{image_name}"
        print(f"Downloading {image_url} to {image_path}")
        response = requests.get(image_url)
        with open(image_path, "wb") as file:
            file.write(response.content)
            print(f"Saved {image_path}")

