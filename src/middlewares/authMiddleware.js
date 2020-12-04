const sessionsRepository = require("../repositories/sessionRepositories");
const usersRepository = require("../repositories/usersRepositories");

async function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send({ error: 'Auth header not found' });

    const token = authHeader.replace('Bearer ', '');
    const session = await sessionsRepository.findByToken(token);
    console.log(session);

    if (!session) return res.status(401).send({ error: 'Invalid token' });

    const user = usersRepository.findById(session.UserId);
    if (!user) return res.status(401).json({ error: 'Invalid token' });
  
    req.user = user;
    req.session = session;
  
    next();
}

module.exports = authMiddleware;