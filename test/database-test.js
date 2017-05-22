var data = {
    survivor1: {
        _id: '5919ecfd6d8888171341e5f0',
        name: "Survival1",
        gender: "m",
        age: 19,
        inventory: {
            water: 11,
            food: 15,
            medication: 6,
            ammunation: 60
        },
        location: {
            latitude: '-5.818960',
            longitude: '-35.207356'
        },
        infected: false,
        reports: []
    },
    survivor2: {
        _id: '5919ecfd6d8888171341e5ef',
        name: "Survival2",
        gender: "f",
        age: 40,
        inventory: {
            water: 0,
            food: 30,
            medication: 0,
            ammunation: 10
        },
        location: {
            latitude: '-5.564878',
            longitude: '-35.587954'
        },
        infected: false,
        reports: [{ report_id: 'report1' }, { report_id: 'report2' }]
    },
    survivor3: {
        _id: '5919ed1874438c175e33bc72',
        name: "Survival3",
        gender: "m",
        age: 30,
        inventory: {
            water: 100,
            food: 80,
            medication: 60,
            ammunation: 30
        },
        location: {
            latitude: '-5.734823',
            longitude: '-35.1871382'
        },
        infected: false,
        reports: [{ report_id: 'report1' }, { report_id: 'report2' }]
    },
    survivor4: {
        name: "Survivor4",
        gender: "m",
        age: 30,
        inventory: {
            water: 60,
            food: 5,
            medication: 14,
            ammunation: 20
        },
        location: {
            latitude: '-5.734823',
            longitude: '-35.1871382'
        },
        infected: false,
        reports: []
    },

    survivor_inventory_expected: {
        water: 10,
        food: 5,
        medication: 5,
        ammunation: 20
    },

    trade_inventory_expected: {
        water: 1,
        food: 30,
        medication: 1,
        ammunation: 4
    }
}
module.exports = data;