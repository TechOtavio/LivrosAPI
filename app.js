//Importações das bibliotecas
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Livro from "./Models/livro.js";

const app = express();

//Middwares
app.use(express.json());
dotenv.config();

const porta = process.env.PORTA || 3000;

//Conexão Banco de Dados (MongoDB)
const conectarBanco =  async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Banco de dados conectado!");

        app.listen(porta, () => {
            console.log(`Servidor rodando na porta ${porta}.`);
        })


    }catch (error){
        console.log("Erro ao conectar no banco: ", error);
        process.exit(1);
    }
};
conectarBanco();


app.get('/livros', async (req, res) => {
    try {
        const listaLivros = await Livro.find({});
        res.status(200).json(listaLivros);
    } catch (error) {
        res.status(500).json({ error: error })
    }
});

app.get('/livros/:id', async (req, res) => {
    try {
        const id = req.params.id; 
        const livroEspecifico = await Livro.findById(id);

        if(livroEspecifico){
            res.status(200).json(livroEspecifico);  
        }else{
            res.status(404).json({ message: 'Livro não encontrado!' });
        }   
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/livros', async (req, res) => {
    try {
        const novoLivro = await Livro.create(req.body);

        console.log(`Novo livro adicionado: ${novoLivro.titulo}`);
        res.status(201).json(novoLivro);   
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

app.put('/livros/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const livroAtualizado = await Livro.findByIdAndUpdate(id, req.body, { new: true });
        if(livroAtualizado){
            res.status(200).json({livroAtualizado})
        }else{
            res.status(404).json({ message: 'Livro não encontrado!'})
        }

    } catch (error) {
        res.status(500).json({ error: error });
    }
})

app.delete('/livros/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const livroDeletado = await Livro.findByIdAndDelete(id);
        if(livroDeletado){
            res.status(200).json({ message: 'Livro deletado com sucesso!' });
        }else{
            res.status(404).json({ message: 'Livro não encontrado para deletar!'});
        }


    } catch (error) {
        res.status(500).json({ error: error });
    }
})
