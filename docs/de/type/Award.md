---
title: Award / Auszeichnungen
permalink: /docs/type/Award
---
# Award

Auszeichnungen für den Tourismus gemäss [schema.org/award](https://schema.org/award).
Erweitert gemäss [docs.discover.swiss](https://docs.discover.swiss/dev/reference/dataschema/definition/infocenter-classes/Award/)


## Datentabelle der Auszeichnungen
Ist die Basis für das JSON-LD

[Tabelle](https://docs.google.com/spreadsheets/d/10seflFrgXci7KovdYPe396UUZE_OXbrHItZldWLQ2JM/edit#gid=0)

### Examples
```json
{
    "@type": "Award",
    "identifier": "okgo",
    "name": "OK:GO",
    "logo": {
        "@type": "ImageObject",
        "name": "SVG OK:Go",
        "author": "TSO AG",
        "contentUrl": "/assets/images/Award/okgo.svg",
        "description": "Auszeichnung von OK:GO als SVG",
        "license": "https://creativecommons.org/publicdomain/zero/1.0/"
    }
}
```


## Open Data JSON-LD List

[JSON-LD](/api/type/Award/index.jsonld)
[CSV](/api/type/Award/index.csv)
