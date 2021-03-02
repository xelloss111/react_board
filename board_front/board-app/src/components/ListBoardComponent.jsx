import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
        // 최초 생성시 페이지 번호는 1
        // 페이징 객체
        // 게시판 배열
        this.state = { 
            p_num : 1,
            paging : {},
            boards: []
        }

        this.createBoard = this.createBoard.bind(this);
		
    }

    // 해당 컴포넌트 실행 시
    // 페이지 번호를 파라미터로 service 스크립트를 호출
    // 백엔드와 통신하여 결과를 받아
    // setState 처리 
    componentDidMount() {
        BoardService.getBoards(this.state.p_num).then((res) => {
            this.setState({ 
                boards: res.data.list,
                p_num : res.data.pagingData.currentPageNum,
                paging : res.data.pagingData
            });
        });
    }

    createBoard() {
        this.props.history.push('/create-board/_create');
    }

    readBoard(no) {
        this.props.history.push(`/read-board/${no}`);
    }

    listBoard(p_num) {
        console.log("pageNum :" + p_num);
        BoardService.getBoards(p_num).then((res) => {
            console.log(res.data);
            this.setState ({
                boards: res.data.list,
                p_num : res.data.pagingData.currentPageNum,
                paging : res.data.pagingData
            });
        });
    }

    viewPaging() {
        const pageNums = [];

        for (let i = this.state.paging.pageNumStart; i <= this.state.paging.pageNumEnd; i++) {
            pageNums.push(i);        
        }

        return (pageNums.map((page) => 
            <li className="page-item" key={page.toString()}>
                <a className="page-link" onClick={()=> this.listBoard(page)}>{page}</a>
            </li>
        ))
    }

    isPagingPrev() {
        if(this.state.paging.prev) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.currentPageNum - 1))} tabIndex="-1">Previos</a>
                </li>
            );
        }
    }

    isPagingNext() {
        if(this.state.paging.next) {
            return (
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard((this.state.paging.currentPageNum + 1))} tabIndex="+1">Next</a>
                </li>
            );
        }
    }

    isMoveToFirstPage() {
        if(this.state.p_num != 1) {
            return(
                <li className="page-item">
                    <a className="page-link" onClick={() => this.listBoard(1)} tabIndex="-1">Move to First Page</a>
                </li>
            )
        };
    }

    isMoveToLastPage() {
        if(this.state.p_num != this.state.paging.pageNumCountTotal) {
            <li className="page-item">
                <a className="page-link" onClick={() => this.listBoard(this.state.paging.pageNumCountTotal)} tabIndex="-1">Move to Last Page</a>
            </li>
        }
    }

    // # 3.
    render() {
        return (
            <div>
                <h2 className="text-center">Boards List</h2>
                <div className ="row">
                    <button className="btn btn-primary" onClick={this.createBoard}>글작성</button>
                </div>
                <div className ="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>타이틀 </th>
                                <th>작성자 </th>
                                <th>작성일 </th>
                                <th>갱신일 </th>
                                <th>좋아요수</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.no}>
                                        <td> {board.no} </td>
                                        <td> <a onClick={() => this.readBoard(board.no)}>{board.title}</a></td>
                                        <td> {board.memberNo} </td>
                                        <td> {board.createdTime} </td>
                                        <td> {board.updatedTime} </td>
                                        <td> {board.likes} </td>
                                        <td> {board.counts} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className ="row">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {
                                this.isMoveToFirstPage()
                            }
                            {
                                this.isPagingPrev()
                            }
                            {
                                this.viewPaging()
                            }
                            {
                                this.isPagingNext()
                            }
                            {
                                this.isMoveToLastPage()
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default ListBoardComponent;