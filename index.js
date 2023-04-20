const mongoose = require('mongoose');
mongoose.set('strictQuery', false)
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const firstRecipe = {
      title: "hamburger",
      level: "Easy Peasy",
      ingredients: ["meat","bread"],
      cuisine: "american",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 10,
      creator: "Dani",
      created:"2023-03-20"
    }
    return Recipe.create(firstRecipe)
  })
  .then(()=> {
    return Recipe.insertMany(data)
  })
  .then (()=> {
    const filter = {title:"Rigatoni alla Genovese"}
    const update = {duration: 100}
    return Recipe.findOneAndUpdate(filter,update, {new:true})
  })    
  .then (()=> {
    const filter = {title:"Carrot Cake"}
    return Recipe.deleteOne(filter)
  })  
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally (() => {
    mongoose.connection.close()
  })
  
