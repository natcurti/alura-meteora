import { useContext, useEffect, useMemo } from "react"
import CarrinhoContext from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
    const {
        carrinho, 
        setCarrinho, 
        quantidade, 
        setQuantidade, 
        valorTotal, 
        setValorTotal
    } = useContext(CarrinhoContext);

    const alteraQuantidade = (produto, quantidade) => {
        return carrinho.map((item) => {
            if(item.id === produto.id) item.quantidade += quantidade;
            return item;
        })
    }

    const adicionarProduto = (novoProduto) => {
      const temOProduto = carrinho.some((itemDoCarrinho) => itemDoCarrinho.id === novoProduto.id);
  
      if(!temOProduto){
        novoProduto.quantidade = 1;
        return setCarrinho((carrinhoAnterior) => [
          ...carrinhoAnterior,
          novoProduto
        ])
      }

      const carrinhoAtualizado = alteraQuantidade(novoProduto, 1);
  
      setCarrinho([...carrinhoAtualizado]);
    }

    const removerProduto = (produtoParaRemover) => {

        if(produtoParaRemover.quantidade > 1){
            const carrinhoAtualizado = alteraQuantidade(produtoParaRemover, -1);
            setCarrinho([...carrinhoAtualizado]);
        } else {
            removerProdutoDoCarrinho(produtoParaRemover);
        }
        
      }

    const removerProdutoDoCarrinho = (produtoParaRemover) => {
        const carrinhoAtualizado = carrinho.filter((item) => item.id !== produtoParaRemover.id);
        setCarrinho([...carrinhoAtualizado]);
    }

    const {totalTemp, quantidadeTemp} = useMemo(() => {
        return carrinho.reduce((acumulador, produto) => ({
            quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
            totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
        }), {
            quantidadeTemp: 0,
            totalTemp: 0,
        })
    }, [carrinho]) 

    useEffect(() => {
        setQuantidade(quantidadeTemp);
        setValorTotal(totalTemp);
    }, [carrinho]);

    return{
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoDoCarrinho,
        valorTotal,
        quantidade
    }
}