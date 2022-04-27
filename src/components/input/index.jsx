import './index.css'

/*
 * @Project    : walking_calc
 * @Created    : hong 2021/11/16 21:14
 * @Component  : Input
 * @Props      : title: String,
 *               placeHolder: String,
 *               inputRef: ReactRef
 * @Description: A simple input component with a title.
*/

const Input = props => {
    function inputChangeHandler(e) {
        const content = e.target.value
        props?.onChange && props.onChange(content)
    }
    return (
        <div className='input-container'>
            <div className='small-title'>
                {props.title}
            </div>
            <input
                className='input-field'
                placeholder={props.placeHolder}
                ref={props.inputRef}
                inputMode = {props?.inputMode}
                type = {props?.type}
                step = {props?.step}
                pattern = {props?.pattern}
                onChange = {inputChangeHandler}
            />
        </div>
    )
}

export default Input
