package com.board.back.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.board.back.exception.ResourceNotFoundException;
import com.board.back.model.Board;
import com.board.back.model.BoardFile;
import com.board.back.repository.BoardFileRepository;
import com.board.back.repository.BoardRepository;
import com.board.back.util.PagingUtil;

@Service
public class BoardService {

	@Autowired
	private BoardRepository boardRepository;
	
	@Autowired
	private BoardFileRepository boardFileRepository;
	
	public int findAllCount() {
		return (int) boardRepository.count();
	}
	
	// get paging boards data
	public ResponseEntity<Map> getPagingBoard(Integer p_num) {
		Map result = null;
		PagingUtil pu = new PagingUtil(p_num, 5, 5); // ($1:표시할 현재 페이지, $2:한페이지에 표시할 글 수, $3:한 페이지에 표시할 페이지 버튼의 수 )
		List<Board> list = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
		
		pu.setObjectCountTotal(findAllCount());
		pu.setCalcForPaging();
		
		System.out.println("p_num : "+p_num);
		System.out.println(pu.toString());
		
		if (list == null || list.size() == 0) {
			return null;
		}
		
		result = new HashMap<>();
		result.put("pagingData", pu);
		result.put("list", list);
		
		return ResponseEntity.ok(result);
	}		
	
	// get boards data
//	public List<Board> getAllBoard() {
//		return boardRepository.findAll();
//	}
	
	// create board
	public Board createBoard(Board board) {
		return boardRepository.save(board);
	}
	
	// get one board
	public ResponseEntity<Board> getBoard(Integer no) {
		Board board = boardRepository.findById(no).orElseThrow(() -> new ResourceNotFoundException("Not Exist Board Data by no" + no));
		return ResponseEntity.ok(board);
	}
	
	// update board
	public ResponseEntity<Board> updateBoard(Integer no, Board updateBoard) {
		Board board = boardRepository.findById(no).orElseThrow(() -> new ResourceNotFoundException("Not Exist Board Date by no" + no));
		
		board.setType(updateBoard.getType());
		board.setTitle(updateBoard.getTitle());
		board.setContents(updateBoard.getContents());
		board.setUpdatedTime(new Date());
		
		Board endUpdateBoard = boardRepository.save(board);
		return ResponseEntity.ok(endUpdateBoard);
	}
	
	// delete board
	public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer no) {
		Board board = boardRepository.findById(no).orElseThrow(() -> new ResourceNotFoundException("Not Exist Board Date by no" + no));
		
		boardRepository.delete(board);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Delete Board Data by Id : [" + no + "]", Boolean.TRUE);
		
		return ResponseEntity.ok(response);	
	}
	
	// uploadFile with BoardNo
	public ResponseEntity<List<BoardFile>> uploadFile(Integer no, List<MultipartFile> files) {
		List<BoardFile> bf = new ArrayList<>();
		
		try {
			for (MultipartFile file : files) {
		        String originalName = file.getOriginalFilename();
		        
		        String filePath = "c:/boardFile/" + originalName;
		        File dest = new File(filePath);
		        if(dest.isDirectory()) dest.mkdir();
		        file.transferTo(dest);
				
				BoardFile tmp = new BoardFile();
				
				tmp.setBoardNo(no);
				tmp.setOriName(file.getOriginalFilename());
				tmp.setNewName(UUID.randomUUID().toString());
				tmp.setSize(file.getSize());
				
				boardFileRepository.save(tmp);
				
				bf.add(tmp);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return ResponseEntity.ok(bf);
		
	}
	
	// get file info (List Type)
	public ResponseEntity<Map> getFileInfo (Integer no) {
		Map newList = new HashMap<>();
		
		List<BoardFile> list = boardFileRepository.findByBoardNo(no);
		
		newList.put("fileList", list);
		
		return ResponseEntity.ok(newList);
	}

}