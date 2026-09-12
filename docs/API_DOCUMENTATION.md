# Express REST API Documentation
## NCC Academic & Management Portal

Base URL: `http://localhost:5000/api`

---

## Endpoints Summary

### 1. System & Authentication
- `GET /api/health` - Check backend API service status.
- `POST /api/auth/login` - Authenticate user credentials and return role-based session data.
  - **Body**: `{ "email": "officer@ncc.demo", "password": "password123" }`

### 2. Statistics & Public Portal Data
- `GET /api/stats` - Fetch database statistics (cadets, camps, certificates, achievements, service hours).
- `GET /api/notices` - Fetch active notices and circulars.
- `POST /api/notices` - Create new notice (Officer / Admin).
- `GET /api/camps` - Fetch upcoming and ongoing camps catalog.
- `POST /api/camps` - Create new camp listing.

### 3. Certificates & Verification
- `GET /api/certificates` - List issued certificates.
- `GET /api/certificates/verify/:certNum` - Real-time public serial number verification tool.
  - **Example**: `GET /api/certificates/verify/NCC-CERT-2024-B-8902`

### 4. Configurable Rules & Administration
- `GET /api/eligibility-rules` - Fetch current active eligibility thresholds.
- `PUT /api/eligibility-rules` - Update min attendance percentage, height thresholds, GPA rules.
- `GET /api/achievements` - Fetch campus achievers directory.
