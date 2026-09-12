# DBMS Academic Project Documentation
## NCC Academic & Management Portal

**Database System**: MySQL 8.0  
**Project Title**: University National Cadet Corps (NCC) Integration & Management System  
**Architecture**: 3-Tier Relational Full-Stack Application  

---

## 1. Problem Statement & Objectives

### 1.1 Problem Statement
In traditional university setups, National Cadet Corps (NCC) operations are managed via manual paper registers, physical logbooks, and fragmented spreadsheet files. This results in key operational challenges:
- High latency in calculating cadet parade attendance percentages required for Certificate B and C examination eligibility.
- Lack of a centralized verification mechanism for official NCC digital certificates, making fraud prevention difficult.
- Inefficient camp application procedures and offline paperwork tracking.
- Absence of real-time analytics for university administration regarding unit strength, gender ratio, department participation, and camp performance.

### 1.2 Proposed System Objectives
The **NCC Academic & Management Portal** database resolves these issues by delivering a normalized relational DBMS schema that:
1. Automates parade attendance calculations and triggers dynamic eligibility warnings.
2. Facilitates role-based workflow control across **Students (Cadets)**, **NCC Officers (ANOs)**, and **Administrators**.
3. Provides an instant public validation engine for issued digital certificates.
4. Generates complex analytical reports via SQL queries (`JOIN`, `GROUP BY`, `HAVING`, subqueries) for academic assessment.

---

## 2. ER Diagram Specification & Entity Sets

### 2.1 Key Entities
- **USERS**: System login credentials, hashed passwords, and role assignment.
- **STUDENTS (CADETS)**: Cadet regimental number, personal info, department, course, academic year, unit, rank, height, weight.
- **OFFICERS (ANO)**: Officer commission number, military rank, designation, unit mapping.
- **UNITS**: Battalion unit details (Army/Navy/Air wing, SD/SW division, sanctioned strength).
- **RANKS**: Rank hierarchy (Cadet to SUO), badge metadata, seniority order.
- **TRAINING_CLASSES**: Scheduled parade drills, lectures, weapon training sessions.
- **ATTENDANCE**: Class-wise attendance marking (Present, Absent, Late, Excused).
- **CAMPS & CAMP_APPLICATIONS**: Camp catalog, registration deadlines, and applicant selection status.
- **CERTIFICATES & TYPES**: Certificate A, B, C issuance records and grades.
- **ACHIEVEMENTS**: Medals, commendation records, and award levels.
- **ACTIVITIES & PARTICIPANTS**: Social service drives (Blood donation, riverfront cleanliness) and logged service hours.
- **NOTICES & GALLERY**: Official announcements, circular attachments, and photo repository.

---

## 3. Relational Schema & Normalization (3NF Proof)

All database tables in `ncc_portal_db` satisfy **Third Normal Form (3NF)**:
1. **First Normal Form (1NF)**: Every column contains atomic values, arrays are decomposed into relational child tables (e.g. `activity_participants`), and primary keys uniquely identify every tuple.
2. **Second Normal Form (2NF)**: All non-key attributes are fully functionally dependent on the primary key. In composite key tables like `role_permissions` (`role_id`, `permission_id`) and `activity_participants` (`activity_id`, `student_id`), no partial dependencies exist.
3. **Third Normal Form (3NF)**: No transitive dependencies exist. Attributes like department names or rank responsibilities are segregated into parent lookup tables (`departments`, `ranks`) rather than being stored repeatedly in `students`.

---

## 4. SQL Queries & Analytical Reports

The system includes 15 production DBMS queries in `database/06_sample_queries.sql` demonstrating:
- **Attendance Percentage Calculation**:
  ```sql
  SELECT s.student_id, CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
         ROUND((SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) AS attendance_percentage
  FROM students s
  LEFT JOIN attendance a ON s.id = a.student_id
  GROUP BY s.id HAVING attendance_percentage >= 75.00;
  ```
- **Certificate B & C Holder Verification**: Multi-table INNER JOIN on `certificates` and `certificate_types`.
- **Department-wise Cadet Enrollment Distribution**: Aggregate grouping with subqueries for percentage calculation.
- **Social Service Leaderboard**: Aggregate SUM on `activity_participants`.

---

## 5. Security & Integrity Constraints

1. **Referential Integrity**: Cascading actions (`ON DELETE CASCADE`, `ON DELETE RESTRICT`) ensure orphan records cannot exist.
2. **Data Validation**: Enforces check constraints and enum types for status fields.
3. **Authentication**: Hashed passwords using bcrypt (`$2a$10$...`) with zero plaintext storage.
4. **Audit Logging**: All write operations insert audit log tuples into `audit_logs`.

---

## 6. Future Scope
- Integration with university single sign-on (SSO).
- QR-code based mobile scanner attendance marking.
- Geofenced GPS validation for outdoor parade drills.
