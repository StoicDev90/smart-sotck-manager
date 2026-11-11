import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import AtomTextFiel from "../inputs/AtomTextFiel";

export default function ReusableModal({
    title,
    fields,
    onSubmit,
    onClose,
    id,
    fetchData,
    fetchOptions
}) {
    const [options, setOptions] = useState({});
    const [filteredOptions, setFilteredOptions] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        // Cargar opciones iniciales (marcas, modelos, etc.)
        fetchOptions().then((data) => {
            setOptions(data);
            setFilteredOptions(data);
        });
    }, []);

    useEffect(() => {
        // Filtrar modelos cuando cambia la marca
        if (formData.marca && options.modelos) {
            const filteredModelos = options.modelos.filter(modelo => modelo.marca?.id === formData.marca.value);
            setFilteredOptions(prev => ({ ...prev, modelos: filteredModelos }));
        } else {
            setFilteredOptions(prev => ({ ...prev, modelos: [] }));
        }
    }, [formData.marca, options]);

    useEffect(() => {
        // Cargar datos del recurso si se proporciona un ID
        if (id) {
            fetchData(id).then((data) => setFormData(data));
        } else {
            setFormData({});
        }
    }, [id]);

    /*const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };*/
    const handleInputChange = (field, value) => {
        setFormData((prev) => {
            if (field === "marca") {
                const mismaMarca =
                    prev.marca?.value === value?.value;

                return {
                    ...prev,
                    marca: value,
                    modelo: mismaMarca ? prev.modelo : null
                };
            }

            return {
                ...prev,
                [field]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            alert(`${title} guardado correctamente`);
            onClose();
        } catch (error) {
            alert(`Error al guardar ${title}`);
            console.error(error);
        }
    };

    return (
        <Fragment>
            <div className="container">
                <h5 className="text-center">{title}</h5>
                <div className="card-body rounded border border-2">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center mb-2">
                            {fields.map((field, index) => (
                                <div className={`col-${field.col || 6}`} key={index}>
                                    {(() => {
                                        switch (field.type) {
                                            case "select":
                                                return (
                                                    <>
                                                        <label>{field.label}</label>
                                                        <Select
                                                            options={filteredOptions[field.optionsKey] || options[field.optionsKey]}
                                                            value={formData[field.name]}
                                                            placeholder={field.placeholder}
                                                            onChange={(e) =>
                                                                handleInputChange(field.name, {
                                                                    value: e.value,
                                                                    label: e.label,
                                                                })
                                                            }
                                                        />
                                                    </>
                                                );
                                            case "date":
                                                return (
                                                    <>
                                                        <label>{field.label}</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            value={formData[field.name] || ""}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    field.name,
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </>
                                                );
                                            default:
                                                return (
                                                    <AtomTextFiel
                                                        label={field.label}
                                                        placeholder={field.placeholder}
                                                        value={formData[field.name] || ""}
                                                        onChange={(e) =>
                                                            handleInputChange(field.name, e.target.value)
                                                        }
                                                    />
                                                )
                                        }

                                    })()}
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-end ml-auto">
                            <button type="submit" className="btn btn-success">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}