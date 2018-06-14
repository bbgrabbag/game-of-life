import React, { Component } from 'react';

import { genGrid } from "./utils";

import Box from "./Box";

export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: Array.from(Array(props.n)).map(i => false),
            processing: false,
            count: 0
        }
        this.select = this.select.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentWillReceiveProps(next) {
        if (next.n !== this.props.n)
            this.setState({ grid: Array.from(Array(next.n)).map(i => false) })
    }
    select(clickedI) {
        this.setState(prevState => (
            {
                grid: prevState.grid.map((box, i) => i === clickedI ? !box : box)
            }
        ))
    }
    _setGrid() {
        this.setState(prevState => ({
            grid: genGrid(prevState.grid, Math.sqrt(this.props.n)),
            processing: true,
            count: prevState.count + 1
        }), () => {
            if (this.state.grid.every(status => !status))
                clearInterval(this.interval);
                this.setState({processing: false});
        })
    }
    start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._setGrid = this._setGrid.bind(this), 200);
    }
    stop() {
        clearInterval(this.interval);
        this.setState({ processing: false });
    }
    reset() {
        clearInterval(this.interval);
        this.setState({
            grid: Array.from(Array(this.props.n)).map(i => false),
            processing: false,
            count: 0
        });
    }
    render() {
        const { grid, processing, count } = this.state;
        const { n } = this.props;
        const styles = {
            width: "320px"
        }
        return (
            <div className="grid-wrapper">
                <div className="controls">
                    <button onClick={this.start} className="pointer">Start</button>
                    <button onClick={this.stop} className="pointer">Stop</button>
                    <button onClick={this.reset} className="pointer">Reset</button>
                </div>
                <div style={styles} className="grid">
                    {grid.map((selected, i) => <Box select={this.select} dimension={Math.sqrt(n)} n={n} key={i} selected={selected} i={i} />)}
                </div>
                {processing ? <p>Processing...</p> : <p>Select cells and press 'Start'</p>}
                <p className="bold">Generations: {count}</p>
            </div>
        )
    }
}
