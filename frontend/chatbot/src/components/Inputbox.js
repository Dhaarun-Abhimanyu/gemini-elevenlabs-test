import {useState} from 'react'

const Inputbox = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)  

    const handleSubmit = async (e) => {
        e.preventDefault()

        const input = {message}
        const response = await fetch('/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }else{
            setError(null)
            setMessage('')
            console.log(json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Input prompt</h3>
            <label>text: </label>
            <input
                type="text"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />

            <button className="submit">Input prompt</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Inputbox