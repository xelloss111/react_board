package com.board.back.controller;

import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.board.back.model.Board;
import com.board.back.service.BoardService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController // @ResponsBody가 결합된 형태로 Json 형태의 객체 데이터를 반환하는 컨트롤러 (View를 반환하는것이 아님)
@RequestMapping("/api")
public class BoardController {
	
	@Autowired
	private BoardService boardService;

	// get all board 
	@GetMapping("/board")
	public ResponseEntity<Map> getAllBoards(@RequestParam(value = "p_num", required = false) Integer p_num) {
		if(p_num == null || p_num <= 0) p_num = 1;
		
		return boardService.getPagingBoard(p_num);
	}
	
//	public List<Board> getAllBoards() {
//		
//		return boardService.getAllBoard();
//	}
	
	// create board
	@PostMapping("/board")
	public Board createBoard(@RequestBody Board board) {
		return boardService.createBoard(board);
	}
	
	// read board
	@GetMapping("/board/{no}")
	public ResponseEntity<Board> getBoardByNo (@PathVariable Integer no) {
		return boardService.getBoard(no);
	}
	
	// update board
	@PutMapping("/board/{no}")
	public ResponseEntity<Board> updateBoard (@PathVariable Integer no, @RequestBody Board board) {
		return boardService.updateBoard(no, board);
	}
	
	// delete board
	@DeleteMapping("/board/{no}")
	public ResponseEntity<Map<String, Boolean>> deleteBoardByNo (@PathVariable Integer no) {
		return boardService.deleteBoard(no);
	}
	
	// file upload
	@PostMapping("/board/uploadFile")
	public Map<String, Object> upload(@RequestPart(value="files", required=true) List<MultipartFile> files) {
//		File newFile = new File("c:/boardFile/" + multiPartFile.getOriginalFilename());
	
		try {
		    for(MultipartFile file : files) {
		        String originalName = file.getOriginalFilename();
		        
		        String filePath = "c:/boardFile/" + originalName;
		        File dest = new File(filePath);
		        if(dest.isDirectory()) dest.mkdir();
		        file.transferTo(dest);
		        
		        String uid = UUID.randomUUID().toString();
		    }
		    
//			InputStream fileStream = multiPartFile.getInputStream();
//			FileUtils.copyInputStreamToFile(fileStream, newFile);
			
		} catch (Exception e) {
			// 실패 시 파일 삭제 처리
//			FileUtils.deleteQuietly(dest);
			e.printStackTrace();
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("errorCode", 10);
		
		return map;
		
		
	}
	
}
