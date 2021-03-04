package com.board.back.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Table(name = "board_file")
@DynamicInsert
@DynamicUpdate
public class BoardFile {
	// FK 설정
	@ManyToOne
	@JoinColumn(name = "no", referencedColumnName = "no")
	private Board no;
	
	@Column (name = "ori_name")
	private String oriName;
	
	@Column (name = "new_name")
	private String newName;
	
	@Column (name = "size")
	private long size;	
	
}
