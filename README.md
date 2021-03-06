# ZSSN
Zombie Survival Social Network

## Installation
```bash
git clone https://github.com/fariias/ZSSN
cd ZSSN
npm install nodemon -g
npm install 
```
## Run
Run automated tests
```bash
npm test
```
Run server
```bash
nodemon server.js
```

## Endpoints
you can use the 'postman' for tests https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop

## SURVIVORS

### GET /survivors
Function: Get all survivors
Example: http://127.0.0.1:8080/survivors
```bash
Response body:
[
  {
    "_id": "5919ecfd6d8888171341e5f0",
    "name": "Survival1",
    "gender": "m",
    "age": 19,
    "infected": false,
    "__v": 0,
    "reports": [],
    "location": {
      "latitude": "-5.818960",
      "longitude": "-35.207356"
    },
    "inventory": {
      "water": 80,
      "food": 100,
      "medication": 30,
      "ammunation": 60
    }
  },
]
```

### GET /survivors/{id}
Function: get an specific surviver
Example: http://127.0.0.1:8080/survivors/5919ecfd6d8888171341e5f0
 
```bash
Response body:
[
  {
    "_id": "5919ecfd6d8888171341e5f0",
    "name": "Survival1",
    "gender": "m",
    "age": 19,
    "infected": false,
    "__v": 0,
    "reports": [],
    "location": {
      "latitude": "-5.818960",
      "longitude": "-35.207356"
    },
    "inventory": {
      "water": 80,
      "food": 100,
      "medication": 30,
      "ammunation": 60
    }
  },
]
```
### POST /survivors
Function: Add survivors to the database
Example: http://127.0.0.1:8080/survivors/
```bash
Request body:
{
	"name":"Survival1",
	"gender":"M",
	"age": 20,
	"location":{"latitude":"-5.818960","longitude":"-35.207356"},
	"inventory":{ "water":3,"ammunation":10,"food":5,"medication":3},
	"infected":false,
	"reports":[]
	
}
```
```bash
Response body:
[
  {
    "_id": "5919ecfd6d8888171341e5f0",
    "name": "Survival1",
    "gender": "m",
    "age": 20,
    "infected": false,
    "__v": 0,
    "reports": [],
    "location": {
      "latitude": "-5.818960",
      "longitude": "-35.207356"
    },
    "inventory": {
      "water": 80,
      "food": 100,
      "medication": 30,
      "ammunation": 60
    }
  },
]
```

### PUT /survivors/{id}
Function: Update survivor location
Example: 127.0.0.1:8080/survivors/5919ecfd6d8888171341e5f0
```bash
Request body:
{
	"location": { "latitude": "-3.9999", "longitude": "-5.3333" }
}
```
```bash
Response body:
{
  "_id": "5919ecfd6d8888171341e5f0",
  "name": "Survival1",
  "gender": "m",
  "age": 19,
  "infected": false,
  "__v": 0,
  "reports": [],
  "location": {
    "latitude": "-3.9999",
    "longitude": "-5.3333"
  },
  "inventory": {
    "water": 80,
    "food": 100,
    "medication": 30,
    "ammunation": 60
  }
}
```

### PUT /survivors/{user_id}/report
Function: report infected surviver
Example: 127.0.0.1:8080/survivors/5919ecfd6d8888171341e5f0/report
```bash
Request body:
{
	"report_id": 'ReporterId'
}
```
```bash
Response body:
{
    "_id": "5919ed1874438c175e33bc72",
    "name": "Survival3",
    "gender": "m",
    "age": 30,
    "infected": true,
    "__v": 1,
    "reports": [
     {
        "report_id": "5919ecfd6d8888171341e5f0",
        "_id": "591a4513a96ae7022950386d"
      }
    ],
    "location": {
      "latitude": "-5.734823",
      "longitude": "-35.1871382"
    },
    "inventory": {
      "water": 60,
      "food": 5,
      "medication": 14,
      "ammunation": 20
    }
  },
```

## TRADE

### POST /survivors/{user_id}/trade
Function: trade itens 
Example: http://127.0.0.1:8080/survivors/5919ecfd6d8888171341e5f0/trade
```bash
Request body:
{
     "trader_id": '5919ecfd6d8888171341e5ef',
     "survivorProposal": { water: 1, medication: 1 },
     "traderProposal": { ammunation: 6 }
}
```
```bash
Response body:
[
  {
    _id: '5919ecfd6d8888171341e5f0',
        name: "Survival1",
        gender: "m",
        age: 19,
        inventory: {
            water: 10,
            food: 15,
            medication: 5,
            ammunation: 66
        },
        location: {
            latitude: '-5.818960',
            longitude: '-35.207356'
        },
        infected: false,
        reports: []
  },
]
```
## REPORTS

### GET /reports/infected
Function: Percentage of infected survivors.
Example: 127.0.0.1:8080/reports/infected
```bash
Response body:
{
  "infected":25
}
```

### GET /reports/noinfected
Function: Percentage of non-infected survivors.
Example: 127.0.0.1:8080/reports/noinfected
```bash
Response body:
{
  "noInfected":75
}
```

### GET /reports/lostpoints
Function: Percentage of non-infected survivors.
Example: 127.0.0.1:8080/reports/noinfected
```bash
Response body:
{
  "points":790
}
```
