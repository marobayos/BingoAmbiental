import React from "react";
import axios from "axios";
import logo_color from "../../Assets/logo_color.png"
import "antd/dist/antd.css";
import { LoadingOutlined } from '@ant-design/icons';
import {List, Divider, Modal } from 'antd';
import {Content, BoardContent, InputField, ButtonField, Inputs, ButtonGreen, Title, Subtitle, Number, Countdown, Tile, WhiteTile, DisabledTile, Container} from "./StyledHome";
import "./Home.css";
import logo from "../../logo.svg";

const path = "http://3.86.110.90:8000/bingo/"

class Home extends React.Component {
    board = {}


    constructor(props) {
        super(props);
        this.state = {
            state: 0,
            nickname: null,
            idgame: null,
            board: null,
            owns: false,
            waiting: false,
            started: false,
            number: '',
            count: 60
        };
        this.loadData();
        console.log(this.state);
    }

    componentDidMount() {
        console.log(this.state);
    }

    loadData = () => {
        axios.get(path + "terms").then(response => {
            for(const  e in response.data){
                if(e === "0")
                    this.board["75"] = {num: "75", text: response.data[e][0], check: false}
                else
                    this.board[e] = {num: e, text: response.data[e][0], check: false}
            }
            axios.get(path + "definitions").then(response => {
                for(const e in response.data){
                    if( e === "0")
                        this.board["75"].desc = response.data[e].substring(2,response.data[e].length-2);
                    else
                        this.board[e].desc = response.data[e].substring(2,response.data[e].length-2);
                }
            });
        });
    }

    getSeconds = () => {
        let seconds = 19 - new Date().getSeconds() % 20
        this.setState({count: seconds})
        if (seconds === 0) {
            axios.post(path + "balot", {
                    "idgame": this.state.idgame,
                    "nickname": this.state.nickname
            }).then(response => {
                this.setState({number: response.data.balota});
            }).catch(error => {
            });
        }
    }

    waitForStart = () => {
        setTimeout(() =>{
                setInterval(this._waitForStart,5000);
            }
        , (19 - new Date().getSeconds()%20)*1000 + (1005 - new Date().getMilliseconds()) );
    }

    _waitForStart = () => {
        axios.post(path + "ballot", {
                "idgame": this.state.idgame,
                "nickname": this.state.nickname
        }).then(response => {
            if(response.data.balota !== 0 ){
                this.setState({started: true, number: response.data.balota});
                setInterval(this.getSeconds,1000);
            }
        });
    }


    createRoom = async () => {
        axios.get(path + "newgame").then(response => {
            this.setState({
                state: 2,
                idgame: response.data.idgame,
                owns: true,
                waiting: false
            });
            axios.post(path + "enter",{
                "nickname": this.state.nickname,
                "idgame": response.data.idgame
            }).then(response => {
                    this.setState({
                        state: 1,
                        board: response.data.board.substring(2, response.data.board.length-2).split(";")
                    });
                }
            ).catch(error => {
            });
        });

    }

    joinRoom = () => {
        axios.post(path + "enter",{
                "nickname": this.state.nickname,
                "idgame": this.state.idgame
        }).then(response => {
                this.setState({
                    state: 1,
                    idgame: response.data.idgame,
                    board: response.data.board.substring(2, response.data.board.length-2).split(";"),
                    waiting: true
                });
                setInterval(this.waitForStart,10000);
            }
        ).catch(error => {
        });
    }


    startRoom = () => {
        axios.post(path + "enter",{
            "nickname": this.state.nickname,
            "idgame": this.state.idgame
        }).then(response => {
                this.setState({
                    board: response.data.board.substring(2, response.data.board.length-2).split(";"),
                    waiting: true
                });
                setTimeout(
                    this._startRoom,
                (19 - new Date().getSeconds()%20)*1000 + (1000 - new Date().getMilliseconds()) );
            }
        ).catch(error => {
        });

    }

    _startRoom = () => {
        axios.post(path + "enter",{
            "nickname": this.state.nickname,
            "idgame": this.state.idgame
        }).then(response => {
                axios.post(path + "balot", {
                    "idgame": this.state.idgame,
                    "nickname": this.state.nickname
                }).then(response => {
                    this.setState({number: response.data.balota});
                    setInterval(this.getSeconds,1000);
                    this.setState({
                        started: true,
                        state: 1,
                        waiting: false
                    });
                }).catch(error => {
                });
            }
        ).catch(error => {
        });
    }

    checkTile = (tile) => {
        if(this.state.number === tile) {
            this.board[tile].check = true;
            Modal.success({
                title: this.board[tile].text,
                content: this.board[tile].desc,
                centered: true
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.state === 0 ?
                    <Content>
                        <img src={logo_color} className="App-logo" alt="logo" />
                        <div style={{
                            width: 600,
                            height: 400,
                            border: '#00A550 2px solid',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            padding: 50,
                            borderRadius: 20,

                        }}>
                            <InputField style={{display: 'flex'}}>
                                Nick:
                                <Inputs placeHolder="Nick" onChange  = { e => this.setState({nickname: e.target.value})}/>
                            </InputField>
                            <InputField style={{display: 'flex'}}>
                                Room code:
                                <Inputs placeHolder="Sala" onChange  = { e => this.setState({idgame: e.target.value})}/>
                            </InputField>
                            <ButtonField>
                                <ButtonGreen variant="contained" color="primary" onClick = {this.joinRoom}>Unirse a partida</ButtonGreen>
                            </ButtonField>
                            <Divider style={{
                                marginTop: 30,
                                marginBottom: 30,
                                width: '60%'
                            }} >
                                O crea una sala
                            </Divider>
                            <ButtonField>
                                <ButtonGreen variant="contained" color="primary" onClick = {this.createRoom}>Crear partida</ButtonGreen>
                            </ButtonField>
                        </div>
                    </Content>
                    :
                    <Content>
                        <img src={logo_color} className="App-logo" alt="logo" />
                        <Container>
                            <Title> Tablero Ambiental </Title>

                            <Subtitle>Sala: {this.state.idgame}</Subtitle>
                            <Subtitle>{this.state.nickname}</Subtitle>

                            { this.state.started ?
                            <div>
                                <Number>
                                    {this.state.number}
                                    <Countdown>
                                        {this.state.count}
                                    </Countdown>
                                </Number>

                                <BoardContent>
                                    <List
                                        grid={{ column: 5 }}
                                        dataSource={this.state.board}
                                        renderItem={item => (
                                            item !== "C" && this.board[item]!= undefined ?(
                                            !this.board[item].check?
                                            <Tile onClick = {() => this.checkTile(item)}>
                                                <p>
                                                    <h1 style={{fontSize: '3em', fontWeight: 'bold'}}>{item}</h1>
                                                </p>
                                                <p>
                                                    {this.board[item].text}
                                                </p>
                                            </Tile> :
                                            <DisabledTile>
                                                <p>
                                                    <h1 style={{fontSize: '3em', fontWeight: 'bold'}}>{item}</h1>
                                                </p>
                                                <p>
                                                    {this.board[item].text}
                                                </p>
                                            </DisabledTile>
                                            ): <WhiteTile>{console.log(this.state)}{ console.log(this.board)}</WhiteTile>
                                        )}
                                    />

                                </BoardContent>
                                <ButtonField>
                                    <ButtonGreen variant="contained" color="primary" onClick = {this.startRoom}>BINGO!</ButtonGreen>
                                </ButtonField>
                            </div>:
                                this.state.waiting ?
                                    <BoardContent >
                                        <LoadingOutlined style={{ fontSize: '10em', color: '#08c' }} />
                                    </BoardContent> :
                                    <BoardContent>
                                        <ButtonField>
                                            <ButtonGreen variant="contained" color="primary" onClick = {this.startRoom}>Empezar partida</ButtonGreen>
                                        </ButtonField>
                                    </BoardContent>
                            }
                        </Container>
                    </Content>
                }
            </div>
        );
    }
}

export default Home;