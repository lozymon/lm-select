import React, {Component} from 'react'
import {render} from 'react-dom'

import Select from '../../src'

class Demo extends Component {
    constructor(props) {
        super(props)

        let location = [];

        for(let i = 0; i < 1000000; i++) {
            location.push({
                id: i,
                title: 'title ' + (i + 1),
                selected: false,
                key: 'location'
            })
        }

        this.state = {
            location
        }
    }

    render() {
        return <div>
            <h1>lm-select Demo</h1>
            <Select
                title="Select location"
                list={this.state.location}
            />
        </div>
    }
}

render(<Demo/>, document.querySelector('#demo'))
