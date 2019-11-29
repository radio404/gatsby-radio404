import React from "react"
import SplitWords from "../split-words"

const TemplateDefault = props => (
  <div className={'site-main'}>
     <header className={'main-header'}>
            <div className="paper-and-dots" />
            <div className="main-header__content container">
                <h1 className="main-header__title">
                    <div>
                        <SplitWords>{props.title}</SplitWords>
                    </div>
                    <div>
                        <SplitWords>{props.subtitle}</SplitWords>
                    </div>
                </h1>
            </div>
        </header>
        <main className={`main-content`}>
            <div className="container">
                <div className="col-left">
                </div>
                <div className="col-main">{props.children}</div>
            </div>
        </main>
    </div>
)


export default TemplateDefault
