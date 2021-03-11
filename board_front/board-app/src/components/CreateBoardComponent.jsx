import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            no : this.props.match.params.no,
            type: '',
            title: '',
            contents: '',
            memberNo: '',
            selectedFiles : null,
            files: []
        }
        // javascript의 bind() 를 활용하여 각 메소드 수행 시
        // this의 state를 가진채로 사용될 수 있도록 함
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.changeMemberNoHandler = this.changeMemberNoHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    changeTypeHandler = (event) => {
        this.setState({type: event.target.value});
    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }

    changeContentsHandler = (event) => {
        this.setState({contents: event.target.value});
    }

    changeMemberNoHandler = (event) => {
        this.setState({memberNo: event.target.value});
    }

    createBoard = (event) => {
        event.preventDefault();
        let board = {
            type: this.state.type,
            title: this.state.title,
            contents: this.state.contents,
            memberNo: this.state.memberNo
        };

        const formData = new FormData();

        for (let i = 0; i < this.state.selectedFiles.length; i++) {
            formData.append("files", this.state.selectedFiles[i]);
        }

        formData.append("board", JSON.stringify(board));

        const config = {
            headers: {
              "content-type": "multipart/form-data"
            }
          };

        if(this.state.no === '_create') {
            BoardService.createBoardWithFile(formData,config);
        } else {
            BoardService.updateBoardWithFile(this.state.no, formData, config);            
        }

        // 게시글만 등록하는 기준
        // console.log("board => "+ JSON.stringify(board));
        // if(this.state.no === '_create') {
        //     BoardService.createBoard(board).then(res => {
        //         this.props.history.push('/board');
        //     });            
        // } else {
        //     BoardService.updateBoard(this.state.no, board).then(res => {
        //         this.props.history.push('/board');
        //     });

        // }
    }

    cancel() {
        this.props.history.push('/board');
    }

    getTitle() {
        if (this.state.no === '_create') {
            return <h3 className="text-center">새 글을 작성해주세요</h3>            
        } else {
            return <h3 className="text-center">{this.state.no}번 글을 수정합니다.</h3>
        }
    }

    // 파일을 선택했을 때 state에 값을 지정
    selectFile = (e) => {
        const files = e.target.files;
        this.setState ({ selectedFiles : files });
    }

    // 파일 전송 (비동기)
    onClickHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // 여러 파일을 보낼때는 동일한 키값을 반복하여 append
        for (let i = 0; i < this.state.selectedFiles.length; i++) {
            formData.append("files", this.state.selectedFiles[i]);
        }
        
        // multipart로 설정하더라도 파일 하나만 전송하는 경우
        // formData.append(
        //   'files', this.state.selectedFiles[0]
        // );

        const config = {
          headers: {
            "content-type": "multipart/form-data"
          }
        };

        BoardService.uploadFile("uploadFile", formData, config);
        // axios.post(`uploadAPI`, formData, config);
      };

    getFile() {
        if (this.state.no != '_create' && this.state.files.length > 0) {
            return <h6>○ 기존파일정보</h6>
        }        
    }

    deleteOneFile (no) {
        if(window.confirm("정말로 파일을 삭제하시겠습니까?\n삭제된 파일은 복구할 수 없습니다.")) {
            BoardService.deleteFile(no).then(res => {
                console.log("delete result => " + JSON.stringify(res));
                if(res.status == 200) {
                    alert("파일이 삭제되었습니다.");
                    BoardService.getFileInfo(this.state.no).then(res => {
                        this.setState({files: res.data.fileList});
                    }); 
                } else {
                    alert("파일 삭제에 실패했습니다.");
                }
            });
        }
    }

    componentDidMount() {
        if(this.state.no === '_create') {
            return;
        } else {
            BoardService.getOneBoard(this.state.no).then( res => {
                let board = res.data;
                console.log("board => " + JSON.stringify(board));

                this.setState ({
                    type : board.type,
                    title : board.title,
                    contents : board.contents,
                    memberNo : board.memberNo
                });
            });

            BoardService.getFileInfo(this.state.no).then(res => {
                this.setState({files: res.data.fileList});
            });        
        }
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            {this.getTitle()}
                            {/* <h3 className="text-center">새글을 작성해주세요</h3> */}
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Type </label>
                                        <select placeholder="type" name="type" className="form-control" 
                                        value={this.state.type} onChange={this.changeTypeHandler}>
                                            <option value="1">자유게시판</option>
                                            <option value="2">질문과 답변</option>
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label> Title </label>
                                        <input type="text" placeholder="title" name="title" className="form-control" 
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Contents  </label>
                                        <textarea placeholder="contents" name="contents" className="form-control" 
                                        value={this.state.contents} onChange={this.changeContentsHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> MemberNo  </label>
                                        <input placeholder="memberNo" name="memberNo" className="form-control" 
                                        value={this.state.memberNo} onChange={this.changeMemberNoHandler}/>
                                    </div>

                                    {/* 글 수정 시 파일 정보 출력 */}
                                    {this.getFile()}
                                    {
                                        this.state.files.map(
                                            bFile =>
                                            <div>
                                                {bFile.fileNo} : {bFile.oriName}
                                                <a style={{marginLeft: "10px"}} onClick={() => this.deleteOneFile(bFile.fileNo)}>X</a>
                                            </div>                                     
                                        )
                                    }
                                    <br/>

                                    <div className = "form-group">
                                        <label> File : &nbsp;</label>
                                        <input type="file" name="files" multiple onChange={this.selectFile} />
                                        {/* <button onClick={this.onClickHandler}>전송하기</button>  */}
                                    </div>
                                    <button className="btn btn-success" onClick={this.createBoard}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default CreateBoardComponent;