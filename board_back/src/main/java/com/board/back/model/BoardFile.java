package com.board.back.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "board_file")
@DynamicInsert
@DynamicUpdate
public class BoardFile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int fileNo;
	
	@Column (name = "board_no")
	private int boardNo;
	
	@Column (name = "path") 
	private String path;
	
	@Column (name = "ori_name")
	private String oriName;
	
	@Column (name = "new_name")
	private String newName;
	
	@Column (name = "size")
	private long size;

	public int getFileNo() {
		return fileNo;
	}

	public void setFileNo(int fileNo) {
		this.fileNo = fileNo;
	}

	public int getBoardNo() {
		return boardNo;
	}

	public void setBoardNo(int boardNo) {
		this.boardNo = boardNo;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getOriName() {
		return oriName;
	}

	public void setOriName(String oriName) {
		this.oriName = oriName;
	}

	public String getNewName() {
		return newName;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public long getSize() {
		return size;
	}

	public void setSize(long size) {
		this.size = size;
	}	
	
	
	
}
