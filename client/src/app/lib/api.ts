const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed.");
  }

  return result;
}

interface LoginData {
  email: string;
  password: string;
  captchaToken?: string;
}

export async function loginUser(data: LoginData) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed.");
  }

  return result;
}
export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unauthorized");
  }

  return result;
}
interface VerifyMfaData {
  email: string;
  token: string;
}

export async function verifyLoginMfa(
  data: VerifyMfaData
) {
  const response = await fetch(
    `${API_BASE_URL}/mfa/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "MFA verification failed.");
  }

  return result;
}
export async function getUserDashboard() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/dashboard/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function getAvailableTables(
  date: string,
  time: string,
  guests: number
) {
  const response = await fetch(
    `${API_BASE_URL}/tables/available?date=${date}&time=${time}&guests=${guests}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch available tables.");
  }

  return result;
}
interface ReservationData {
  table: string;
  reservationDate: string;
  reservationTime: string;
  numberOfGuests: number;
}

export async function createReservation(
  data: ReservationData
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/reservations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Reservation failed.");
  }

  return result;
}
export async function requestPasswordReset(email: string) {
  const response = await fetch(
    `${API_BASE_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send reset link.");
  }

  return result;
}
export async function resetPassword(
  token: string,
  newPassword: string
) {
  const response = await fetch(
    `${API_BASE_URL}/auth/reset-password/${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Password reset failed.");
  }

  return result;
}
interface PaymentData {
  amount: number;
  purchaseOrderId: string;
  purchaseOrderName: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export async function initiatePayment(
  data: PaymentData
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/payment/initiate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Payment initiation failed.");
  }

  return result;
}
export async function verifyPayment(
  pidx: string
) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/payment/verify`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pidx }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
export async function getMyReservations() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/reservations/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch reservations.");
  }

  return result;
}

export async function cancelReservation(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/reservations/${id}/cancel`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to cancel reservation.");
  }

  return result;
}
export async function getAllUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch users.");
  }

  return result;
}
export async function getProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch profile.");
  }

  return result;
}
interface UpdateProfileData {
  name: string;
  phoneNumber: string;
}

export async function updateProfile(
  data: UpdateProfileData
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update profile.");
  }

  return result;
}
export async function uploadProfileImage(file: File) {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await fetch(`${API_BASE_URL}/profile/image`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to upload image.");
  }

  return result;
}
export async function exportProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/profile/export`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to export profile.");
  }

  return await response.blob();
}
export async function importProfile(data: {
  name: string;
  phoneNumber: string;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/profile/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to import profile.");
  }

  return result;
}
export async function deleteUser(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete user.");
  }

  return result;
}
export async function getUserDetails(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to fetch user details."
    );
  }

  return result;
}