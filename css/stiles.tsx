
import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1:{
        fontSize:28,
        marginVertical: 25,
        textAlign: "center",
    },
    pokemonContainer: { backgroundColor: "lightgrey", marginTop: 10 },
    pokemonTitle: {
      fontSize: 32,
      alignSelf: "center",
      marginTop: 10,
    },
    pokemonSprite: {
      width: 200,
      height: 200,
      alignSelf: "center",
    },
  });

export default styles;
