// ... (API configuration stays the same) ...
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// ... (Authentication helpers) ...
export const authAPI = {
  // ... (previous code) ...
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      // Handle non-JSON response (e.g., 404, 500 HTML pages)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Email atau password salah');
      }

      const user = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role?.name || 'user'
      };

      // Store in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('dapoerku_token', data.jwt);
        localStorage.setItem('dapoerku_user', JSON.stringify(user));
      }

      return { user, token: data.jwt };
    } catch (error) {
      if (email === 'admin@dapoerku.com' && password === 'admin123') {
        // ... (demo fallback) ...
        const user = { id: 1, username: 'Admin Dapoerku', email: email, role: 'admin' };
        const token = 'demo-jwt-token-' + Date.now();
        if (typeof window !== 'undefined') {
          localStorage.setItem('dapoerku_token', token);
          localStorage.setItem('dapoerku_user', JSON.stringify(user));
        }
        return { user, token };
      }
      throw error;
    }
  },
  // ... (logout, getToken, etc.) ...
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dapoerku_token');
      localStorage.removeItem('dapoerku_user');
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dapoerku_token');
    }
    return null;
  },

  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('dapoerku_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  isAuthenticated: () => {
    return !!authAPI.getToken();
  }
};

const getAuthHeaders = () => {
  const token = authAPI.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && !token.startsWith('demo-') ? { 'Authorization': `Bearer ${token}` } : {}),
  };
};

export const menuAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/api/menus?sort=createdAt:desc`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      // Better error handling
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("API Error Response:", text);
        throw new Error(`API Connection Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error?.message || 'Gagal mengambil data menu');
      }

      // Handle empty data
      if (!result.data) return [];

      return result.data.map(item => ({
        id: item.documentId || item.id, // Support v5 documentId
        nama: item.nama,
        deskripsi: item.deskripsi,
        harga: item.harga,
        kategori: item.kategori,
        tersedia: item.tersedia,
      }));
    } catch (error) {
      console.error('Error fetching menus:', error);
      throw error;
    }
  },

  create: async (menuData) => {
    try {
      console.log("Sending data to Strapi:", menuData);
      const response = await fetch(`${API_URL}/api/menus`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          data: {
            nama: menuData.nama,
            deskripsi: menuData.deskripsi,
            harga: menuData.harga,
            kategori: menuData.kategori,
            tersedia: menuData.tersedia ?? true,
          }
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("API Error Response:", text);
        throw new Error(`Gagal menyimpan: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Gagal menambahkan menu');
      }

      const item = result.data;
      return {
        id: item.documentId || item.id,
        nama: item.nama,
        deskripsi: item.deskripsi,
        harga: item.harga,
        kategori: item.kategori,
        tersedia: item.tersedia,
      };
    } catch (error) {
      console.error('Error creating menu:', error);
      throw error;
    }
  },

  // ... (update and delete functions with similar error handling improvements) ...
  update: async (id, menuData) => {
    try {
      const response = await fetch(`${API_URL}/api/menus/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          data: menuData
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Gagal update: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || 'Gagal memperbarui menu');
      }
      return result.data;
    } catch (error) {
      console.error('Error updating menu:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/menus/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error?.message || 'Gagal menghapus menu');
      }

      return true;
    } catch (error) {
      console.error('Error deleting menu:', error);
      throw error;
    }
  },
  
  getById: async (id) => { return null; } // Not heavily used in this UI
};

export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
};

export const getCategoryLabel = (category) => {
  const labels = {
    makanan: 'Makanan',
    minuman: 'Minuman',
    dessert: 'Dessert'
  };
  return labels[category] || category;
};

export const getCategoryColor = (category) => {
  const colors = {
    makanan: { bg: '#FEF3C7', text: '#D97706' },
    minuman: { bg: '#DBEAFE', text: '#2563EB' },
    dessert: { bg: '#FCE7F3', text: '#DB2777' }
  };
  return colors[category] || { bg: '#E5E7EB', text: '#6B7280' };
};
