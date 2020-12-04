const UserSchemas = require("../schemas/UserSchema");
const usersRepository = require("../repositories/usersRepositories");
const bcrypt = require('bcrypt');
const sessionRepositories = require("../repositories/sessionRepositories");
async function postSignUp(req, res) {
    const userParams = req.body;
    try{
      const { error } = UserSchemas.signUp.validate(userParams);
      if (error) return res.status(422).send({ error: error.details[0].message });

      if (await usersRepository.findEmail(userParams.email)) {
        return res.status(409).json({ error: "Email já está em uso!" });
      }
      const user = await usersRepository.create(userParams);
      console.log(user);
      const userData = getUserData(user);
    
      res.status(201).send(userData);
    } catch(error){
      console.error(error);
    }
  }
  async function postSignIn(req, res) {
    const userParams = req.body;
    try{
      const { error } = UserSchemas.signIn.validate(userParams);
      if (error) return res.status(422).send({ error: error.details[0].message });
      const user = await usersRepository.findEmail(userParams.email);
    
      if(!user) {
        return res.status(401).json({ error: "Email ou senha errado!" });
      }
      if(!bcrypt.compareSync(userParams.password,user.password)){
        return res.status(401).json({ error: "Email ou senha errado!" });
      }
      const userData = getUserData(user);
      const { Token } = await sessionRepositories.createSession(userData.id);
 
      res.status(200).send({...userData,Token});
    } catch(error){
      console.error(error);
    }
  }
  function getUserData(user){
    const { name, email , id } = user;
    return { name, email, id };
  }
  module.exports = { postSignUp, postSignIn };