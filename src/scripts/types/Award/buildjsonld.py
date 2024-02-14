import pandas as pd
import json

def returnAward(data, url):
    object = {}
    #object["@context"] = "https://schema.org"
    object["@type"] = "Award"
    object["identifier"] = data['identifier'] if 'identifier' in data else None
    object["dateCreated"] = data['dateCreated'] if 'dateCreated' in data else None
    object["dateModified"] = data['dateModified'] if 'dateModified' in data else None
    if data['name.de'] is not None:
        object["name"] = data['name.de']
    if data['description.de'] is not None:
        object["description"] = data['description.de']
    object["logo"] = {}
    object["logo"]["@type"] = "ImageObject"
    if data['ImageObject.name.de'] is not None:
        object["logo"]["name"] = data['ImageObject.name.de']
    object["logo"]["author"] = data['ImageObject.author'] if 'ImageObject.author' in data else None
    object["logo"]["contentUrl"] = url + data['ImageObject.contentUrl'] if 'ImageObject.contentUrl' in data else None
    object["logo"]["license"] = data['ImageObject.license'] if 'ImageObject.license' in data else None
    return object

def main():
    # Download the CSV file
    url = "https://docs.google.com/spreadsheets/d/10seflFrgXci7KovdYPe396UUZE_OXbrHItZldWLQ2JM/gviz/tq?tqx=out:csv&sheet=award"
    df = pd.read_csv(url)

    print(df)

    df = df.drop(df.columns[[0, 1]], axis=1)

    print(df)

    # Convert the DataFrame to JSON-LD
    json_data = df.to_json(orient="records", lines=True)

    print(json_data)

    #json_data = json.loads(json_data)
    json_objects = json_data.split('\n')

    print(json_objects)

    data = []
    url = "https://opendatatourism.ch"
    for json_object in json_objects:
        if json_object.strip():  # Ignoriert leere Zeilen
            # Add to array
            awardObject = returnAward(json.loads(json_object), url)
            data.append(awardObject)

    # Save the JSON-LD to a file
    with open("output/data.jsonld", "w", encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
   main()
