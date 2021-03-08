package com.board.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.board.back.model.BoardFile;

public interface BoardFileRepository extends JpaRepository<BoardFile, Integer> {
	
	List<BoardFile> findByBoardNo(Integer no);
	
//	public final static String SELECT_BOARD_FILE_LIST = ""
//			+ "SELECT "
//			+ "board_no,"
//			+ "ori_name,"
//			+ "new_name,"
//			+ "size,"
//			+ " FROM board_file WHERE no = ?1"
//			+ "ORDER BY file_no desc";
//	
//	
//	@Query(value = SELECT_BOARD_FILE_LIST, nativeQuery = true)
//	List<BoardFile> findFileList(
//			final Integer fileStartNo);
}
