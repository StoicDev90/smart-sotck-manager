import React from 'react';
import { Fragment } from 'react';
import InputMask from 'react-input-mask';

export default function IpInput(props){

    return (
        <Fragment>
            <InputMask mask="999.999.999.999" value={props.value} onChange={props.onChange} maskChar=" ">
                {(inputProps) => <input placeholder={props.placeholder} className={props.placeholder}></input>}
            </InputMask>
        </Fragment>
    )
}
