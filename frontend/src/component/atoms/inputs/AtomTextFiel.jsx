import { Fragment } from "react";

export default function AtomTextFiel(props) {
    return (
        <Fragment>
            <div className="d-flex flex-column h-50 w-100">
                <label>{props.label}</label>
                <input placeholder={props.placeholder} className={props.className} value={props.value} onChange={props.onChange}/>
            </div>
        </Fragment>
    );
}