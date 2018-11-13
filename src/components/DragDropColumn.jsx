import React, { Component } from 'react'
import DragDropItem from 'components/DragDropItem'
import { Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'

// styled components
const Column = styled.div`
    border: 1px solid lightgrey;
    padding: 8px;
    border-radius: 3px;
`
const ColumnTitle = styled.h3`
    padding: 8px;
`
const ItemList = styled.div`
    padding: 8px;
`

export default class DragDropColumn extends Component {
    render() {
        return (
            <Column className='col-sm-6'>
                <ColumnTitle>{this.props.column.title}</ColumnTitle>
                <Droppable
                    droppableId={this.props.column.id}
                >
                    {(provided, snapshot) => (
                        <ItemList
                            innerRef={provided.innerRef}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {
                                this.props.items.map((item, index) => {
                                    if (item) {
                                        return (
                                            <DragDropItem
                                                key={item.id}
                                                item={item}
                                                index={index}
                                            />
                                        )
                                    }
                                })
                            }
                            {provided.placeholder}
                        </ItemList>
                    )}
                </Droppable>
            </Column>

        )
    }
}
