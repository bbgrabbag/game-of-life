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
        this.selectAll = this.selectAll.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    }
    componentDidMount() {
        const { processing } = this.state;
        window.addEventListener("keyup", (e) => {
            switch(e.keyCode){
                case 32: 
                    return processing ? this.stop(): this.start() ;
                case 82:
                    return this.reset();
            }
        })
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
    selectAll(e) {
        const { checked } = e.target;
        this.setState(prevState => ({
            grid: prevState.grid.map(cell => checked)
        }));
    }
    _setGrid() {
        this.setState(prevState => ({
            grid: genGrid(prevState.grid, Math.sqrt(this.props.n)),
            processing: true,
            count: prevState.count + 1
        }), () => {
            if (this.state.grid.every(status => !status))
                clearInterval(this.interval);
            this.setState({ processing: false });
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
        const { n, handleChange } = this.props;
        const styles = {
            width: "320px"
        }
        return (
            <div className="grid-wrapper">
                <div>
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
                        <label className="pointer" htmlFor="all">
                            <input onClick={this.selectAll} className="pointer" id="all" type="checkbox" />
                            Select all
                    </label>

                    </div>
                    <div style={styles} className="grid">
                        {grid.map((selected, i) => <Box select={this.select} dimension={Math.sqrt(n)} n={n} key={i} selected={selected} i={i} />)}
                    </div>
                </div>
                {processing ? <p>Processing...</p> : <p>Select cells and press <i onClick={this.start} className="fa fa-play pointer" aria-hidden="true"></i> to begin</p>}
                <p className="bold">Generations: {count}</p>
            </div >
        )
    }
}
