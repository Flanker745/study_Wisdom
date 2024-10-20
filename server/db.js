const { default: mongoose } = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studyWisdom", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// mongoose.connect('mongodb+srv://pradeepnain745:rwXMRk7P62uQN3d8@cluster0.aosqos0.mongodb.net/coching?retryWrites=true&w=majority&appName=Cluster0')

// mongoose.connect('mongodb+srv://pradeepnain745:rwXMRk7P62uQN3d8@cluster0.aosqos0.mongodb.net/coching?retryWrites=true&w=majority&appName=Cluster0')
// >>>>>>> origin/master
