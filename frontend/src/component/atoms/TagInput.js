import React from 'react';
import { Fragment } from 'react';
import InputMask from 'react-input-mask';

export default function TagInput(props){


    return (
        <Fragment>
            <InputMask mask="999999" value={props.value} onChange={props.onChange}>
                {(inputProps) => <input placeholder={props.placeholder} className={props.placeholder}></input>}
            </InputMask>
        </Fragment>
    )
}
