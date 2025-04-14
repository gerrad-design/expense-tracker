import { useState } from 'react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({ name: '', description: '', amount: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      name: form.name,
      description: form.description,
      amount: parseFloat(form.amount),
    };
    setExpenses([...expenses, newExpense]);
    setForm({ name: '', description: '', amount: '' });
  };

  const filteredExpenses = expenses.filter((exp) =>
    exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
      container: {
        maxWidth: '800px',
        fontFamily: 'Segoe UI, sans-serif',
        backgroundColor: '#f9f9fb',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      },
    
    heading: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333',
    },
    searchInput: {
      width: '97%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      marginBottom: '1.5rem',
      fontSize: '1rem',
    },
    form: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '2rem',
    },
    input: {
      flex: '1 1 30%',
      padding: '0.75rem',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '1rem',
    },
    button: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: 'green',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      color: 'black', 
    },
    th: {
      backgroundColor: '#f1f3f5',
      padding: '1rem',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
    td: {
      padding: '1rem',
      border: '1px solid #eee',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}> Expense Tracker</h1>

      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((exp) => (
            <tr key={exp.id}>
              <td style={styles.td}>{exp.name}</td>
              <td style={styles.td}>{exp.description}</td>
              <td style={styles.td}>${exp.amount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
