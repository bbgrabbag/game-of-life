import React from 'react'

function Box(props) {
    const { selected, i, dimension, select } = props;
    const styles = {
        height: 320 / dimension + "px",
        width: 320 / dimension + "px",
    }
    return (
        <div onClick={() => select(i)} className={`box pointer ${selected ? "selected" : ""}`} style={styles}></div>
    )
}

export default Box
