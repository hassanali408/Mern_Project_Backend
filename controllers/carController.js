const Car = require('../models/Cars');
const Category = require('../models/Category');


const createCar = async (req, res) => {
  const { model, make, color, registrationNo, category } = req.body;
  const user = req.user.userId;
  try {
    const car = new Car({ model, make, color, registrationNo, category,user });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Error creating car', error: err.message });
  }
};

const getCars = async (req, res) => {
    try {
      const userId = req.user.userId; 
    const cars = await Car.find({ user: userId }).populate('category'); 
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching cars', error: err.message });
    }
  };
  
  const updateCar = async (req, res) => {
    const { model, make, color, registrationNo, categoryId } = req.body;
    try {
      const userId = req.user.userId; 
  
      const car = await Car.findOne({ _id: req.params.id, user: userId });
      if (!car) return res.status(404).json({ message: 'Car not found or you are not authorized to update it' });
  
      car.model = model || car.model;
      car.make = make || car.make;
      car.color = color || car.color;
      car.registrationNo = registrationNo || car.registrationNo;
      car.category = categoryId || car.category;
  
      await car.save();
      res.status(200).json(car);
    } catch (err) {
      res.status(500).json({ message: 'Error updating car', error: err.message });
    }
  };
  

const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting car', error: err.message });
  }
};


module.exports = { createCar,updateCar,getCars,deleteCar };
