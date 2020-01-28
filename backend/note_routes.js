module.exports = function (app, cityCollection) {
  app.get('/cities', async (req, res) => {
    const cityList = await cityCollection.find().toArray();
    res.send(cityList);
  });

  app.post('/cities', (req, res) => {
    cityCollection.insertMany(req.body);
    res.send({ message: 'Hello' })
  });

  app.post('/city', (req, res) => {
    cityCollection.insert(req.body);
    res.send({ message: 'Hello' })
  });
};
