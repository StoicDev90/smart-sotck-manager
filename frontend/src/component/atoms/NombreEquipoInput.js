import React from 'react';
import { Fragment } from 'react';
import InputMask from 'react-input-mask';

export default function NombreEquipoInput(props) {

    return(
        <Fragment>
            <InputMask mask="aaa9999aa" value={props.value} onChange={props.onChange}>
                {(inputProps) => <input placeholder={props.placeholder} className={props.placeholder}></input>}
            </InputMask>
        </Fragment>
    )
}