const API = 'http://localhost:4000';
const { useEffect, useState } = React;

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [search, setSearch] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [doctorForm, setDoctorForm] = useState({ name: '', specialty: '', department: '', contact_info: '' });
  const [patientForm, setPatientForm] = useState({ name: '', personal_info: '', doctor_id: '' });
  const [diagnosisForm, setDiagnosisForm] = useState({ icd_code: '', description: '', severity: '', patient_id: '' });

  const authHeaderValue = ['Bearer', token].join(' ');
  const headers = token
    ? { Authorization: authHeaderValue, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };

  const request = async (path, options = {}) => {
    const res = await fetch(`${API}${path}`, { ...options, headers: { ...headers, ...(options.headers || {}) } });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || `HTTP ${res.status}`);
    }
    return res.status === 204 ? null : res.json();
  };

  const refreshAll = async () => {
    if (!token) return;
    try {
      const [ds, ps, gs] = await Promise.all([
        request('/api/doctors'),
        request('/api/patients'),
        role === 'receptionist' ? Promise.resolve([]) : request('/api/diagnoses')
      ]);
      setDoctors(ds);
      setPatients(ps);
      setDiagnoses(gs);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => { refreshAll(); }, [token, role]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const data = await request('/api/auth/login', { method: 'POST', body: JSON.stringify(loginForm) });
      setToken(data.token);
      setRole(data.role);
      setUsername(data.username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const logout = () => {
    setToken(''); setRole(''); setUsername(''); setProfile(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  };

  const createDoctor = async (e) => {
    e.preventDefault();
    await request('/api/doctors', { method: 'POST', body: JSON.stringify(doctorForm) });
    setDoctorForm({ name: '', specialty: '', department: '', contact_info: '' });
    refreshAll();
  };

  const createPatient = async (e) => {
    e.preventDefault();
    await request('/api/patients', { method: 'POST', body: JSON.stringify({ ...patientForm, doctor_id: patientForm.doctor_id || null }) });
    setPatientForm({ name: '', personal_info: '', doctor_id: '' });
    refreshAll();
  };

  const createDiagnosis = async (e) => {
    e.preventDefault();
    await request('/api/diagnoses', { method: 'POST', body: JSON.stringify({ ...diagnosisForm, patient_id: Number(diagnosisForm.patient_id) || null }) });
    setDiagnosisForm({ icd_code: '', description: '', severity: '', patient_id: '' });
    refreshAll();
  };

  const loadProfile = async (patientId) => {
    const data = await request(`/api/patients/${patientId}/profile`);
    setProfile(data);
  };

  const runSearch = async (e) => {
    e.preventDefault();
    const data = await request(`/api/search?q=${encodeURIComponent(search)}`);
    setDoctors(data.doctors);
    setPatients(data.patients);
    setDiagnoses(data.diagnoses);
  };

  if (!token) {
    return (
      <div className="container">
        <div className="card">
          <h1>CareTrack TYBT Login</h1>
          <p className="small">Sign in with credentials configured by your deployment administrator.</p>
          <form onSubmit={login} className="grid">
            <input placeholder="Username" value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} />
            <input type="password" placeholder="Password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            <button type="submit">Sign in</button>
          </form>
          {error && <p style={{ color: '#dc2626' }}>{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1>CareTrack Clinic Dashboard</h1>
        <p className="small">Signed in as <strong>{username}</strong> ({role})</p>
        <div className="grid">
          <form onSubmit={runSearch}>
            <input placeholder="Search doctors/patients/diagnoses" value={search} onChange={(e) => setSearch(e.target.value)} />
          </form>
          <button className="secondary" onClick={refreshAll}>Refresh</button>
          <button className="danger" onClick={logout}>Logout</button>
        </div>
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      </div>

      {(role === 'admin') && (
        <div className="card">
          <h2>Create Doctor</h2>
          <form onSubmit={createDoctor} className="grid">
            <input required placeholder="Name" value={doctorForm.name} onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })} />
            <input placeholder="Specialty" value={doctorForm.specialty} onChange={(e) => setDoctorForm({ ...doctorForm, specialty: e.target.value })} />
            <input placeholder="Department" value={doctorForm.department} onChange={(e) => setDoctorForm({ ...doctorForm, department: e.target.value })} />
            <input placeholder="Contact" value={doctorForm.contact_info} onChange={(e) => setDoctorForm({ ...doctorForm, contact_info: e.target.value })} />
            <button type="submit">Add Doctor</button>
          </form>
        </div>
      )}

      {(role === 'admin' || role === 'receptionist') && (
        <div className="card">
          <h2>Register Patient</h2>
          <form onSubmit={createPatient} className="grid">
            <input required placeholder="Patient name" value={patientForm.name} onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })} />
            <textarea placeholder="Personal info" value={patientForm.personal_info} onChange={(e) => setPatientForm({ ...patientForm, personal_info: e.target.value })}></textarea>
            <select value={patientForm.doctor_id} onChange={(e) => setPatientForm({ ...patientForm, doctor_id: e.target.value })}>
              <option value="">Assign doctor</option>
              {doctors.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
            <button type="submit">Save Patient</button>
          </form>
        </div>
      )}

      {(role === 'admin') && (
        <div className="card">
          <h2>Create Diagnosis</h2>
          <form onSubmit={createDiagnosis} className="grid">
            <input placeholder="ICD code" value={diagnosisForm.icd_code} onChange={(e) => setDiagnosisForm({ ...diagnosisForm, icd_code: e.target.value })} />
            <input placeholder="Severity" value={diagnosisForm.severity} onChange={(e) => setDiagnosisForm({ ...diagnosisForm, severity: e.target.value })} />
            <textarea placeholder="Description" value={diagnosisForm.description} onChange={(e) => setDiagnosisForm({ ...diagnosisForm, description: e.target.value })}></textarea>
            <select value={diagnosisForm.patient_id} onChange={(e) => setDiagnosisForm({ ...diagnosisForm, patient_id: e.target.value })}>
              <option value="">Select patient</option>
              {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <button type="submit">Save Diagnosis</button>
          </form>
        </div>
      )}

      <div className="card">
        <h2>Doctors</h2>
        <table className="table"><thead><tr><th>Name</th><th>Specialty</th><th>Department</th></tr></thead><tbody>{doctors.map(d => <tr key={d.id}><td>{d.name}</td><td>{d.specialty}</td><td>{d.department}</td></tr>)}</tbody></table>
      </div>

      <div className="card">
        <h2>Patients</h2>
        <table className="table"><thead><tr><th>Name</th><th>Doctor</th><th>Profile</th></tr></thead><tbody>{patients.map(p => <tr key={p.id}><td>{p.name}</td><td>{p.doctor_name || '-'}</td><td><button className="secondary" onClick={() => loadProfile(p.id)}>View profile</button></td></tr>)}</tbody></table>
      </div>

      {role !== 'receptionist' && (
        <div className="card">
          <h2>Diagnoses</h2>
          <table className="table"><thead><tr><th>ICD</th><th>Description</th><th>Severity</th></tr></thead><tbody>{diagnoses.map(d => <tr key={d.id}><td>{d.icd_code}</td><td>{d.description}</td><td>{d.severity}</td></tr>)}</tbody></table>
        </div>
      )}

      {profile && (
        <div className="card">
          <h2>Patient Full Profile</h2>
          <p><strong>{profile.name}</strong> — {profile.personal_info}</p>
          <p>Doctor: {profile.doctor_name || 'Not assigned'} ({profile.specialty || '-'})</p>
          <ul>{profile.diagnoses.map((dx) => <li key={dx.id}>{dx.icd_code} - {dx.description} ({dx.severity})</li>)}</ul>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
