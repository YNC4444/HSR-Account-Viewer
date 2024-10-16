var express = require("express");
var router = express.Router();

var model = require("./api");

// convert query string formats from form data into JSON format
router.use(express.urlencoded({ extended: true}));
router.use(express.json());

// route definitions
router.get("/", (request, response) => {
  response.render("index", { title: "Home" });
}); // home page before submitting the form
router.get("/dashboard", async (request, response) => {
  response.render("dashboard", { title: "Dashboard" });
});
router.get("/characters", async (request, response) => {
  try{
    const characters = await model.listAllCharacters();
    response.render('characters', { title: "Characters", characters});
  } catch(error){
    console.log("Error:", error)
    response.status(500).send("Error occurred while processing request")
  }
});
router.get("/lightcones", async (request, response) => {
  try{
    const lightcones = await model.listAllLightCones();
    response.render("lightcones", { title: "Light Cones", lightcones });
  } catch(error) {
    console.log("Error:", error)
    response.status(500).send("Error occurred while processing request")
  }
});

// form processing paths
router.post('/', async (request, response) => {
  let uid = request.body.uid;
  // console.log('Headers:', request.headers);
  try {
    const userDashboard = await model.getUserDashboard(uid);
    // return data in json format when fetching user data (for use later in localStorage)
    if (request.headers['content-type'] === 'application/json'){
      return response.json(userDashboard);
    }
    response.render("index", { title: "User Dashboard", userDashboard });
  } catch(error) {
    console.log("Error:", error)
    // make a popup when the api itself is down
    response.status(404).send('Failed to fetch user info: AxiosError: Request failed with status code 404, the API is currently down.')
    response.status(500).send("an error occurred while processing the request")
  }
});

module.exports = router;