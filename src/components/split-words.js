import React from "react"

const SplitWords = ({children}) => (
    <span className={`split-words`}>
    {children.toString().split(' ').map((word,k)=>(<span key={k}><span>{word}</span>{` `}</span>))}
    </span>
)


export default SplitWords
