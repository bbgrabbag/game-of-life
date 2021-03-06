import React, { Component } from 'react';

import { genGrid, isNewGrid } from "./utils";

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
        this.selectAll = this.selectAll.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.selector = React.createRef();
    }
    componentDidMount() {
        window.addEventListener("keyup", e => {
            e.preventDefault();
            this.selector.current.blur();
            switch (e.keyCode) {
                case 32:
                    this.state.processing ? this.stop() : this.start();
                    break;
                case 82:
                    this.reset();
                    break;
                default:
                    return;
            }
        })
    }
    componentWillReceiveProps(next) {
        if (next.n !== this.props.n)
            this.setState({ grid: Array.from(Array(next.n)).map(i => false) });
    }

    select(clickedI) {
        this.setState(prevState => ({
            grid: prevState.grid.map((cell, i) => i === clickedI ? !cell : cell)
        }));
    }
    selectAll(e) {
        const { checked } = e.target;
        this.setState(prevState => ({
            grid: prevState.grid.map(cell => checked)
        }));
    }
    _setGrid() {
        this.setState(prevState => {
            const { grid, count } = prevState;
            const newGrid = genGrid(grid, Math.sqrt(this.props.n));
            if (isNewGrid(grid, newGrid)) {
                return {
                    grid: newGrid,
                    processing: true,
                    count: count + 1
                }
            } else {
                return {
                    processing: false
                }
            }
        }, () => {
            if (!this.state.processing) {
                clearInterval(this.interval);
            }
        });
    }
    start() {
        clearInterval(this.interval);
        this.setState({ processing: true }, () => {
            this.interval = setInterval(this._setGrid = this._setGrid.bind(this), 500);
            this.selector.current.checked = false;
        });
    }
    stop() {

        clearInterval(this.interval)
        this.setState({ processing: false }, () => this.selector.current.checked = false);
    }
    reset() {
        clearInterval(this.interval);
        this.setState({
            grid: Array.from(Array(this.props.n)).map(i => false),
            processing: false,
            count: 0
        }, () => this.selector.current.checked = false);
    }
    render() {
        const { grid, processing, count } = this.state;
        const { n, handleChange } = this.props;
        const styles = {
            width: "320px"
        }
        return (
            <div className="grid-wrapper">
                <div className="grid-main">
                    <div className="controls">
                        <button onClick={this.start} className="pointer"><i className="fa fa-play " aria-hidden="true"></i></button>
                        <button onClick={this.stop} className="pointer"><i className="fa fa-stop " aria-hidden="true"></i></button>
                        <button onClick={this.reset} className="pointer"><i className="fa fa-repeat " aria-hidden="true"></i></button>
                        <form action="">
                            <label htmlFor="size">
                                <select className="pointer" onChange={handleChange} value={n} name="size" id="size">
                                    <option value="64">64</option>
                                    <option value="256">256</option>
                                    <option value="1024">1024</option>
                                </select>
                            </label>
                        </form>
                        <input onClick={this.selectAll} ref={this.selector} className="pointer" id="all" type="checkbox" />
                        <label className="pointer" htmlFor="all">
                            Select all
                            </label>

                    </div>
                    <div style={styles} className="grid">
                        {grid.map((selected, i) => <Box select={this.select} dimension={Math.sqrt(n)} n={n} key={i} selected={selected} i={i} />)}
                    </div>
                </div>
                <div className="grid-footer">
                    <div className="no-bump">
                        {processing ? <p>Processing...</p> : <p>Select cells and press <i onClick={this.start} className="fa fa-play pointer" aria-hidden="true"></i> to begin</p>}
                    </div>
                    <p className="bold">Generations: {count}</p>
                </div>
            </div>
        )
    }
}
