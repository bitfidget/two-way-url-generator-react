const snippetsStructured = {
    'snippets': {
        'snip1': {
            'id': 12,
            'title': 'one',
            'content': '<p>Create a production brief with the details of your change (refer to these guidelines)</p>'
        },
        'snip2': {
            'id': 20,
            'title': 'two',
            'content': '<p>Attach the production brief to a new JIRA ticket assigned to your Digital Producer</p>'
        },
        'snip3': {
            'id': 31,
            'title': 'three',
            'content': '<p>Attach the following artefacts to the JIRA ticket to support your request:</p><ul><li>A completed \'Marketing Checklist - General\' relating to your product</li><li>This document, as a record of our conversation</li></ul>'
        }
    },
    'columns': {
        'col1': {
            'id': 'col1',
            'title': 'selected',
            'snippetIds': [
                'snip2'
            ]
        },
        'col2': {
            'id': 'col2',
            'title': 'available',
            'snippetIds': [
                'snip1',
                'snip3'
            ]
        }
    },
    'columnOrder': [
        'col1',
        'col2'
    ]
}