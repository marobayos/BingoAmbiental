import styled from "styled-components";
import { Input } from 'antd';
import Button from '@material-ui/core/Button';
import withStyles from "@material-ui/core/styles/withStyles";

const Content = styled.div`
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

const Container = styled.div`
    border: #00A550 2px solid;
    width: 70vh;
    height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border-radius: 20px;
    align-items: center;
    font-size: 1.4vh;
`;

const Tile = withStyles({
    root : {
        display: 'block',
        lineHeight: '1em',
        backgroundColor: '#00A550',
        alignItems: 'center',
        width: '9vh',
        height: '9vh',
        fontSize: '0.7em',
        flexWrap: 'noWrap',
        margin: '0.5em 0',
        overflowWrap: 'break-word',
        '&:hover': {
            backgroundColor: '#70bf44',
            borderColor: '#00A550',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#70bf44',
            borderColor: '#00A550',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(113,191,67,.5)',
        },
    }
})(Button);

const WhiteTile = withStyles({
    root : {
        display: 'block',
        lineHeight: '1em',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        width: '9vh',
        height: '9vh',
        fontSize: '0.7em',
        flexWrap: 'noWrap',
        margin: '0.5em 0',
    }
})(Button);


const TittleTile = withStyles({
    root : {
        display: 'block',
        lineHeight: '1em',
        backgroundColor: '#007dc6',
        alignItems: 'center',
        width: '9vh',
        height: '9vh',
        fontSize: '0.7em',
        flexWrap: 'noWrap',
        margin: '0.5em 0',
    }
})(Button);

const DisabledTile = withStyles({
    root : {
        display: 'block',
        lineHeight: '1em',
        backgroundColor: '#a4a4a4',
        alignItems: 'center',
        width: '9vh',
        height: '9vh',
        fontSize: '0.7em',
        flexWrap: 'noWrap',
        margin: '0.5em 0',
    }
})(Button);

const HighlightedTile = withStyles({
    root : {
        display: 'block',
        lineHeight: '1em',
        backgroundColor: '#3cb0c0',
        alignItems: 'center',
        width: '9vh',
        height: '9vh',
        fontSize: '0.7em',
        flexWrap: 'noWrap',
        margin: '0.5em 0',
    }
})(Button);



const BoardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 50vh;
    height: 50vh;
    flex-wrap: wrap;
`;

const Number = styled.div`
    display: flex;
    justify-content: center;
    vertical-align: bottom;
    width: 100%;
    font-size: 4em;
    font-weight: bold;
`;

const Countdown = styled.div`
    vertical-align: bottom;
    font-size: 0.7em;
    font-weight: bold;
    padding-top: 0.5em;
    padding-left: 0.3em;
`;

const Title = styled.div`
    text-align: center;
    font-size: 2.5em;
    font-weight: bold;
    color: #02793d;
`;

const Subtitle = styled.div`
    text-align: center;
    font-size: 2em;
    font-weight: 550;
`;

const InputField = styled.div`
    display: block;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5em;
    margin-bottom: 1em;
`;

const ButtonField = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.3em;
    margin-bottom: 1em;
    margin: 2em;
`;

const Inputs = styled(Input)`
    width: 10em;
    font-size: 1em;
    padding-top: 0;
    float: right;
`;

const ButtonGreen = withStyles({
    root: {
        width: '10em',
        alignItems: 'center',
        padding: 0,
        height: '2em',
        fontSize: '1em',
        margin: 'auto',
        backgroundColor: '#00A550 !Important',
        borderColor: '#00A550',
        '&:hover': {
            backgroundColor: '#00A550',
            borderColor: '#00A550',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#00A550',
            borderColor: '#00A550',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(113,191,67,.5)',
        },
    }
})(Button);


export { Content, BoardContent, InputField, ButtonField, Inputs, ButtonGreen, Title, Subtitle, Number, Countdown, Tile, WhiteTile, DisabledTile, Container, HighlightedTile, TittleTile};