import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// styled components
const Item = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 3px;
    background-color: white;
`

export default class DragDropItem extends Component {
    render() {
        return (
            
            <Draggable
                draggableId={this.props.item.id}
                index={this.props.index}
            >
                {provided => (
                    <Item
                        innerRef={provided.innerRef}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <h3>{this.props.item.title}</h3>
                        {ReactHtmlParser(this.props.item.content)}
                    </Item>
                )}
            </Draggable>
        )
    }
}
