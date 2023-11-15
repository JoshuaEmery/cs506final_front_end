import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import Square from "./components/Square";
import Repository from "./data/repository";

export default function App() {
  const [gameState, setGameState] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentTurn, setCurrentTurn] = useState("x");
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState("");
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  useEffect(() => {
    Repository.startNewGame().then((data) => {
      setGameState(data.board);
      setStatus(data.status);
      setCurrentTurn("x");
    });
  }, []);
  function makeMove(i, j) {
    console.log(i, j);
    if (gameState[i][j] !== null) {
      return;
    }
    let newGameState = [...gameState];
    newGameState[i][j] = currentTurn;
    // Determine the next turn locally instead of relying on the state update
    console.log(currentTurn);
    const nextTurn = currentTurn === "x" ? "o" : "x";

    //Disable the UI until the API call is complete
    setAwaitingResponse(true);
    getAIMove(newGameState, nextTurn);
  }
  async function getAIMove(newGameState, nextTurn) {
    try {
      const data = await Repository.makeMove(newGameState, nextTurn);
      console.log(`AI board: ${data.board}`);
      console.log(`Turn: ${currentTurn}`);
      setGameState(data.board);
      setStatus(data.status);
      nextTurn = nextTurn === "x" ? "o" : "x";
      setCurrentTurn(nextTurn); // Update turn based on the response
    } catch (error) {
      console.error("Error in getting AI move:", error);
    } finally {
      setAwaitingResponse(false); // Enable UI interaction
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>
        Current Turn: {currentTurn} Game State: {status}
      </Text>
      <View style={styles.gameBoard}>
        {gameState.map((row, i) => {
          return (
            <View key={i} style={styles.row}>
              {row.map((value, j) => {
                return (
                  <Square
                    onPress={() => makeMove(i, j)}
                    key={`${i},${j}`}
                    text={value}
                  ></Square>
                );
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
    </SafeAreaView>
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
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});
