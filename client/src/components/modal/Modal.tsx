import './modal.scss'

interface IModalProps {
    header?: JSX.Element | string
    content?: JSX.Element | string
    footer?: JSX.Element | string
}

const Modal = ({ content } : { content: IModalProps }) => {

    return (
        <>
            <div className="modal-slot">
                <div className="modal">
                    {content.header ? (<div className="header">{ content.header }</div>) : null}
                    {content.content ? (<div className="content">{ content.content }</div>) : null}
                    {content.footer ? (<div className="footer">{ content.footer }</div>) : null}
                </div>
            </div>
        </>
    )
}

export default Modal