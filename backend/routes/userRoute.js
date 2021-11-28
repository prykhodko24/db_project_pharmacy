import express from 'express';
import { getToken, isAuth } from '../util';
import sequelize from '../sequelize';

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const userRef = await sequelize.models.user.findByPk(userId);
  const user = userRef.get();
  if (user && req.body.id === id) {
    await models.user.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).end();
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/signin', async (req, res) => {
  const userRef = await sequelize.models.user.findOne({
    where: {
      email: req.body.email,
    },
  });
  const user = userRef?.get();
  if (user && user.password === req.body.password) {
    res.send({
      id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      role: signinUser.role,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: 'Invalid User Data.' });
  }
});

router.post('/register', async (req, res) => {
  console.log(req.body);
  try {
    const newUserRef = await sequelize.models.user.create({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      birthDate: req.body.birthDate,
      password: req.body.password,
    });
    const newUser = newUserRef.get();
    if (!newUser) throw new Error();

    return res.send({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: getToken(newUser),
    });
  } catch (e) {
    return res.status(401).send({ message: 'Invalid User Data.' });
  }
});

router.get('/createadmin', async (req, res) => {
  try {
    const newUserRef = await sequelize.models.user.create({
      name: 'Kate',
      suname: 'Kravtsova',
      email: 'admin@example.com',
      birthDate: '2013-01-01T22:00:00.000Z',
      password: '1234',
    });
    res.send(newUserRef.get());
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
