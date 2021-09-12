import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const App = () => {
  
  const [coins, setCoins] = useState([])



  // usamos un hooks para agregar la peticipon
  const loadData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    const data = await res.json();
    setCoins(data)
  };

  useEffect(() => {
    console.log('loading');
    loadData()
  }, []);

  return (
    <View>
      <Text>Hola desde React Native</Text>
    </View>
  );
};

export default App;
