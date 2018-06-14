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
                <div className="form-wrapper">
                    <form action="">
                        <label htmlFor="size">
                            Select grid size:
                        <select onChange={this.handleChange} value={n} name="size" id="size">
                                <option value="64">64</option>
                                <option value="256">256</option>
                                <option value="1024">1024</option>
                            </select>

                        </label>
                    </form>
                </div>
                <Grid n={+n} />
            </div>
        )
    }
}
