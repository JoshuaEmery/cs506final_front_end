import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Square from "./components/Square";
const gameState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.gameBoard}>
        {gameState.map((row) => {
          return (
            <View style={styles.row}>
              {row.map((value) => {
                return <Square text={value}></Square>;
              })}
            </View>
          );
        })}
        {/* <View style={styles.row}>
          <Square text="0,0"></Square>
          <Square text="0,1"></Square>
          <Square text="0,2"></Square>
        </View>
        <View style={styles.row}>
          <Square text="1,0"></Square>
          <Square text="1,1"></Square>
          <Square text="1,2"></Square>
        </View>
        <View style={styles.row}>
          <Square text="2,0"></Square>
          <Square text="2,1"></Square>
          <Square text="2,2"></Square>
        </View> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  gameBoard: {
    flex: 1,
    width: "100%",
  },
  row: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "sapce-around",
  },
});
