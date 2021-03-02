// axios import
import axios from 'axios';

// 경로를 const로 지정
const BOARD_API_BASE_URL = "http://localhost:3030/api/board"; 

// class 선언
class BoardService {
    // methods 선언
    getBoards(p_num) {
        return axios.get(BOARD_API_BASE_URL + "?p_num=" + p_num);
    }

    createBoard(board) {
        return axios.post(BOARD_API_BASE_URL, board);
    }

    getOneBoard(no) {
        return axios.get(BOARD_API_BASE_URL + "/" + no);
    }

    updateBoard(no, board) {
        return axios.put(BOARD_API_BASE_URL + "/" + no, board);
    }

    deleteBoard(no) {
        return axios.delete(BOARD_API_BASE_URL + "/" + no);
    }

    uploadFile(path, formData, config) {
        return axios.post(BOARD_API_BASE_URL + "/" + path, formData, config);
    }
}

export default new BoardService();