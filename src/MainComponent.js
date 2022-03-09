import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';


const MainComponent = () => {
    const [values, setValues] = useState([]);
    const [value, setValue] = useState('');

    const getAllNumbers = useCallback(async () => {
        const data = await axios.get('/api/values/all');
        setValues(data.data.rows.map(row => row.number));
    }, []);

    const saveNumber = useCallback(async (event) => {
        event.preventDefault();
        await axios.post('/api/values', {
            value
        });
        setValue('');
        getAllNumbers();
    }, [value, getAllNumbers]);

    useEffect(() => {
        getAllNumbers();
    }, []);

    return (
        <div>
            <button onClick = {getAllNumbers}>Get all numbers</button>
            <span>Values</span>
            <div>
                {values.map((value) => <div>{value}</div>)}
            </div>
            <form onSubmit={saveNumber}>
                <label>Enter your value: </label>
                <input value = {value} onChange = {(event) => { setValue(event.target.value)}}/>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default MainComponent;