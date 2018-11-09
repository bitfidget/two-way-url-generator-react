function contentSummariesJson() {
    return [
        {
            intent: 'changeRisk.Reuse.Product.Same',
            content: '<ul>\n<li>Repurpose existing live content, that was approved within the last 3 months</li>\n<li>Amend an existing page</li>\n<li>Relate to the same product and same brand as the original content</li>\n</ul>'
        },
        {
            intent: 'changeRisk.Other.ExtendingOffer.First',
            content: '<ul>\n<li>Amend live content that sits on an existing digital page</li>\n<li>Extend an offer date, for an offer that is currently live</li>\n<li>Be the first time this specific offer is being extended</li>\n</ul>'
        },
        {
            intent: 'changeRisk.New.CXyes',
            content: '<ul>\n<li>Repurpose existing live content, that was approved within the last 3 months</li>\n<li>Amend an existing page</li>\n<li>Relate to the same product and same brand as the original content</li>\n</ul>'
        }
    ]
}

export default contentSummariesJson
