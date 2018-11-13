import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import './style/gui.css'

// Components
import ControlledRow from 'components/ControlledRow'
import DragDropSection from 'components/DragDropSection'
import DragDropColumn from 'components/DragDropColumn'

// feeds
import snippetsStructured from 'feed/snippetsStructured'
// import contentSummariesJson from 'feed/summaries'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snippetsStructured: snippetsStructured
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }


    onDragEnd = (result) => {
        const {destination, source, draggableId} = result

        // if no destination, do nothing
        if (!destination) {
            return
        }

        // if no change, do nothing
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }

        const start = this.state.snippetsStructured.columns[source.droppableId]
        const finish = this.state.snippetsStructured.columns[destination.droppableId]

        // moving within same column
        if (start === finish) {

            const newItemIds = Array.from(start.itemIds)
            newItemIds.splice(source.index, 1)
            newItemIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                itemIds: newItemIds,
                face: 'shite'
            }

            const newStateSnippetsStructured = {
                ...this.state.snippetsStructured,
                columns: {
                    ...this.state.snippetsStructured.columns,
                    [newColumn.id]: newColumn
                }
            }
            this.setState({
                snippetsStructured: newStateSnippetsStructured
            })
            return
        }

        // moving to another column
        const startItemIds = Array.from(start.itemIds)
        startItemIds.splice(source.index, 1)
        const newStart = {
            ...start,
            itemIds: startItemIds
        }

        const finishItemIds = Array.from(finish.itemIds)
        finishItemIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            itemIds: finishItemIds
        }

        const newStateSnippetsStructured = {
            ...this.state.snippetsStructured,
            columns: {
                ...this.state.snippetsStructured.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        this.setState({
            snippetsStructured: newStateSnippetsStructured
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    CAI URL/Brief Generator
                </header>
                <main>
                    <DragDropContext
                        onDragEnd={this.onDragEnd}
                    >
                        {
                            this.state.snippetsStructured.columnOrder.map(columnId => {
                                const column = this.state.snippetsStructured.columns[columnId]
                                const items = column.itemIds.map(itemId => this.state.snippetsStructured.items[itemId])

                                return (
                                    <DragDropColumn
                                        key={column.id}
                                        column={column}
                                        items={items}
                                    />
                                )
                            })
                        }
                    </ DragDropContext>
                </main>
            </div>
        )
    }
}

export default App;
