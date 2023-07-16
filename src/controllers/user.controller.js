// aqui fica a função de callback

const create = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).send({ message: "erro" })
    }


    res.status(201).send({
        menssage: "user created successfully",
        user: {
            name,
            email
        }
    });
};

module.exports = { create };