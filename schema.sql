-- ============================================================================
-- ITM UNIVERSITY GWALIOR - NCC MANAGEMENT SYSTEM
-- UNIFIED PRODUCTION SCHEMA (schema.sql)
-- Single Source of Truth for Admin, Officer, and Student Portals
-- ============================================================================

CREATE DATABASE IF NOT EXISTS NCC_MANAGEMENT;
USE NCC_MANAGEMENT;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS role_permissions, settings, audit_logs, grievances,
    announcements, fee_payments, certificates, cadet_attendance,
    cadet_enrollment, camp_applications, attendances, events, cadets,
    officers, units, admins, users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. USERS (Central Authentication & Identity)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mobile VARCHAR(20) NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'OFFICER', 'CADET') NOT NULL,
    profile_photo VARCHAR(255) NULL,
    is_active TINYINT(1) DEFAULT 1,
    last_login DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ADMINS (Linked to users)
CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    role ENUM('ANO', 'CTO', 'SUPER_ADMIN') NOT NULL DEFAULT 'SUPER_ADMIN',

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. UNITS (Consistent 3 NCC Battalions)
CREATE TABLE units (
    unit_id INT AUTO_INCREMENT PRIMARY KEY,
    commanding_officer_id INT NULL,
    name VARCHAR(100) NOT NULL UNIQUE,
    location VARCHAR(150) NOT NULL DEFAULT 'ITM University Campus',
    established_year INT NOT NULL DEFAULT 1965,
    quota INT NOT NULL DEFAULT 120
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. OFFICERS (Associate NCC Officers & Staff linked to users and units)
CREATE TABLE officers (
    officer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    unit_id INT NOT NULL,
    rank_name ENUM('ANO', 'CTO', 'PI Staff', 'Captain', 'Subedar Major', 'Havildar') NOT NULL,
    officer_code VARCHAR(50) NOT NULL UNIQUE,
    commissioned_at DATE,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (unit_id)
        REFERENCES units(unit_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Link unit to its commanding officer
ALTER TABLE units
ADD CONSTRAINT fk_unit_commanding_officer
FOREIGN KEY (commanding_officer_id)
REFERENCES officers(officer_id)
ON UPDATE CASCADE
ON DELETE SET NULL;

-- 5. CADETS (Cadet Profiles linked to users, units, and regimental IDs)
CREATE TABLE cadets (
    cadet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    unit_id INT NOT NULL,
    regimental_no VARCHAR(50) NOT NULL UNIQUE,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    rank_name ENUM('SUO', 'UO', 'CQSM', 'CSM', 'Sergeant', 'LCPL', 'CPL', 'Cadet') DEFAULT 'Cadet',
    course VARCHAR(100) NOT NULL DEFAULT 'B.Tech CSE',
    semester VARCHAR(50) NOT NULL DEFAULT '3rd Semester',
    enlisted_at DATE,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (unit_id)
        REFERENCES units(unit_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    INDEX idx_cadets_unit (unit_id),
    INDEX idx_cadets_regimental (regimental_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. EVENTS (Parades, Camps, Competitions & Training)
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    unit_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    event_type ENUM('PARADE', 'ATC', 'RDC', 'TSC', 'TRAINING', 'OTHER') NOT NULL DEFAULT 'PARADE',
    location VARCHAR(200) NOT NULL DEFAULT 'ITM University Ground',
    starts_at DATETIME NOT NULL,
    ends_at DATETIME NOT NULL,
    max_slots INT NOT NULL DEFAULT 60,
    status ENUM('UPCOMING', 'OPEN', 'CLOSED', 'COMPLETED') NOT NULL DEFAULT 'UPCOMING',
    created_by INT NULL,

    FOREIGN KEY (unit_id)
        REFERENCES units(unit_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (created_by)
        REFERENCES officers(officer_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CHECK (ends_at >= starts_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ATTENDANCES (Event and Parade-wise Muster Roll Attendance)
CREATE TABLE attendances (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    cadet_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_date DATE NOT NULL,
    status ENUM('REGISTERED', 'PRESENT', 'ABSENT', 'LATE', 'EXCUSED') DEFAULT 'REGISTERED',
    marked_by INT NULL,
    remarks TEXT NULL,

    UNIQUE KEY uq_event_cadet_date (event_id, cadet_id, attendance_date),

    FOREIGN KEY (event_id)
        REFERENCES events(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (cadet_id)
        REFERENCES cadets(cadet_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (marked_by)
        REFERENCES officers(officer_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_attendances_event_cadet_date (event_id, cadet_id, attendance_date),
    INDEX idx_attendances_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. CADET_ENROLLMENT (Enrollment Workflow for Selection & Applications)
CREATE TABLE cadet_enrollment (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    cadet_id INT NOT NULL,
    unit_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_a_cert_holder ENUM('Yes', 'No') DEFAULT 'No',
    college_dept VARCHAR(100) NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    reviewed_by INT NULL,
    reviewed_at DATETIME NULL,
    remarks TEXT NULL,

    FOREIGN KEY (cadet_id)
        REFERENCES cadets(cadet_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (unit_id)
        REFERENCES units(unit_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    FOREIGN KEY (reviewed_by)
        REFERENCES officers(officer_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_enrollment_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. CADET_ATTENDANCE (Session-wise Training Log Synchronized with Attendances)
CREATE TABLE cadet_attendance (
    cadet_attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    training_enrollment_id INT NOT NULL,
    session_date DATE NOT NULL,
    present BOOLEAN DEFAULT FALSE,

    UNIQUE KEY uq_enrollment_session_date (training_enrollment_id, session_date),

    FOREIGN KEY (training_enrollment_id)
        REFERENCES cadet_enrollment(enrollment_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. CAMP_APPLICATIONS (Cadet Camp Nominations with Approval Pipeline)
CREATE TABLE camp_applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    cadet_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    reviewed_by INT NULL,
    reviewed_at DATETIME NULL,
    remarks TEXT NULL,

    UNIQUE KEY uq_camp_cadet_app (event_id, cadet_id),

    FOREIGN KEY (event_id)
        REFERENCES events(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (cadet_id)
        REFERENCES cadets(cadet_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (reviewed_by)
        REFERENCES officers(officer_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_camp_apps_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. CERTIFICATES (Digital Certificates & Cadet Upload Verification)
CREATE TABLE certificates (
    certificate_id INT AUTO_INCREMENT PRIMARY KEY,
    cadet_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    certificate_number VARCHAR(100) NOT NULL UNIQUE,
    cert_type ENUM('A', 'B', 'C', 'CAMP', 'OTHER') NOT NULL DEFAULT 'OTHER',
    file_path VARCHAR(255) NULL,
    issued_at DATE NULL,
    status ENUM('PENDING', 'VERIFIED', 'REJECTED', 'ISSUED') NOT NULL DEFAULT 'PENDING',
    verified_by INT NULL,
    verified_at DATETIME NULL,
    remarks TEXT NULL,

    FOREIGN KEY (cadet_id)
        REFERENCES cadets(cadet_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (verified_by)
        REFERENCES officers(officer_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_certs_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. FEE_PAYMENTS (Cadet Enrollment & Training Dues)
CREATE TABLE fee_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    cadet_id INT NOT NULL,
    unit_id INT NOT NULL,
    college_dept VARCHAR(100) NOT NULL,
    enrollment_fee DECIMAL(10,2) NOT NULL,
    paid_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'PAID', 'REFUNDED') DEFAULT 'PENDING',

    CHECK (enrollment_fee >= 0),

    FOREIGN KEY (cadet_id)
        REFERENCES cadets(cadet_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (unit_id)
        REFERENCES units(unit_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. ANNOUNCEMENTS (Official Notice Broadcasts with Audience Targeting)
CREATE TABLE announcements (
    announcement_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    category VARCHAR(50) NOT NULL DEFAULT 'General',
    priority ENUM('NORMAL', 'IMPORTANT', 'URGENT') DEFAULT 'NORMAL',
    target_audience ENUM('ALL', 'CADETS', 'OFFICERS') NOT NULL DEFAULT 'ALL',
    unit_id INT NULL,
    posted_by INT NULL,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (unit_id)
        REFERENCES units(unit_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    FOREIGN KEY (posted_by)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. GRIEVANCES (Cadet Helpdesk Tickets & Officer Replies)
CREATE TABLE grievances (
    grievance_id INT AUTO_INCREMENT PRIMARY KEY,
    cadet_id INT NOT NULL,
    ticket_no VARCHAR(50) NOT NULL UNIQUE,
    subject VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL DEFAULT 'General Assistance',
    description TEXT NOT NULL,
    status ENUM('OPEN', 'IN_PROGRESS', 'RESOLVED') NOT NULL DEFAULT 'OPEN',
    reply TEXT NULL,
    replied_by INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (cadet_id)
        REFERENCES cadets(cadet_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (replied_by)
        REFERENCES officers(officer_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_grievances_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. AUDIT_LOGS (Immutable System Governance Trail)
CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. SETTINGS (System Governance Parameters)
CREATE TABLE settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    updated_by INT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (updated_by)
        REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 17. ROLE_PERMISSIONS (Role & Permissions Matrix UI)
CREATE TABLE role_permissions (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('ADMIN', 'OFFICER', 'CADET') NOT NULL,
    permission VARCHAR(100) NOT NULL,
    allowed BOOLEAN NOT NULL DEFAULT TRUE,

    UNIQUE KEY uq_role_perm (role, permission)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
