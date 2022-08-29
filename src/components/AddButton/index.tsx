import React, { useState } from 'react'
import { updateCardList, updateData } from '../../actions/updateList';
import { StorageContext } from '../StorageProvider';
// import { StorageContext } from '../StorageProvider';

type AddButtonProps = {
    type?: string,
    listId?: number
}
const styles = {
    buttonStyle: {
        padding: '6px 10px',
        background: 'transparent',
        border: 0,
        fontSize: '16px',
    },

    formStyle: {
        display: 'flex',
    },

    listButton: {
        background: '#dcdcdc99',
        padding: '6px 10px',
        border: 0,
        fontWeight: 'bold',
        color: '#4e2d09'
    }
}

const initialFormState = {
    text: ''
}

const AddButton = ({type = 'card', listId}: AddButtonProps) => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState(initialFormState)
    const storage = React.useContext(StorageContext)
    console.log('storage', storage)
    let updatedList = storage.get('list')

    const handleCloseForm = () => {
        setShowForm(false);
        setFormData(initialFormState)
    }
    
    const handleSubmission = () => {
        if(type !== 'card') {
            updatedList = updateData(updatedList, {title: formData.text, cards: [],})
        }
        else{
            updatedList = updateCardList(updatedList, {desc: formData.text}, listId)
        }
        storage.set('list', updatedList)
        handleCloseForm()
    }

    
    const renderButton = () => {
        return <button 
        style={type === 'card' ? styles.buttonStyle : styles.listButton} 
        onClick={() => {
            setShowForm(true)
        }}>
            + Add a new {type}
        </button>
    }

    const renderForm = () => {
        return <div style={styles.formStyle}>
            <textarea rows={3} placeholder='Enter Value' value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})}/>
            <button
            disabled={!formData.text}
            onClick={() => {
                handleSubmission()
            }}
            style={styles.buttonStyle}>
                Add
            </button>
            <button onClick={handleCloseForm} style={styles.buttonStyle}> X </button>
        </div>
    }

    return(
        showForm ? renderForm() : renderButton()
    )

}

export default AddButton