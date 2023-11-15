import axios from "axios";

class Repository {
  //this will come from dotenv later
  static apiUrl = "http://127.0.0.1:5000";

  static async startNewGame() {
    try {
      const response = await axios.get(`${this.apiUrl}/new_game`);
      return response.data;
    } catch (error) {
      console.error("Error starting a new game:", error);
    }
  }

  static async makeMove(board, turn) {
    try {
      const response = await axios.post(`${this.apiUrl}/make_move`, {
        board,
        turn,
      });
      return response.data;
    } catch (error) {
      console.error("Error making a move:", error);
    }
  }

  static async checkGameStatus(board) {
    try {
      const response = await axios.post(`${this.apiUrl}/check_status`, {
        board,
      });
      return response.data;
    } catch (error) {
      console.error("Error checking game status:", error);
    }
  }
}

export default Repository;
