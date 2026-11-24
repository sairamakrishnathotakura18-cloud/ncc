-- ============================================================================
-- MIGRATION SCRIPT: TRANSFORM ORIGINAL 11 TABLES TO PRODUCTION SCHEMA
-- Applies all customizations specified in STEP 1
-- ============================================================================

USE NCC_MANAGEMENT;

-- ----------------------------------------------------------------------------
-- 1. Create USERS table & link to ADMINS, OFFICERS, CADETS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
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

-- Add user_id to admins
ALTER TABLE admins
ADD COLUMN user_id INT NOT NULL UNIQUE AFTER admin_id,
ADD CONSTRAINT fk_admins_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add user_id and officer_code to officers
ALTER TABLE officers
ADD COLUMN user_id INT NOT NULL UNIQUE AFTER officer_id,
ADD COLUMN officer_code VARCHAR(50) NOT NULL UNIQUE AFTER rank_name,
ADD CONSTRAINT fk_officers_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- Add user_id, regimental_no, roll_number, course, semester to cadets
ALTER TABLE cadets
ADD COLUMN user_id INT NOT NULL UNIQUE AFTER cadet_id,
ADD COLUMN regimental_no VARCHAR(50) NOT NULL UNIQUE AFTER unit_id,
ADD COLUMN roll_number VARCHAR(50) NOT NULL UNIQUE AFTER regimental_no,
ADD COLUMN course VARCHAR(100) NOT NULL DEFAULT 'B.Tech CSE' AFTER rank_name,
ADD COLUMN semester VARCHAR(50) NOT NULL DEFAULT '3rd Semester' AFTER course,
ADD CONSTRAINT fk_cadets_user FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;

-- ----------------------------------------------------------------------------
-- 2. Standardize Units & Add Details
-- ----------------------------------------------------------------------------
ALTER TABLE units
ADD COLUMN location VARCHAR(150) NOT NULL DEFAULT 'ITM University Campus',
ADD COLUMN established_year INT NOT NULL DEFAULT 1965,
ADD COLUMN quota INT NOT NULL DEFAULT 120;

-- Standardize names
UPDATE units SET name = '3 MP Girls Unit' WHERE unit_id = 1;
UPDATE units SET name = '8 MP Girls and Boys' WHERE unit_id = 2;
UPDATE units SET name = '3 MP Naval' WHERE unit_id = 3;

-- ----------------------------------------------------------------------------
-- 3. Modify CADET_ENROLLMENT (Replace free-text battalion_name with unit_id FK)
-- ----------------------------------------------------------------------------
ALTER TABLE cadet_enrollment
ADD COLUMN unit_id INT NOT NULL AFTER cadet_id,
ADD COLUMN status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING' AFTER college_dept,
ADD COLUMN reviewed_by INT NULL AFTER status,
ADD COLUMN reviewed_at DATETIME NULL AFTER reviewed_by,
ADD COLUMN remarks TEXT NULL AFTER reviewed_at,
ADD CONSTRAINT fk_enrollment_unit FOREIGN KEY (unit_id) REFERENCES units(unit_id) ON UPDATE CASCADE ON DELETE RESTRICT,
ADD CONSTRAINT fk_enrollment_reviewer FOREIGN KEY (reviewed_by) REFERENCES officers(officer_id) ON UPDATE CASCADE ON DELETE SET NULL;

-- Populate unit_id from battalion_name if needed
UPDATE cadet_enrollment SET unit_id = 2 WHERE battalion_name LIKE '%8%';
UPDATE cadet_enrollment SET unit_id = 1 WHERE battalion_name LIKE '%Girls%';
UPDATE cadet_enrollment SET unit_id = 3 WHERE battalion_name LIKE '%Naval%';

-- Drop legacy free-text column
ALTER TABLE cadet_enrollment DROP COLUMN battalion_name;

-- ----------------------------------------------------------------------------
-- 4. Modify ATTENDANCES (Add marked_by FK)
-- ----------------------------------------------------------------------------
ALTER TABLE attendances
ADD COLUMN marked_by INT NULL AFTER status,
ADD CONSTRAINT fk_attendances_officer FOREIGN KEY (marked_by) REFERENCES officers(officer_id) ON UPDATE CASCADE ON DELETE SET NULL;

-- ----------------------------------------------------------------------------
-- 5. Modify EVENTS (Add event_type, location, status, created_by)
-- ----------------------------------------------------------------------------
ALTER TABLE events
ADD COLUMN event_type ENUM('PARADE', 'ATC', 'RDC', 'TSC', 'TRAINING', 'OTHER') NOT NULL DEFAULT 'PARADE' AFTER title,
ADD COLUMN location VARCHAR(200) NOT NULL DEFAULT 'ITM University Ground' AFTER event_type,
ADD COLUMN max_slots INT NOT NULL DEFAULT 60 AFTER ends_at,
ADD COLUMN status ENUM('UPCOMING', 'OPEN', 'CLOSED', 'COMPLETED') NOT NULL DEFAULT 'UPCOMING' AFTER max_slots,
ADD COLUMN created_by INT NULL AFTER status,
ADD CONSTRAINT fk_events_officer FOREIGN KEY (created_by) REFERENCES officers(officer_id) ON UPDATE CASCADE ON DELETE SET NULL;

-- ----------------------------------------------------------------------------
-- 6. Create CAMP_APPLICATIONS table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS camp_applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    event_id INT NOT NULL,
    cadet_id INT NOT NULL,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    reviewed_by INT NULL,
    reviewed_at DATETIME NULL,
    remarks TEXT NULL,

    UNIQUE KEY uq_camp_cadet_app (event_id, cadet_id),

    FOREIGN KEY (event_id) REFERENCES events(event_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (cadet_id) REFERENCES cadets(cadet_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES officers(officer_id) ON UPDATE CASCADE ON DELETE SET NULL,
    INDEX idx_camp_apps_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. Modify CERTIFICATES (Add file_path, status, cert_type, verified_by)
-- ----------------------------------------------------------------------------
ALTER TABLE certificates
ADD COLUMN certificate_number VARCHAR(100) NOT NULL UNIQUE AFTER title,
ADD COLUMN cert_type ENUM('A', 'B', 'C', 'CAMP', 'OTHER') NOT NULL DEFAULT 'OTHER' AFTER certificate_number,
ADD COLUMN file_path VARCHAR(255) NULL AFTER cert_type,
ADD COLUMN status ENUM('PENDING', 'VERIFIED', 'REJECTED', 'ISSUED') NOT NULL DEFAULT 'PENDING' AFTER issued_at,
ADD COLUMN verified_by INT NULL AFTER status,
ADD COLUMN verified_at DATETIME NULL AFTER verified_by,
ADD COLUMN remarks TEXT NULL AFTER verified_at,
ADD CONSTRAINT fk_certificates_verifier FOREIGN KEY (verified_by) REFERENCES officers(officer_id) ON UPDATE CASCADE ON DELETE SET NULL,
ADD INDEX idx_certs_status (status);

-- ----------------------------------------------------------------------------
-- 8. Modify ANNOUNCEMENTS (Add category, priority, audience, unit_id, posted_by)
-- ----------------------------------------------------------------------------
ALTER TABLE announcements
ADD COLUMN category VARCHAR(50) NOT NULL DEFAULT 'General' AFTER body,
ADD COLUMN priority ENUM('NORMAL', 'IMPORTANT', 'URGENT') DEFAULT 'NORMAL' AFTER category,
ADD COLUMN target_audience ENUM('ALL', 'CADETS', 'OFFICERS') NOT NULL DEFAULT 'ALL' AFTER priority,
ADD COLUMN unit_id INT NULL AFTER target_audience,
ADD COLUMN posted_by INT NULL AFTER unit_id,
ADD CONSTRAINT fk_announcements_unit FOREIGN KEY (unit_id) REFERENCES units(unit_id) ON UPDATE CASCADE ON DELETE SET NULL,
ADD CONSTRAINT fk_announcements_poster FOREIGN KEY (posted_by) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL;

-- ----------------------------------------------------------------------------
-- 9. Create GRIEVANCES table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS grievances (
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

    FOREIGN KEY (cadet_id) REFERENCES cadets(cadet_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (replied_by) REFERENCES officers(officer_id) ON UPDATE CASCADE ON DELETE SET NULL,
    INDEX idx_grievances_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 10. Create AUDIT_LOGS table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    module VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL,
    INDEX idx_audit_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 11. Create SETTINGS table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS settings (
    setting_key VARCHAR(100) PRIMARY KEY,
    setting_value TEXT NOT NULL,
    updated_by INT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (updated_by) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 12. Create ROLE_PERMISSIONS table
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS role_permissions (
    permission_id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('ADMIN', 'OFFICER', 'CADET') NOT NULL,
    permission VARCHAR(100) NOT NULL,
    allowed BOOLEAN NOT NULL DEFAULT TRUE,

    UNIQUE KEY uq_role_perm (role, permission)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 13. Helpful Performance Indexes
-- ----------------------------------------------------------------------------
ALTER TABLE cadets ADD INDEX IF NOT EXISTS idx_cadets_unit (unit_id);
ALTER TABLE attendances ADD INDEX IF NOT EXISTS idx_attendances_event_cadet_date (event_id, cadet_id, attendance_date);
ALTER TABLE cadet_enrollment ADD INDEX IF NOT EXISTS idx_enrollment_status (status);
