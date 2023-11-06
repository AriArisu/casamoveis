const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/dbcasamoveis", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const casamoveis = new mongoose.Schema({
    id_produtomoveis: { type: String,required: true },
    Descrição: { type: String,required: true },
    Marca: { type: String,required: true },
    Data_fabricação: { type: Date,required: true },
    Quantidade_estoque: { type: Number,},
  });

  const casamoveis = mongoose.model("casamoveis", casamoveis);

  app.post("/usuario", async (req, res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    if( email == null || senha == null ){
      return res.status(400).json({error : "Preenchar todos os campos!!!"});
    }
  
    const emailExiste = await usuariosuario.findOne({email : email});
  
    if(emailExiste){
      return res.status(400).json({error : "O email informado já existe"});
    }
  
    
    const usuario = new Usuario({
  
      email: email,
      senha: senha,
    });
    
  try {
    const newUsuario = await usuario.save();
    res.json({ error: null, msg: "Cadastro ok", UsuarioId: newUsuario._id });
  } catch (error) {}
});

app.get("/cadastrousuario", async (req, res) => {
  res.sendFile(__dirname + "/cadastrousuario.html");
});

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});