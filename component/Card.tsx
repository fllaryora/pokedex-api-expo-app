import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../css/stiles";
import { RootStackParamList } from "../props";
import {   NativeStackNavigationProp } from "@react-navigation/native-stack";
  

interface PokemonProps {
    //title: string;
    item: any;
    navigation: NativeStackNavigationProp<RootStackParamList, "Home", undefined>;
  }

const sprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const PokemonItem:React.FC<PokemonProps> = ({item, navigation}): JSX.Element  => {
    const customSprite = `${sprite}${item.nro}.png`;

    //console.log(customSprite);
    return (
      <View style={styles.pokemonContainer} >
        <TouchableOpacity onPress={ ()=>navigation.navigate("Details")}>
        <Text style={styles.pokemonTitle}>
          {item.name}
        </Text>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: customSprite,
          }}
        />
        </TouchableOpacity>
      </View>
    );
  };

 export default PokemonItem;