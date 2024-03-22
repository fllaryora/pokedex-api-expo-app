import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { NativeStackScreenProps,
   NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../props";
import styles from "../css/stiles";

import type { RouteProp } from '@react-navigation/native';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon/1/";
const firstGenPokemonPath = `${pokePath}${pokeQuery}`;

interface DetailsProps {
  route: RouteProp<RootStackParamList, "Details">;
  navigation: NativeStackNavigationProp<RootStackParamList, "Details", undefined>;
}

const DetailsScreen: React.FC<DetailsScreenProps> = (props: DetailsProps): React.JSX.Element =>  {

    const [firstGenPokemonDetails, setFirstGenPokemonDetails] = useState<any | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    console.log(props.navigation);
    console.log(props.route);
    useEffect(() => {

        const fetchFirstGenPokemons = async () => {
          //const firstGenPokemonIdsResponse = await fetch(firstGenPokemonPath);
          const firstGenPokemonIdsResponse = await axios.get(firstGenPokemonPath);
          
          //const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json();
          let firstGenPokemonIdsBody = firstGenPokemonIdsResponse.data;
         
          setFirstGenPokemonDetails(firstGenPokemonIdsBody);
          setLoading(false);
         
        };
        fetchFirstGenPokemons();
      }, []);
      
      return (
        <View >
          <Text style={styles.h1}>Details of the pokemon</Text>
  
                   
        </View>
      );
};

export default DetailsScreen;