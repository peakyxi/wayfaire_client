import React, { Component } from 'react';
import CategorySelect from './categorySelect'


class CategoryForm extends Component {



    render() {
        const { mainCategory, subCategory, itemCategory, handleSubmit, handleChange, handleGenCate, handleLock, lockButton } = this.props
        return (
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-auto">
                    <CategorySelect effect="subCategory" name="mainCategory" label="Category" value={mainCategory.value} options={mainCategory.options} handleChange={handleChange} />
                </div>
                <div className="col-auto">
                    <CategorySelect effect="itemCategory" name="subCategory" label="SubCategory" current={subCategory.value} options={subCategory.options} handleChange={handleChange} />
                </div>
                <div className="col-auto">
                    <CategorySelect effect="" name="itemCategory" label="ItemCategory" current={itemCategory.value} options={itemCategory.options} handleChange={handleChange} />
                </div>
                <div className="col-auto">
                    <label className="mb-2 ms-2">&nbsp;</label>
                    <button type="submit" className="btn btn-primary d-block" disabled={!lockButton}>Run</button>
                </div>
                <div className="col-auto" >
                    <label className="mb-2 ms-2 px-3" onDoubleClick={handleLock} >&nbsp;</label>
                    <button type="button" className="btn btn-primary d-block" style={{ visibility: lockButton ? "hidden" : "visible" }} onClick={handleGenCate}>Regenerate Category</button>
                </div>

            </form>


        );
    }
}

export default CategoryForm;