import React from "react"
import SplitWords from "../split-words"

const TemplateDefault = ({title,subtitle,children}) => (
  <>
     <header className={'main-header'}>
            <div className="paper-and-dots" />
            <div className="main-header__content container">
                <h1 className="main-header__title">
                    <div>
                        <SplitWords>{title}</SplitWords>
                    </div>
                  {!!subtitle &&
                    <div>
                        <SplitWords>{subtitle}</SplitWords>
                    </div>
                  }
                </h1>
            </div>
        </header>
        <main className={`main-content`}>
            <div className="container">
                <div className="col-left">
                </div>
                <div className="col-main">{children}</div>
            </div>
        </main>
    </>
)


export default TemplateDefault
