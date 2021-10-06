import React, { Component } from 'react';
import CategoryForm from './categoryForm'
import ProcessList from './processList';
import download from 'downloadjs'
import { toast } from 'react-toastify'
import { initSockjs } from '../services/ws'

import { getCategoriesByParentId, fireScrapingByCategory } from '../services/category_service'

import { getAllProcesses, changeStatus, deleteProcess, getProcessesByIds, fireProductScraping, downloadProductsByCateId } from '../services/process_service'


class MainBlock extends Component {
    state = {
        mainCategory: {
            options: [],
            value: ''
        },
        subCategory: {
            options: [],
            value: ''
        },
        itemCategory: {
            options: [],
            value: ''
        },
        processes: [],
        lockButton: true
    }
    componentDidMount() {
        initSockjs(this.updateProcesses)
        getCategoriesByParentId('-1')
            .then(cates => {
                const mainCategory = JSON.parse(JSON.stringify(this.state.mainCategory))
                mainCategory.options = cates
                mainCategory.value = cates.length && cates[0]._id
                this.setState({ mainCategory })
                setTimeout(() => { document.querySelector(`select[name=mainCategory`).dispatchEvent(new Event('change', { bubbles: true })) }, 10)
            })
        getAllProcesses()
            .then(processes => {


                this.setState({ processes })

            })
            .catch(err => console.log(err.message))

    }
    componentWillUnmount() {

    }

    updateProcesses = async (processes) => {
        console.log(processes)
        this.setState({ processes: JSON.parse(processes) })
    }
    updateOne = async (process) => {
        const processes = JSON.parse(JSON.stringify(this.state.processes))
        const index = processes.findIndex(p => p._id === process._id)
        processes[index] = process
        this.setState({ processes })

    }

    handleChange = (e, effect) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        const category = JSON.parse(JSON.stringify(this.state[name]))
        category.value = value
        this.setState({ [name]: category })

        if (!effect) return
        const effectCategory = JSON.parse(JSON.stringify(this.state[effect]))
        if (!value) {
            effectCategory.options = []
            effectCategory.value = ''
            this.setState({ [effect]: effectCategory })
        } else {
            getCategoriesByParentId(value)
                .then(cates => {
                    effectCategory.options = cates
                    effectCategory.value = cates.length && cates[0]._id
                    this.setState({ [effect]: effectCategory })

                })
        }
        setTimeout(() => { document.querySelector(`select[name=${effect}`).dispatchEvent(new Event('change', { bubbles: true })) }, 10)

    }
    handleStart = (cateId) => {
        fireProductScraping(cateId)
            .then(process => {
                const processes = JSON.parse(JSON.stringify(this.state.processes))
                let exists = processes.find(p => p._id === process._id)

                if (exists) {
                    let index = processes.indexOf(exists)
                    processes[index] = process
                } else {
                    processes.push(process)
                }

                this.setState({ processes })
            }).catch(err => {
                toast.error(err.response.data.message)
            })
    }
    handleDownload = () => {
        const { mainCategory, subCategory, itemCategory } = this.state
        const cateId = itemCategory.value || subCategory.value || mainCategory.value
        downloadProductsByCateId(cateId)
            .then(data => {
                download(JSON.stringify(data, null, 2), `download_${cateId}.json`, 'text/plain')
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { mainCategory, subCategory, itemCategory } = this.state
        const cateId = itemCategory.value || subCategory.value || mainCategory.value
        this.handleStart(cateId)
    }
    handleGenCate = () => {
        fireScrapingByCategory()
    }

    handleChangeStatus = (id, status, index) => {
        changeStatus(id, status)
            .then(process => {
                this.updateOne(process)
            })
            .catch(err => {
                console.log("stop error")
                toast.error(err.response.data.message)
            })
    }
    handleDelete = (id, index) => {
        deleteProcess(id)
            .then(process => {
                const processes = JSON.parse(JSON.stringify(this.state.processes))
                processes.splice(index, 1)
                this.setState({ processes })
            })
    }
    handleLock = () => {
        this.setState({ lockButton: !this.state.lockButton })
    }
    render() {
        const { mainCategory, subCategory, itemCategory, processes, lockButton } = this.state
        return (
            <React.Fragment>
                <div className="row">
                    <CategoryForm mainCategory={mainCategory} subCategory={subCategory} itemCategory={itemCategory} handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange} handleGenCate={this.handleGenCate} handleLock={this.handleLock} lockButton={lockButton}
                        handleDownload={this.handleDownload} />
                </div>
                <div className="row mt-3">
                    <ProcessList processes={processes} handleDelete={this.handleDelete} handleChangeStatus={this.handleChangeStatus} handleStart={this.handleStart} lockButton={lockButton} />
                </div>

            </React.Fragment>

        );
    }
}

export default MainBlock;