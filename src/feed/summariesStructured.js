const summariesStructured = {
    items: {
        summary1: {
            id: 'summary1',
            intent: 'changeRisk.Reuse.Product.Same',
            content:
                '<ul>\n<li>Repurpose existing live content, that was approved within the last 3 months</li>\n<li>Amend an existing page</li>\n<li>Relate to the same product and same brand as the original content</li>\n</ul>',
        },
        summary2: {
            id: 'summary2',
            intent: 'changeRisk.Other.ExtendingOffer.First',
            content:
                '<ul>\n<li>Amend live content that sits on an existing digital page</li>\n<li>Extend an offer date, for an offer that is currently live</li>\n<li>Be the first time this specific offer is being extended</li>\n</ul>',
        },
        summary3: {
            id: 'summary3',
            intent: 'changeRisk.New.CXyes',
            content:
                '<ul>\n<li>Involve the creation of a new page, with new content and/or a new offer</li>\n<li>A change to the customer experience</li>\n</ul>',
        },
    },
    columns: {
        col1: {
            id: 'col1',
            title: 'opened',
            itemIds: [],
        },
        col2: {
            id: 'col2',
            title: 'closed',
            itemIds: ['summary1', 'summary2', 'summary3'],
        },
    },
    selectedItemId: '',
}

export default summariesStructured
