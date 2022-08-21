import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
} from 'react-native';
import CoinItem from './components/CoinItem';
import Ionicons from '@expo/vector-icons/Ionicons';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // usamos un hooks para agregar la peticipon
  const loadData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={style.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={style.header}>
        <Text style={style.title}>CoinsNerdify</Text>

        <View style={style.search}>
          <TextInput
            style={style.searchInput}
            placeholder="Search a Coins"
            placeholderTextColor="#858585"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setSearch(text)}
          />
          <Ionicons style={style.icon} name="search" size={16} />
        </View>
      </View>

      <FlatList
        style={style.list}
        showsVerticalScrollIndicator={false}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({item}) => {
          return <CoinItem coin={item} />;
        }}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: '90%',
  },
  header: {
    width: '90%',
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,
  },
  icon: {
    color: 'white',
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '90%',
    textAlign: 'left',
  },
});

export default App;
