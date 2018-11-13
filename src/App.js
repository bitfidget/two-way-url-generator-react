import React, { Component } from 'react'
// import './App.css';
import './style/gui.css'

// Components
import ControlledRow from 'components/ControlledRow'
import DragDropSection from 'components/DragDropSection'

// feeds
import contentSnippetsJson from 'feed/snippets'
import contentSummariesJson from 'feed/summaries'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadedSummaries: contentSummariesJson,
            loadedSnippets: contentSnippetsJson,
            selectedSnippets: []
        }

        this.handleSummaryChange = this.handleSummaryChange.bind(this)
        this.handleSnippetChange = this.handleSnippetChange.bind(this)

        this.handleListUpdate = this.handleListUpdate.bind(this)

    }

    handleSummaryChange = (e) => {
        let loadedSummaries = this.state.loadedSummaries
        loadedSummaries[e.target.id].checked = !loadedSummaries[e.target.id].checked
        this.setState({
            loadedSummaries: loadedSummaries
        })
    }

    handleSnippetChange = (e) => {
        let loadedSnippets = this.state.loadedSnippets
        loadedSnippets[e.target.id].checked = !loadedSnippets[e.target.id].checked
        this.setState({
            loadedSnippets: loadedSnippets
        })
    }

    handleListUpdate = (e) => {

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    CAI URL/Brief Generator
                </header>
                <main>
                    <div className='section summary'>
                        <h2>Summary</h2>
                        {
                            this.state.loadedSummaries.map((row, i) => (
                                <ControlledRow
                                    key={i}
                                    id={i}
                                    rowContent={{
                                        "title": row.intent,
                                        "content": row.content
                                    }}
                                    rowChecked={row.checked}
                                    controlFunc={this.handleSummaryChange}
                                />
                            ))
                        }
                    </div>
                    <div className='section snippet'>
                        <h2>Snippets</h2>
                        {
                            this.state.loadedSnippets.map((row, i) => (
                                <ControlledRow
                                    key={i}
                                    id={i}
                                    rowContent={{
                                        "title": row.title,
                                        "content": row.content
                                    }}
                                    rowChecked={row.checked}
                                    controlFunc={this.handleSnippetChange}
                                />
                            ))
                        }
                    </div>
                    <DragDropSection
                        items={this.state.loadedSnippets}
                        selected={this.state.selectedSnippets}
                        controlFunc={this.handleListUpdate}
                    />
                </main>
            </div>
        )
    }
}

export default App;
