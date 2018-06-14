import React, { Component } from 'react';
import Grid from "./Grid";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            n: 64,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { value } = e.target;
        this.setState({ n: value })
    }
    render() {
        const { n } = this.state;
        return (
            <div className="app-wrapper">

                <div className="info-wrapper">
                        <h1>Game of Life</h1>
                        <ul>
                            <li>A selected cell is considered Alive</li>
                            <li>A living cell surrounded by more than three other living cells will die</li>
                            <li>A living cell surrounded by fewer than two will also die</li>
                            <li>A living cell surrounded either two or three cells will survive</li>
                            <li>A dead cell surrounded by three living cells will birth a living cell</li>
                        </ul>
                </div>

                <Grid n={+n} handleChange={this.handleChange}/>
            </div>
        )
    }
}
