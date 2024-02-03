import { useContext } from "react"
import CarrinhoContext from "@/context/CarrinhoContext";
import {
    ADD_PRODUTO,
    REMOVE_PRODUTO,
    UPDATE_QUANTIDADE,
  } from "@/reducers/carrinhoReducer";

const addProdutoAction = (novoProduto) => ({
  type: ADD_PRODUTO,
  payload: novoProduto,
});

const removeProdutoAction = (produtoParaRemover) => ({
  type: REMOVE_PRODUTO,
  payload: produtoParaRemover,
});
  
const updateQuantidadeAction = (produtoId, quantidade) => ({
  type: UPDATE_QUANTIDADE,
   payload: { produtoId, quantidade },
});

export const useCarrinhoContext = () => {
    const { carrinho, dispatch, quantidade, valorTotal } =  useContext(CarrinhoContext);

    const adicionarProduto = (novoProduto) => {
        dispatch(addProdutoAction(novoProduto));
    }

    const removerProduto = (produtoParaRemover) => {
        const produto = carrinho.find((item) => item.id === produtoParaRemover.id);

        if (produto && produto.quantidade > 1) {
        dispatch(updateQuantidadeAction(produtoParaRemover.id, produto.quantidade - 1));
        } else {
        dispatch(removeProdutoAction(produtoParaRemover));
        }
    }

    const removerProdutoDoCarrinho = (produtoParaRemover) => {
        dispatch(removeProdutoAction(produtoParaRemover));
    }

  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoDoCarrinho,
    valorTotal,
    quantidade,
  };
};