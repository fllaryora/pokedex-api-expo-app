import { useState, useEffect } from "react";
import axios from "axios";
import { View, Text,
   ActivityIndicator, 
   FlatList, Dimensions, Image , ScrollView} from "react-native";
import { NativeStackScreenProps,
   NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../props";
import styles from "../css/stiles";

import type { RouteProp } from '@react-navigation/native';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, "Details">;

const pokePath = "https://pokeapi.co/api/v2/";
const pokeQuery = "pokemon/";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

interface DetailsProps {
  route: RouteProp<RootStackParamList, "Details">;
  navigation: NativeStackNavigationProp<RootStackParamList, "Details", undefined>;
}

/*function removeNullUndefinedWithReduce(obj:any) {
      return Object.entries(obj).reduce(
        (acc:any, [key, value]) => {
          if (value !== null && value !== undefined) {
              //acc[key] = typeof value === 'object' ?  removeNullUndefinedWithReduce(value) : value;
              if(typeof value === 'object'){
                acc[key] = removeNullUndefinedWithReduce(value);
              } else {
                acc[key] = value;
              }
          }
          return acc;
      }, {});
    }*/

    function generateSprintList(obj:any):string[] {
      return Object.entries(obj).reduce(
        (acc:string[], [key, value]) => {
          if (value !== null && value !== undefined) {
              if(typeof value === 'object') {
                return acc.concat(generateSprintList(value));
              } else {
                if(typeof value === 'string') {
                  acc.push(value);
                }
              }
          }
          return acc;
      }, []);
    }

const DetailsScreen: React.FC<DetailsScreenProps> = (props:DetailsProps): React.JSX.Element =>  {

    const [data, setData] = useState<any | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    const withContainer = width * 0.7;
    const space = 10;
    

    useEffect(() => {
      const firstGenPokemonPath = `${pokePath}${pokeQuery}${props.route.params.nroPokemon}/`;
      
        const fetchFirstGenPokemons = async () => {

          const firstGenPokemonIdsResponse = await axios.get(firstGenPokemonPath);
          let pokemon = firstGenPokemonIdsResponse.data;
          let result = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          pokemon.name = result;

          pokemon.types.map( (eachType:any) => {
            let result = eachType.type.name.charAt(0).toUpperCase() + eachType.type.name.slice(1);
            eachType.type.name = result;
            return eachType;
          });

          pokemon.stats.map( (eachStat:any) => {
            let result = eachStat.stat.name.charAt(0).toUpperCase() + eachStat.stat.name.slice(1);
            eachStat.stat.name = result;
            return eachStat;
          });

          pokemon.moves.map( (eachMove:any) => {
            let result = eachMove.move.name.charAt(0).toUpperCase() + eachMove.move.name.slice(1);
            eachMove.move.name = result;
            return eachMove;
          });
          //console.log(pokemon.sprites);
          let imagesURL = generateSprintList(pokemon.sprites);
           
          
          setImages(imagesURL);
          setData(pokemon);
          setLoading(false);
        };

        fetchFirstGenPokemons();
      }, []);
      
      return (
        <View style={ {
          backgroundColor: '#5EF09C',
          height: height,
          width: width,
          paddingBottom: 100
        }}>
          <Text style={styles.h1}>Details of the pokemon</Text>
          { isLoading ? <ActivityIndicator/>:
          (<>
          <ScrollView 
            horizontal={false}
          >
            <Text style={{ height: height*0.05,}} >#{data.id}</Text>

            <Text style={{ height: height*0.05,}} >Name: {data.name}</Text>

            <FlatList
              data={images}
              keyExtractor={(item)=> item}
              horizontal={true}
              style={{
                marginStart:width*0.02,
                marginEnd:width*0.02,
                height: "50%",
              }}

              renderItem={({item, index}) => {
                return (
                  <View style={{
                    width:withContainer,
                  }}>
                    <View style={{
                      margin:space,
                      padding:space,
                      backgroundColor:'#fff',
                      borderRadius:34,
                      alignItems:"center",
                    }}>
                      <Image source={{uri:item}} style={{
                          width:"100%",
                          height:withContainer * 1.2,
                          resizeMode:"cover",
                          borderRadius:34,
                          margin:0,
                          marginBottom:10,
                      }}/>
                    </View>
                    
                  </View>
                );
              }}
            />
            <Text style={{height: height*0.05,}} >Weight: {data.weight}</Text>
            <Text style={{ height: height*0.05,}}>Height: {data.height}</Text>
            <Text style={{ height: height*0.05,}}>Types: </Text>
            <FlatList
              data={data.types}
              style={{
                marginStart:30,
                height: height*0.1,
              }}
              renderItem={({item}) => <Text>{item.type.name}</Text>}
            />
            <Text>Stats: </Text>
            <FlatList
              data={data.stats}
              style={{
                marginStart:30,
                height: height*0.22,}}
              renderItem={({item}) => <Text>{item.stat.name} {item.base_stat}</Text>}
            />
            <Text style={{ height: height*0.05,}}>Moves: </Text>
            <FlatList
              data={data.moves}
              style={ {
                height: height*0.4,
                backgroundColor: '#ffffff',
                marginStart:30,
                marginBottom: 100,
              }}
              renderItem={({item}) => <Text>{item.move.name}</Text>}
            />

          </ScrollView>
            
            </>)
          }
  
        </View>
      );
};

export default DetailsScreen;