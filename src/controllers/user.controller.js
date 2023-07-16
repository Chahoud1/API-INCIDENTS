// aqui fica a função de callback

const soma = (req, res) => {
    const soma = 200 + 200;
    res.send({ soma: soma });
};

module.exports = { soma };