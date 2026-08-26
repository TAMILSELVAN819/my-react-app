import React, { useState, useEffect } from 'react';
import { getTransactions, createTransaction } from './api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    customerName: '',
    customerno: '',
    connectionType: 'Domestic',
    previousReading: '',
    currentReading: '',
    noOfUnits: '',
    amount: ''
  });

  // Fetch data on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      alert('Transaction Saved Successfully!');
      fetchData(); // Refresh table
      setFormData({
        customerName: '',
        customerno: '',
        connectionType: 'Domestic',
        previousReading: '',
        currentReading: '',
        noOfUnits: '',
        amount: ''
      });
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>TNEB Customer Application</h2>
      
      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <div>
          <label>Customer Name: </label>
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
        </div>
        <div>
          <label>Consumer Number: </label>
          <input type="text" name="customerno" value={formData.customerno} onChange={handleChange} required />
        </div>
        <div>
          <label>Connection Type: </label>
          <select name="connectionType" value={formData.connectionType} onChange={handleChange}>
            <option value="Domestic">Domestic</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label>Previous Reading: </label>
          <input type="number" name="previousReading" value={formData.previousReading} onChange={handleChange} />
        </div>
        <div>
          <label>Current Reading: </label>
          <input type="number" name="currentReading" value={formData.currentReading} onChange={handleChange} />
        </div>
        <div>
          <label>No of Units: </label>
          <input type="number" name="noOfUnits" value={formData.noOfUnits} onChange={handleChange} />
        </div>
        <div>
          <label>Amount: </label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
      </form>

      {/* Transactions List Table */}
      <h3>Saved Customer Records</h3>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Consumer No</th>
            <th>Type</th>
            <th>Units</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.customerName}</td>
              <td>{tx.customerno}</td>
              <td>{tx.connectionType}</td>
              <td>{tx.noOfUnits}</td>
              <td>{tx.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;