<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Dados;{

class DadosController extends Controller
{
    public function status(){
        return['status' =>'ok'];
    }
    public function add(request $request){
        try{
            $dados = new Dados();
            $dados->autor = $request->autor;
            $dados->livro = $request->livro;
            $dados->editora = $request->editora;
            $dados->genero = $request->genero;
            $dados->nascimento = $request->nascimento;
            $dados->sexo = request->sexo;
            $dados->nacionalidade = $request->nascionalidade;
            $dados->lancamento = $request->lancamento;

            $dados->save();
            return ['retorno'=>'dados salvos'];
        }catch (\exception $erro){
            return ['retorno'=>'erro','details'=>$erro];
        }
    }
    public function list(){
        $dados = Dados::all();
        return $dados;
    }
    public function select( $id){
         $dados = Dados::find($id);

        return $dados;
    }

    public function update(request $request, $id {
        try{
            $dados = Dados:: find($id);
            $dados->autor = $request->autor;
            $dados->livro = $request->livro;
            $dados->editora = $request->editora;
            $dados->genero = $request->genero;
            $dados->nascimento = $request->nascimento;
            $dados->sexo = request->sexo;
            $dados->nacionalidade = $request->nascionalidade;
            $dados->lancamento = $request->lancamento;
            $dados -> save();
            return ['retorno'=>'salvo', 'data'=>$request]
        }catch (\Exception $erro){
            return ['retorno'=>'erro','details'=>$erro];

        }
    }
    public function delete(sid){
        try{
            $dados = Dados::find(id);
            $dados->delete();
            return ['retorno'=>'ok']
        }catch (\Exception $)
    }

}
