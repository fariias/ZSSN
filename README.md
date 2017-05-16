# ZSSN
Zombie Survival Social Network

## Endpoints

### GET /survivors
Function: Get all survivors
Example: http://127.0.0.1:8080/survivors

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

### GET /survivors/{id}
Function: get an specific surviver
Example: http://127.0.0.1:8080/survivors/5919ecfd6d8888171341e5f0
 

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

### POST /survivors
Function: create an survivor
Example: http://127.0.0.1:8080/survivors/

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
