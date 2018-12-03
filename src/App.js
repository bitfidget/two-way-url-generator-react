import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import './style/gui.css'

// Components
import DragDropColumn from 'components/DragDropColumn'
import SummaryItem from 'components/SummaryItem'

// feeds
import snippetsStructured from 'feed/snippetsStructured'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snippets: snippetsStructured,
        }

        // main actions
        this.onDragEnd = this.onDragEnd.bind(this)
        this.onReset = this.onReset.bind(this)
    }

    componentDidMount = () => {
        // to cut out some weird mutable data issues - clone the original data
        this.snippetsMaster = JSON.parse(JSON.stringify(snippetsStructured))
    }

    onReset = e => {
        console.log('THE WORLD EXPLODED')
        this.setState({
            snippets: JSON.parse(JSON.stringify(this.snippetsMaster)),
        })
    }

    onDragEnd = result => {
        const { destination, source, draggableId } = result

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

        const start = this.state.snippets.columns[source.droppableId]
        const finish = this.state.snippets.columns[destination.droppableId]

        // moving within same column
        if (start === finish) {
            const newItemIds = Array.from(start.itemIds)
            newItemIds.splice(source.index, 1)
            newItemIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                itemIds: newItemIds,
            }

            const newSnippets = {
                ...this.state.snippets,
                columns: {
                    ...this.state.snippets.columns,
                    [newColumn.id]: newColumn,
                },
            }

            this.setState({
                snippets: newSnippets,
            })
            return
        }

        // moving to another column
        const startItemIds = Array.from(start.itemIds)
        startItemIds.splice(source.index, 1)
        const newStart = {
            ...start,
            itemIds: startItemIds,
        }

        const finishItemIds = Array.from(finish.itemIds)
        finishItemIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            itemIds: finishItemIds,
        }

        const newSnippets = {
            ...this.state.snippets,
            columns: {
                ...this.state.snippets.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        }

        this.setState({
            snippets: newSnippets,
        })
    }

    render() {
        return (<div className="App" >
            <header className="App-header" >
                <h1>Demo drag/drop component </h1>
                <button onClick={this.onReset}>Reset</button>
            </header>
            <main>
                <div className="row" ref={this.snippetRef} >
                    <div className="col-md-8 col-md-offset-2" >
                        <h2 >Select and order the required snippets < /h2>
                        <DragDropContext onDragEnd={this.onDragEnd} > {
                                this.state.snippets.columnOrder.map(
                                    columnId => {
                                        const column = this.state.snippets
                                            .columns[columnId]
                                        const items = column.itemIds.map(
                                            itemId =>
                                                this.state.snippets.items[
                                                itemId
                                                ]
                                        )

                                        return (<
                                            DragDropColumn key={column.id}
                                            column={column}
                                            items={items}
                                        />
                                        )
                                    }
                                )
                            } </DragDropContext> < /div > </div> < /main > </div>
                    )
    }
}

export default App