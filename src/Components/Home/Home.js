import React from "react";
import axios from "axios";
import logo_color from "../../Assets/logo_color.png"
import "antd/dist/antd.css";
import {List, Divider } from 'antd';
import {Content, BoardContent, InputField, ButtonField, Inputs, ButtonGreen, Title, Subtitle, Number, Countdown, Tile, Container} from "./StyledHome";
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
            number: 'B10',
            count: 60
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        axios.get(path + "terms").then(response => {
            for(const  e in response.data){
                this.board[e] = {num: e, text: response.data[e][0]}
            }
            axios.get(path + "definitions").then(response => {
                console.log(response.data);
                for(const e in response.data){
                    this.board[e].desc = response.data[e].substring(2,response.data[e].length-2);
                }
                console.log(this.board);
            });
        });
    }

    getSeconds = () => {
        let seconds = 29 - new Date().getSeconds() % 30
        this.setState({count: seconds})
        if (seconds === 0) {
            axios.get(path + "balot", {
                params: {
                    idgame: "AMNB",
                    nickname: "Mitos"
                }
            }).then(response => {
                console.log(response);
                this.setState({number: response.data.balota});
            }).catch(error => {
                console.log(error)
            });
        }
    }

    waitForStart = () => {
        setTimeout(() =>{
                setInterval(this._waitForStart,5000);
            }
        , (29 - new Date().getSeconds()%30)*1000 + (1005 - new Date().getMilliseconds()) );
    }

    _waitForStart = () => {
        axios.post(path + "ballot", {
                idgame: this.state.idgame,
                nickname: this.state.nickname
        }).then(response => {
            if(response.data.balota !== 0 ){
                this.setState({started: true});
                setInterval(this.getSeconds,1000);
            }

        });
    }


    createRoom = async () => {
        axios.get(path + "newgame").then(response => {
            this.setState({
                state: 2,
                idgame: response.data.idgame,
                owns: true
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
                    board: response.data.board
                });
            }
        ).catch(error => {
            console.log(error)
        });
    }


    startRoom = () => {
        setTimeout(
                this._startRoom,
            (29 - new Date().getSeconds()%30)*1000 + (1000 - new Date().getMilliseconds()) );
    }

    _startRoom = () => {
        this.setState({started: true})
        setInterval(this.getSeconds,1000);
        console.log(this.state);
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
                                            <Tile>
                                                <p>
                                                    <h1 style={{fontSize: '3em', fontWeight: 'bold'}}>{item.num}</h1>
                                                </p>
                                                <p>
                                                    {item.text}
                                                </p>
                                            </Tile>
                                        )}
                                    />

                                </BoardContent>
                                <ButtonField>
                                    <ButtonGreen variant="contained" color="primary" onClick = {this.startRoom}>BINGO!</ButtonGreen>
                                </ButtonField>
                            </div>:
                                !this.state.owns ?
                                    <BoardContent>
                                        {setInterval(this.waitForStart,1000)}
                                        <img src={logo_color} className="loading" alt="logo" />
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