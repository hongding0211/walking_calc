import './index.css'

const Input = props => {
    return(
        <div className='input-container'>
            <div className='small-title'>
                {props.title}
            </div>
            <input 
                className='input-field'
                placeholder={props.placeHolder}
            />
        </div>
    )
}

export default Input