import React, { Component } from 'react'
// import './App.css';
import 'style/gui.css'

// Components
import ControlledRow from 'components/ControlledRow'

// feeds
import contentSnippetsJson from 'feed/snippets'
import contentSummariesJson from 'feed/summaries'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stateSummaries: contentSummariesJson,
            stateSnippets: contentSnippetsJson
        }

        this.handleSummaryChange = this.handleSummaryChange.bind(this)
        this.handleSnippetChange = this.handleSnippetChange.bind(this)

    }

    handleSummaryChange = (e) => {
        let stateSummaries = this.state.stateSummaries
        stateSummaries[e.target.id].checked = !stateSummaries[e.target.id].checked
        this.setState({
            stateSummaries: stateSummaries
        })
    }

    handleSnippetChange = (e) => {
        let stateSnippets = this.state.stateSnippets
        stateSnippets[e.target.id].checked = !stateSnippets[e.target.id].checked
        this.setState({
            stateSnippets: stateSnippets
        })
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
                            this.state.stateSummaries.map((row, i) => (
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
                            this.state.stateSnippets.map((row, i) => (
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
                </main>
            </div>
        )
    }
}

export default App;
