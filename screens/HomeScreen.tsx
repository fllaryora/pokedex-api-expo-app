import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../props";
import styles from "../css/stiles";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon?limit=4&offset=0";
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;


const HomeScreen: React.FC<HomeScreenProps> = (props) =>  {

    const [firstGenPokemonDetails, setFirstGenPokemonDetails] = useState<any | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    useEffect(() => {
      //console.log(navigation);

        const fetchFirstGenPokemons = async () => {
          //const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
          const firstGenPokemonIdsResponse = await axios.get(firstGenPokemonPath);
          
          //const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();
          let firstGenPokemonIdsBody = firstGenPokemonIdsResponse.data.results;
          
          //console.log(firstGenPokemonIdsBody);
          firstGenPokemonIdsBody = firstGenPokemonIdsBody.map( (eachPokemon:any) => {
           
            let result = eachPokemon.name.charAt(0).toUpperCase() + eachPokemon.name.slice(1);
            eachPokemon.name = result;
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
          console.log("FIN");
        };
        fetchFirstGenPokemons();
      }, []);
      
      return (
        <View>
          <Text style={styles.h1}>List of pokemons</Text>
          { isLoading ? <ActivityIndicator/>:
          (<FlatList
          data={firstGenPokemonDetails}
          renderItem={({item}) => <Text style={styles.h1}>{item.name}</Text>}
          />)
          }
                   
        </View>
      );
};

export default HomeScreen;