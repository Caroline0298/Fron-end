import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import { 
    Table, 
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';

class FormProduct extends Component {

    state = { 
        model: { 
            id: 0, 
            autor :"",
            livro :"",
            editora: "" ,
            genero :"",
            nascimentos:0,
            sexo:0,
            nacionalidade :0,
            lancamentoento:0,
        } 
    };

    setValues = (e, field) => {
        const { model } = this.state;
        model[field] = e.target.value;
        this.setState({ model });
    }

    create = () => {
        this.setState({ model: {  id: 0, 
            autor :"",
            livro :"",
            editora: "" ,
            genero :"",
            nascimentos:0,
            sexo:0,
            nacionalidade :0,
            lancamentoento:0} })
        this.props.productCreate(this.state.model);
    }

    componentWillMount() {
        PubSub.subscribe('edit-product', (topic, product) => {
            this.setState({ model: product });
        });
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="autor">Autor:</Label>
                    <Input id="autor" type="text" value={this.state.model.autor} placeholder="nome do autor..."
                    onChange={e => this.setValues(e, 'autor') } />
                </FormGroup>
                <FormGroup>
                    <div className="form-row">
                        <div className="col-md-6">
                            <Label for="livro">Livro:</Label>
                            <Input id="livro" type="text"  value={this.state.model.livro} placeholder="livro " 
                            onChange={e => this.setValues(e, 'livro') } />
                        </div>
                        <div className="col-md-6">
                            <Label for="editora">Editora:</Label>
                            <Input id="editora" type="text" value={this.state.model.editora} placeholder="nome da editora" 
                            onChange={e => this.setValues(e, 'editora') } />
                        </div>
                        <div className="col-md-6">
                            <Label for="genero">Genero:</Label>
                            <Input id="genero" type="text" value={this.state.model.genero} placeholder="genero literario" 
                            onChange={e => this.setValues(e, 'genero') } />
                        </div>
                        <div className="col-md-6">
                            <Label for="lancamento">Lancamento:</Label>
                            <Input id="lancamento" type="lancamento" value={this.state.model.lancamento} placeholder="data de lancamento" 
                            onChange={e => this.setValues(e, 'lancamento') } />
                        </div>
                        <div className="col-md-6">
                            <Label for="sexo">Sexo:</Label>
                            <Input id="sexo" type="sexo" value={this.state.model.sexo} placeholder="Genero do autor" 
                            onChange={e => this.setValues(e, 'sexo') } />
                        </div>
                        <div className="col-md-6">
                            <Label for="nacionalidade">Nacionalidade:</Label>
                            <Input id="nacionalidade" type="nacionalidade" value={this.state.model.nacionalidade} placeholder="nacionalidade do autor?" 
                            onChange={e => this.setValues(e, 'nacionalidade') } />
                        </div>
                        <div className="col-md-6">
                            <Label for="nascimento">Nascimento:</Label>
                            <Input id="nascimento" type="nascimento" value={this.state.model.nascimento} placeholder="data de nascimento do autor" 
                            onChange={e => this.setValues(e, 'nascimento') } />
                        </div>
                    </div>
                </FormGroup>
                <Button color="primary" block onClick={this.create}> Gravar </Button>
            </Form>
        );
    }
}

class ListDados extends Component {

    delete = (autor) => {
        this.props.deleteAutor(autor);
    }
    delete = (editora) => {
        this.props.deleteEditora(editora);
    }
    delete = (genero) => {
        this.props.deleteGenero(genero);
    }
    delete = (Livros) => {
        this.props.deleteLivros(Livro);
    }

    onEdit = (livro) => {
        PubSub.publish('edit-livro', livro);
    }

    render() {
        const { dados} = this.props;
        return (
            <Table className="table-bordered text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Autor</th>
                        <th>Livro</th>
                        <th>Editora.</th>
                        <th>Genero</th>
                        <th>Nascimento</th>
                        <th>Sexo</th>
                        <th>Nascimento</th>
                        <th>Lancamento</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(Dados => (
                            <tr key={dados.id}>
                                <td>{dados.autor}</td>
                                <td>{dados.livro}</td>
                                <td>{dados.editoria}</td>
                                <td>{dados.genero}</td>
                                <td>{dados.lancamento}</td>
                                <td>{dados.nascimento}</td>
                                <td>{dados.sexo}</td>

                                <td>
                                    <Button color="info" size="sm" onClick={e => this.onEdit(dados)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={e => this.delete(dados.id)}>Deletar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        );
    }   
}

export default class ProductBox extends Component {

    Url = 'http://localhost:3000/dados';

    state = {
       dados: [],
        message: {
            text: '',
            alert: ''
        }
    }

    componentDidMount() {
        fetch(this.Url)
            .then(response => response.json())
            .then(dados => this.setState({ dados }))
            .catch(e => console.log(e));
    }

    save = (dados) => {
        let data = {
            id: parseInt(product.id),
            autor :parseFloat(dados.autor),
            livro :parseFloat(dados.livro),
            editora: parseFloat(dados.editora),
            genero :parseFloat(dados.genero),
            nascimentos:parseFloat(dados.nascimento),
            sexo:parseFloat(dados.sexo),
            nacionalidade :parseFloat(dados.nacionalidade),
            lancamentoento:parseFloat(dados.lancamentoento),
        };
        console.log(data);

        const requestInfo = {
            method: data.id !== 0? 'PUT': 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        if(data.id === 0) {
            // CREATE NEW PRODUCT
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newProduct => {
                let { dados } = this.state;
               dados.push(newDados);
                this.setState({ dados, message: { text: 'os novos dados foram cadastrados com sucesso!', alert: 'success' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        } else {
            // EDIT PRODUCT
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedDados => {
                let { Dados } = this.state;
                let position = dados.findIndex(product => dados.id === data.id);
                dados[position] = updatedDados;
                this.setState({dados, message: { text: 'os dados foram atualizados com sucesso!', alert: 'info' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e)); 
        }
    }

    delete = (id) => {
        fetch(`${this.Url}/${id}`, {method: 'DELETE'})
            .then(response => response.json())
            .then(rows => {
                const dados = this.state.dados.filter(dados => dados.id !== id);
                this.setState({ dados,  message: { text: 'Dados deletados com sucesso.', alert: 'danger' } });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout(() => {
            this.setState({ message: { text: '', alert: ''} });
        }, duration);
    }

    render() {
        return (
            <div>
                {
                    this.state.message.text !== ''? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : ''
                }

                <div className="row">
    
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Cadastro de Livros</h2>
                        <FormProduct productCreate={this.save} />
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className="font-weight-bold text-center"> Lista de Livros </h2>
                        <ListaDados dados={this.state.dados}  deleteDados={this.delete} />
                    </div>
                </div>
            </div>
        );
    }
}