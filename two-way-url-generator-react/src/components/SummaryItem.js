import React from 'react'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import conditionalClassNames from 'helpers/conditionalClassNames'

const SummaryItem = props => {
    return (
        <div
            className={conditionalClassNames({
                'summary-item': true,
                row: true,
                selected: props.selectedItemId === props.item.id,
                deselected:
                    props.selectedItemId &&
                    props.selectedItemId !== props.item.id,
            })}
            onClick={props.onSummaryClick}
            id={props.item.id}
        >
            <div className="col-xs-12">
                <h4>{props.item.intent}</h4>
            </div>
            <div className="col-xs-12">
                {ReactHtmlParser(props.item.content)}
            </div>
        </div>
    )
}

SummaryItem.propTypes = {
    rowContent: PropTypes.object.isRequired,
    rowChecked: PropTypes.bool,
    controlFunc: PropTypes.func.isRequired,
}

export default SummaryItem
