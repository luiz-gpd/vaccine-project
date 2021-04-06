import React from 'react'
import ClayLayout from '@clayui/layout'

export default function index({ title, children }) {
    return (
        <ClayLayout.Container className="mt-4">
            <h1>{title}</h1>
            { children }
        </ClayLayout.Container>
    )
}
