import ItemCarrinhoSuspenso from "@/components/CarrinhoSuspenso/ItemCarrinhoSuspenso";
import ItemCarrinho from "@/components/ItemCarrinho";
import { useLocation } from "react-router-dom";

const ListaProdutosCarrinho = ({carrinho, setCarrinho}) => {

  const removerProduto = (produtoParaRemover) => {

    if(produtoParaRemover.quantidade > 1){
      setCarrinho(prev => prev.map((item) => {
        if(item.id === produtoParaRemover.id){
          item.quantidade -= 1;
          return item;
        }
      }))
    }

    if(produtoParaRemover.quantidade === 1){
      setCarrinho(prev => prev.map((item, index) => {
        if(item.id === produtoParaRemover.id){
          prev.splice(index, 1);
          return prev;
        }
      }))
    }
  }

  // if(itemDoCarrinho.id === produtoParaRemover.id) {
  //   console.log(itemDoCarrinho)
  // }
  // if(produtoParaRemover.quantidade > 1){
  //   produtoParaRemover.quantidade -= 1;
  // } 
  // produtoParaRemover.quantidade = 0;
  // carrinho.splice(itemDoCarrinho, 1);      


  const location = useLocation();
  return (
    <ul className="list-unstyled">
      {carrinho.length === 0 ? (
        <p className="text-center my-5">Não há produtos no carrinho</p>
      ) : (
        carrinho.map((itemCarrinho) => {
          return location.pathname === "/carrinho" ? (
            <ItemCarrinho key={itemCarrinho.id} itemCarrinho={itemCarrinho} removerProduto={removerProduto}/>
          ) : (
            <ItemCarrinhoSuspenso key={itemCarrinho.id} itemCarrinho={itemCarrinho} removerProduto={removerProduto}/>
          );
        })
      )}
    </ul>
  );
};

export default ListaProdutosCarrinho;
