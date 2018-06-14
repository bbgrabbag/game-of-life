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
                    <ul>
                        <li>A <b className="bold">selected cell</b> is considered <b className="bold">alive</b></li>
                        <li>A <b className="bold">living cell</b> surrounded by <b className="bold">more than three</b> other living cells will die</li>
                        <li>A <b className="bold">living cell</b> surrounded by <b className="bold">fewer than two</b> living cells will also die</li>
                        <li>A <b className="bold">living cell</b> surrounded by <b className="bold">either two or three</b> cells will survive</li>
                        <li>A <b className="bold">dead cell</b> surrounded by <b className="bold">three living cells</b> will birth a living cell</li>
                    </ul>
                </div>

                <Grid n={+n} handleChange={this.handleChange} />
                <footer>
                    <h1>Game of Life</h1>
                </footer>
            </div>
        )
    }
}
