import React, { Component } from 'react';


class CategorySelect extends Component {
    state = {}
    render() {
        const { label, effect, name, value, options, handleChange } = this.props
        return (

            <React.Fragment>
                <label htmlFor={name} className="mb-2 ms-2">{label}</label>
                <select className="form-select" name={name} aria-label="Default select example" value={value} onChange={e => handleChange(e, effect)}>
                    <option value="">All</option>
                    {options.map(
                        cate => <option value={cate._id} key={cate._id}>{cate.name}</option>
                    )}
                </select>
            </React.Fragment>);
    }
}

export default CategorySelect;