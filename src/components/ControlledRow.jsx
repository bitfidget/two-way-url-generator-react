import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'

const ControlledRow = (props) => (
    <div className='row component-controlled-row'>
        <div className='col-md-2'>
            <input
                id={props.id}
                type='checkbox'
                onChange={props.controlFunc}
                checked={props.rowChecked || false}
            />
        </div>
        <div className='col-md-10'>
            <h3>{props.rowContent.title}</h3>
            <div>
                {ReactHtmlParser(props.rowContent.content)}
            </div>
        </div>
    </div>
)

ControlledRow.propTypes = {
    rowContent: PropTypes.object.isRequired,
    rowChecked: PropTypes.bool,
    controlFunc: PropTypes.func.isRequired
}

export default ControlledRow