const equipmentController = require('../controllers/equipment.js');

equipmentController.getAndWriteEquipmentIds().then(() => {
    console.log('Successly Written');
}).catch((err) => {
    console.log(err, 'Error Writing Equipment Ids');
});