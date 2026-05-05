import { View, Text, FlatList, Image } from 'react-native'
import Hr from './Hr';

const Aula03_Exercicio = () => {

    const produto= [
        { id: 1, produto: 'Xbox Series X', foto: 'https://m.media-amazon.com/images/I/516pVDAQMnL._AC_SX679_.jpg', categoria: 'Consoles', Preço: 5000, estoque: 10 },
        { id: 2, produto: 'Adidas CL Response X Bad Bunny', foto: 'https://cdn-images.farfetch-contents.com/17/58/89/47/17588947_36598235_600.jpg', categoria: 'Calçados', Preço: 1500, estoque: 20 },
        { id: 3, produto: 'Monitor Samsung Odyssey 5G', foto: 'https://http2.mlstatic.com/D_NQ_NP_2X_896862-MLA99948617421_112025-F.webp', categoria: 'Eletrônicos', Preço: 3000, estoque: 5 },
        { id: 4, produto: 'Blasphemous2', foto: 'https://http2.mlstatic.com/D_NQ_NP_2X_903409-MLA99522251198_122025-F.webp', categoria: 'Jogos', Preço: 200, estoque: 15 },
    ];

    const exibirItensLista = ({ item }) =>
    (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>{item.id}º</Text>
            <Image source={{ uri: item.foto }} style={{ width: 100, height: 100 }} />
            <Text>Produto: {item.produto}</Text>
            <Text>Categoria: {item.categoria}</Text>
            <Text>Estoque: {item.estoque}</Text>
        </View>
    )

    return (
        <View>
            <Hr />
            <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: 'bold', flex: 1 }}>
                Lista de Produtos
            </Text>
            <FlatList
                data={produto}
                renderItem={exibirItensLista}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Aula03_Exercicio;