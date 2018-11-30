import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import './style/gui.css'

// Components
import ControlledRow from 'components/ControlledRow'
import DragDropSection from 'components/DragDropSection'
import DragDropColumn from 'components/DragDropColumn'
import SummaryItem from 'components/SummaryItem'

// functions
import HashString from 'functions/HashString'
import UrlParamaters from 'functions/UrlParamaters'

// feeds
import snippetsStructured from 'feed/snippetsStructured'
import summariesStructured from 'feed/summariesStructured'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            snippets: snippetsStructured,
            summaries: summariesStructured,
            inputUrl: '',
        }

        // main actions
        this.onDragEnd = this.onDragEnd.bind(this)
        this.onEncodeUrl = this.onEncodeUrl.bind(this)
        this.onDecodeUrl = this.onDecodeUrl.bind(this)
        this.onClearUrl = this.onClearUrl.bind(this)
        this.onReset = this.onReset.bind(this)
        this.onCreateNew = this.onCreateNew.bind(this)

        // summary actions
        this.onSummaryClick = this.onSummaryClick.bind(this)

        // scrolling and refs
        this.scrollToRef = this.scrollToRef.bind(this)
        this.welcomeRef = React.createRef()
        this.summaryRef = React.createRef()
        this.snippetRef = React.createRef()
    }

    componentDidMount = () => {
        // to cut out some weird mutable data issues - clone the original data
        this.snippetsMaster = JSON.parse(JSON.stringify(snippetsStructured))
        this.summariesMaster = JSON.parse(JSON.stringify(summariesStructured))
    }

    onClearUrl = e => {
        this.setState({
            inputUrl: '',
        })
    }

    onEncodeUrl = e => {
        const codedSummary = HashString.encode('first')
        const codedItems = HashString.encode(
            this.state.snippets.columns.col1.itemIds
        )
        const codedUrl = UrlParamaters.stringify({
            summary: codedSummary,
            items: codedItems,
        })

        UrlParamaters.objectify(codedUrl)
        alert(codedUrl)
    }

    // example url to test with ?summary=Zmlyc3Q=&items=c25pcDMsc25pcDE=

    onDecodeUrl = e => {
        let retreivedItemsList, retreivedItemsIds

        // retreive items from the URL
        if (this.state.inputUrl) {
            retreivedItemsList =
                UrlParamaters.objectify(this.state.inputUrl).items || ''
            retreivedItemsIds = HashString.decode(retreivedItemsList).split(',')
        } else {
            console.log('ERROR in URL')
            return
        }

        // TODO:
        // 1. MUCH BETTER ERROR HANDLING FOR INPUT URLS
        // 2. ACTUAL URL READER
        // 3. SUMMARY CHOOSER AND DECODER

        // reset so all data is back to first state
        let snippets = JSON.parse(JSON.stringify(this.snippetsMaster))

        let availableItemsIds = Array.from(snippets.columns.col2.itemIds)
        let selectedItemsIds = []

        retreivedItemsIds.map((item, index) => {
            // build selectedIds
            selectedItemsIds.push(item)
            // remove from available Ids
            availableItemsIds.splice(availableItemsIds.indexOf(item), 1)
        })

        snippets.columns.col1.itemIds = selectedItemsIds
        snippets.columns.col2.itemIds = availableItemsIds

        this.setState({
            snippets: snippets,
        })
    }

    onInputUrl = e => {
        this.setState({
            inputUrl: e.target.value,
        })
    }

    onReset = e => {
        console.log('THE WORLD EXPLODED')
        this.setState({
            snippets: JSON.parse(JSON.stringify(this.snippetsMaster)),
        })
    }

    onCreateNew = e => {}

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

    onCreateNew = e => {
        this.scrollToRef(this.summaryRef)
    }

    scrollToRef = elem => {
        window.scrollTo({
            top: elem.current.offsetTop,
            behavior: 'smooth',
        })
    }

    onSummaryClick = e => {
        e.preventDefault()
        const summaries = {
            ...this.state.summaries,
            selectedItemId:
                this.state.summaries.selectedItemId === e.currentTarget.id
                    ? ''
                    : e.currentTarget.id,
        }
        this.setState({
            summaries: summaries,
        })
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    CAI URL / Brief Generator
                </header>
                <main>
                    <div className="row" ref={this.welcomeRef}>
                        <div className="col-md-8 col-md-offset-2 text-center">
                            <h1>Welcome to CAI the brief generator</h1>
                            <h3 />
                            <button onClick={this.onCreateNew}>
                                Create a new brief
                            </button>
                            <h3>or</h3>
                            <input
                                type="text"
                                onChange={this.onInputUrl}
                                value={this.state.inputUrl}
                                placeholder="Paste in exisitng URL"
                            />
                            <button onClick={this.onDecodeUrl}>
                                Unscramble this URL
                            </button>
                            <button onClick={this.onClearUrl}>Clear</button>

                            <button onClick={this.onEncodeUrl}>
                                Done, create my URL
                            </button>

                            <button onClick={this.onReset}> Reset </button>
                        </div>
                    </div>

                    <div className="row" ref={this.summaryRef}>
                        <div className="col-md-8 col-md-offset-2">
                            <h2>1. Select the summary you are creating for</h2>
                            Next steps 1. animate to next step 2. add in classes
                            to hide show according to step 3. how you deal with
                            pasting an exisitng url 4. clean it all up!
                            <div className="summary-item-container">
                                {this.state.summaries.columns.col2.itemIds.map(
                                    item => {
                                        return (
                                            <SummaryItem
                                                key={item.id}
                                                item={
                                                    this.state.summaries.items[
                                                        item
                                                    ]
                                                }
                                                onSummaryClick={
                                                    this.onSummaryClick
                                                }
                                                selectedItemId={
                                                    this.state.summaries
                                                        .selectedItemId
                                                }
                                            />
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row" ref={this.snippetRef}>
                        <div className="col-md-8 col-md-offset-2">
                            <h2>2. Select and order the required snippets</h2>
                            <DragDropContext onDragEnd={this.onDragEnd}>
                                {this.state.snippets.columnOrder.map(
                                    columnId => {
                                        const column = this.state.snippets
                                            .columns[columnId]
                                        const items = column.itemIds.map(
                                            itemId =>
                                                this.state.snippets.items[
                                                    itemId
                                                ]
                                        )

                                        return (
                                            <DragDropColumn
                                                key={column.id}
                                                column={column}
                                                items={items}
                                            />
                                        )
                                    }
                                )}
                            </DragDropContext>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default App
