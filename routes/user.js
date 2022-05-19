const { Router } = require("express");
const { check, validationResult } = require("express-validator"); 
const { create, update, get, destroy } = require("../mvc/controller/user");
const router = Router();  //Enables to create separate routes

router.get("/", async (req, res) => {
    const { userId } = req;

    const user = await get(userId);

    res.send(user);
});

router.post("/", 
    check('name').trim().isEmpty().withMessage('Name is mandatory'),
    check('email')
    .trim().isEmail()
    .withMessage('Invalid email')
    .not().isEmpty().withMessage('Email is mandatory'),
    check('password').trim().isLength({min: 5})
    .withMessage('Invalid password')
    .not().isEmpty()
    .withMessage('Password is mandatory'),
    async (req, res) => {
    const errors = validationResult(req); 

    if(!errors.isEmpty()) {
        return res.status(400).send({message: errors.array()}); 
    }

    const { name, email, password } = req.body;

    const user = await create(name, email, password);

    res.send(user);
});

router.put("/", async (req, res) => {
    const { name, password } = req.body;
    const { userId } = req;

    const user = await update(userId, name, password);

    res.send(user);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const user = await destroy(id);

    res.send("User deleted successfully");
});

module.exports = router; //Loads the router so that it can be used 