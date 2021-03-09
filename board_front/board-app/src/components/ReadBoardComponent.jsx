import React, { Component } from 'react';
import BoardService from '../service/BoardService';
import axios from 'axios';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            no: this.props.match.params.no,
            board: {},
            files : []
        }

    }

    componentDidMount() {
        BoardService.getOneBoard(this.state.no).then(res => {
            this.setState({board: res.data});
        });

        BoardService.getFileInfo(this.state.no).then(res => {
            this.setState({files: res.data.fileList});
        });        
    }

    returnBoardType(typeNo) {
        let type = null;
        if (typeNo == 1) {
            type = "자유게시판";

        } else if (typeNo == 2 ) {
            type = "질문과 답변 게시판";

        } else {
            type = "타입 미지정";
        }

        return (
            <div className = "row">
                <label> Board Type : </label> {type}
            </div>
        )

    }

    returnDate(cTime, uTime) {
        return (
            <div className = "row">
                <label>생성일 : [ {cTime} ] / 최종 수정일 : [ {uTime} ] </label>
            </div>
        )
    }

    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        this.props.history.push(`/create-board/${this.state.no}`);
    }

    // 파일 다운로드 처리
    // axios.get으로 그냥 보내버리면 결과를 받아 다운로드 했을 때 내용이 깨지게 된다.
    // 따라서 axios로 전송할 때 responseType을 blob로 처리해주어야 한다.
    downCsList(no, fileName){                
        axios({
            method: 'GET',
            url: 'http://localhost:3030/api/board/file/download/'+ no,                 
            responseType: 'blob' // 가장 중요함
        })    
        .then(response =>{        
            const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        })                                
    }


    deleteView = async function() {
        if(window.confirm("정말로 글을 삭제하시겠습니까?\n삭제된 글은 복구할 수 없습니다.")) {
            BoardService.deleteBoard(this.state.no).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                if(res.status == 200) {
                    alert("게시글이 삭제되었습니다.");
                    this.props.history.push('/board');
                } else {
                    alert("글 삭제에 실패했습니다.");
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className ="text-center"> Read Detail</h3>
                    <div className = "card-body">
                            {this.returnBoardType(this.state.board.type)} 
                            <div className = "row">      
                                <label> Title </label> : {this.state.board.title}
                            </div>

                            <div className = "row">
                                <label> Contents </label> : <br></br>
                                <textarea value={this.state.board.contents} readOnly/> 
                            </div >

                            <div className = "row">
                                <label> MemberNo  </label>: 
                                {this.state.board.memberNo}
                            </div>

                            <h3>첨부파일</h3> 
                            {
                                this.state.files.map(
                                    bFile =>
                                    <div>{bFile.fileNo} : <a onClick={() => this.downCsList(bFile.fileNo, bFile.oriName)}>{bFile.oriName}</a></div>                                     
                                )
                            }

                            {this.returnDate(this.state.board.createdTime, this.state.board.updatedTime) }

                            
                            <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                            <button className="btn btn-info" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                            <button className="btn btn-danger" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>글 삭제</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ReadBoardComponent;