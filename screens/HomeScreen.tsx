import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { NativeStackScreenProps,
   NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../props";
import styles from "../css/stiles";
import PokemonItem from "../component/Card";
import type { RouteProp } from '@react-navigation/native';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=4&offset=0";
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;

interface HomeProps {
  route: RouteProp<RootStackParamList, "Home">;
  navigation: NativeStackNavigationProp<RootStackParamList, "Home", undefined>;
}

const HomeScreen: React.FC<HomeScreenProps> = (props: HomeProps): React.JSX.Element =>  {

    const [firstGenPokemonDetails, setFirstGenPokemonDetails] = useState<any | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    //console.log(props.navigation);
    //console.log(props.route);
    useEffect(() => {

        const fetchFirstGenPokemons = async () => {
          //const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
          const firstGenPokemonIdsResponse = await axios.get(firstGenPokemonPath);
          
          //const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();
          let firstGenPokemonIdsBody = firstGenPokemonIdsResponse.data.results;
          let nro = 1;
          //console.log(firstGenPokemonIdsBody);
          firstGenPokemonIdsBody = firstGenPokemonIdsBody.map( (eachPokemon:any) => {
           
            let result = eachPokemon.name.charAt(0).toUpperCase() + eachPokemon.name.slice(1);
            eachPokemon.name = result;
            eachPokemon.nro = nro;
            nro = nro + 1;
            return eachPokemon;
          });
        
          //const listWithDetails = await Promise.all(
          //  firstGenPokemonIdsBody.results.map(async (eachPokemon) => {
          //    const pDetails = await fetch(eachPokemon.url);
          //    return await pDetails.json();
          //  })
          //);
    
          setFirstGenPokemonDetails(firstGenPokemonIdsBody);
          setLoading(false);
         
        };
        fetchFirstGenPokemons();
      }, []);
      
      return (
        <View >
          <Text style={styles.h1}>List of pokemons</Text>
          { isLoading ? <ActivityIndicator/>:
          (<FlatList
          data={firstGenPokemonDetails}
          renderItem={({item}) => <PokemonItem item={item} navigation={ props.navigation}/>}
          style ={{marginBottom: 100}}
          />)
          }
                   
        </View>
      );
};

export default HomeScreen;