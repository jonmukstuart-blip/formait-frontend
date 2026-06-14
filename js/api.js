const API = "http://localhost:5000/api";

export async function getMessages(token) {
  const res = await fetch(`${API}/admin/messages`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}