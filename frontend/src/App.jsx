import { useState } from 'react'

function App() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '1',
    feet: '',
    inches: '',
    weight: '',
    ap_hi: '',
    ap_lo: '',
    cholesterol: '1',
    gluc: '1',
    smoke: '0',
    alco: '0',
    active: '1'
  })
  
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Convert imperial to metric
    const heightCm = (Number(formData.feet) * 30.48) + (Number(formData.inches) * 2.54)
    const weightKg = Number(formData.weight) * 0.453592
    
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(formData.age) * 365,
          gender: Number(formData.gender),
          height: heightCm,
          weight: weightKg,
          ap_hi: Number(formData.ap_hi),
          ap_lo: Number(formData.ap_lo),
          cholesterol: Number(formData.cholesterol),
          gluc: Number(formData.gluc),
          smoke: Number(formData.smoke),
          alco: Number(formData.alco),
          active: Number(formData.active)
        })
      })
      
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: 'Could not connect to server' })
    }
    
    setLoading(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxSizing: 'border-box'
  }

  const selectStyle = {
    ...inputStyle,
    backgroundColor: 'white'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: '600',
    color: '#333'
  }

  const fieldStyle = {
    marginBottom: '20px'
  }

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '40px auto', 
      padding: '30px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        color: '#2c3e50',
        marginBottom: '10px',
        fontSize: '24px'
      }}>
        Cardiovascular Disease Risk Predictor
      </h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Enter your health information to assess risk
      </p>
      
      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Age (years)</label>
          <input 
            type="number" 
            name="age" 
            value={formData.age} 
            onChange={handleChange} 
            placeholder="e.g. 45"
            style={inputStyle}
            required 
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} style={selectStyle}>
            <option value="1">Female</option>
            <option value="2">Male</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Height</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="number" 
              name="feet" 
              value={formData.feet} 
              onChange={handleChange} 
              placeholder="ft"
              style={{ ...inputStyle, width: '50%' }}
              required 
            />
            <input 
              type="number" 
              name="inches" 
              value={formData.inches} 
              onChange={handleChange} 
              placeholder="in"
              style={{ ...inputStyle, width: '50%' }}
              required 
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Weight (lbs)</label>
          <input 
            type="number" 
            name="weight" 
            value={formData.weight} 
            onChange={handleChange} 
            placeholder="e.g. 165"
            style={inputStyle}
            required 
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Blood Pressure</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="number" 
              name="ap_hi" 
              value={formData.ap_hi} 
              onChange={handleChange} 
              placeholder="Systolic"
              style={{ ...inputStyle, width: '45%' }}
              required 
            />
            <span style={{ color: '#666' }}>/</span>
            <input 
              type="number" 
              name="ap_lo" 
              value={formData.ap_lo} 
              onChange={handleChange} 
              placeholder="Diastolic"
              style={{ ...inputStyle, width: '45%' }}
              required 
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Cholesterol Level</label>
          <select name="cholesterol" value={formData.cholesterol} onChange={handleChange} style={selectStyle}>
            <option value="1">Normal</option>
            <option value="2">Above Normal</option>
            <option value="3">Well Above Normal</option>
          </select>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Glucose Level</label>
          <select name="gluc" value={formData.gluc} onChange={handleChange} style={selectStyle}>
            <option value="1">Normal</option>
            <option value="2">Above Normal</option>
            <option value="3">Well Above Normal</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Smoker?</label>
            <select name="smoke" value={formData.smoke} onChange={handleChange} style={selectStyle}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Alcohol?</label>
            <select name="alco" value={formData.alco} onChange={handleChange} style={selectStyle}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Active?</label>
            <select name="active" value={formData.active} onChange={handleChange} style={selectStyle}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          style={{ 
            width: '100%',
            padding: '14px 20px', 
            fontSize: '18px',
            fontWeight: '600',
            color: 'white',
            backgroundColor: loading ? '#95a5a6' : '#3498db',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Analyzing...' : 'Get Prediction'}
        </button>
      </form>

      {result && (
        <div style={{ 
          marginTop: '25px', 
          padding: '20px', 
          backgroundColor: result.error ? '#ffeaa7' : (result.risk === 'High' ? '#ffcccc' : '#ccffcc'), 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {result.error ? (
            <p style={{ margin: 0, color: '#d35400' }}>{result.error}</p>
          ) : (
            <>
              <h2 style={{ margin: '0 0 10px 0', color: result.risk === 'High' ? '#c0392b' : '#27ae60' }}>
                {result.risk} Risk
              </h2>
              <p style={{ margin: 0, fontSize: '18px', color: '#555' }}>
                Probability: {(result.probability * 100).toFixed(1)}%
              </p>
            </>
          )}
        </div>
      )}

      <p style={{ marginTop: '25px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
        Built with a neural network trained on cardiovascular health data.
        <br />Not intended for medical diagnosis.
      </p>
    </div>
  )
}

export default App
