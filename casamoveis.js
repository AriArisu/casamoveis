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

const UsuarioSchema = new mongoose.Schema({
  email : {type : String, required : true},
  senha : {type : String}
});


const casamoveisSchema = new mongoose.Schema({
    id_produtomoveis: { type: String,required: true },
    Descrição: { type: String},
    Marca: { type: String},
    Data_fabricação: { type: Date},
    Quantidade_estoque: { type: Number,},
  });

  const Usuario = mongoose.model("Usuario", UsuarioSchema);
  const casamoveis = mongoose.model("casamoveis",casamoveisSchema)

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

app.post("/cadastrocasamoveis", async (req, res) => {
   
   
  const id_produtomoveis = req.body.id_produtomoveis;
  const Descrição = req.body.Descrição;
  const Marca = req.body.Marca;
  const Data_fabricação = req.body.Data_fabricação;
  const Quantidade_estoque = req.body.Quantidade_estoque;
   
  const produtomoveis = new produtomoveis({
    id_produtomoveis : id_produtomoveis,
     Descrição : Descrição,
     Marca : Marca,
     Data_fabricação : Data_fabricação,
     Quantidade_estoque : Quantidade_estoque,
  });

  try {
    const newProdutomoveis = await produtomoveis.save();
    res.json({ error: null, msg: "Cadastro ok", ProdutocabeloId: newProdutomoveis._id });
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