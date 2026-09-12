-- ============================================================================
-- NCC Academic & Management Portal - MySQL 8 Table Definitions
-- File: 02_create_tables.sql
-- ============================================================================

USE `ncc_portal_db`;

-- 1. Roles & Permissions
CREATE TABLE IF NOT EXISTS `roles` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `role_name` VARCHAR(50) NOT NULL UNIQUE,
  `description` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `permissions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `permission_key` VARCHAR(100) NOT NULL UNIQUE,
  `module` VARCHAR(50) NOT NULL,
  `description` VARCHAR(255) NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `role_permissions` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`)
) ENGINE=InnoDB;

-- 2. Users Master Table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role_id` INT NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE,
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Academic & Organizational Setup
CREATE TABLE IF NOT EXISTS `departments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `department_code` VARCHAR(20) NOT NULL UNIQUE,
  `department_name` VARCHAR(100) NOT NULL,
  `head_of_dept` VARCHAR(100) NULL,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `course_code` VARCHAR(20) NOT NULL UNIQUE,
  `course_name` VARCHAR(100) NOT NULL,
  `department_id` INT NOT NULL,
  `duration_years` INT NOT NULL DEFAULT 3
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `units` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `unit_name` VARCHAR(100) NOT NULL UNIQUE,
  `battalion_code` VARCHAR(50) NOT NULL,
  `wing_type` ENUM('Army', 'Navy', 'Air Force') DEFAULT 'Army',
  `division_category` ENUM('SD', 'SW', 'JD', 'JW') DEFAULT 'SD',
  `establishment_year` INT NOT NULL DEFAULT 1965,
  `sanctioned_strength` INT NOT NULL DEFAULT 100,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `ranks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `rank_code` VARCHAR(20) NOT NULL UNIQUE,
  `rank_name` VARCHAR(100) NOT NULL,
  `division` ENUM('SD/SW', 'JD/JW') NOT NULL DEFAULT 'SD/SW',
  `seniority_order` INT NOT NULL,
  `badge_icon` VARCHAR(255) NULL,
  `responsibilities` TEXT NULL,
  `min_service_months` INT DEFAULT 6
) ENGINE=InnoDB;

-- 4. Cadets (Students) & Officers Profiles
CREATE TABLE IF NOT EXISTS `students` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `student_id` VARCHAR(30) NOT NULL UNIQUE,
  `regimental_number` VARCHAR(50) NULL UNIQUE,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `blood_group` VARCHAR(5) NULL,
  `phone` VARCHAR(20) NOT NULL,
  `department_id` INT NOT NULL,
  `course_id` INT NOT NULL,
  `academic_year` INT NOT NULL DEFAULT 1,
  `academic_section` VARCHAR(10) DEFAULT 'A',
  `unit_id` INT NOT NULL,
  `rank_id` INT NOT NULL,
  `enrollment_year` INT NOT NULL,
  `cadet_status` ENUM('Pending', 'Active', 'Passed Out', 'Discharged') DEFAULT 'Pending',
  `height_cm` DECIMAL(5,2) NULL,
  `weight_kg` DECIMAL(5,2) NULL,
  `address` TEXT NULL,
  `emergency_contact_name` VARCHAR(100) NULL,
  `emergency_contact_phone` VARCHAR(20) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `officers` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL UNIQUE,
  `officer_number` VARCHAR(30) NOT NULL UNIQUE,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `designation` VARCHAR(100) NOT NULL DEFAULT 'Associate NCC Officer (ANO)',
  `military_rank` VARCHAR(50) DEFAULT 'Lieutenant',
  `department_id` INT NOT NULL,
  `unit_id` INT NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `joining_date` DATE NOT NULL,
  `is_active` BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB;

-- 5. Configurable Eligibility Rules
CREATE TABLE IF NOT EXISTS `eligibility_rules` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `rule_name` VARCHAR(100) NOT NULL,
  `min_attendance_percentage` DECIMAL(5,2) NOT NULL DEFAULT 75.00,
  `min_height_male_cm` DECIMAL(5,2) NOT NULL DEFAULT 157.00,
  `min_height_female_cm` DECIMAL(5,2) NOT NULL DEFAULT 152.00,
  `max_age_years` INT NOT NULL DEFAULT 26,
  `min_gpa` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
  `medical_fitness_required` BOOLEAN DEFAULT TRUE,
  `is_active` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Training Classes & Attendance Module
CREATE TABLE IF NOT EXISTS `training_classes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `unit_id` INT NOT NULL,
  `class_topic` VARCHAR(150) NOT NULL,
  `class_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `instructor_name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `category` ENUM('Drill', 'Weapon Training', 'Theory Lecture', 'Map Reading', 'Physical Fitness', 'Special Training') DEFAULT 'Drill',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `attendance` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `training_class_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `status` ENUM('Present', 'Absent', 'Late', 'Excused') NOT NULL DEFAULT 'Present',
  `remarks` VARCHAR(255) NULL,
  `marked_by_officer_id` INT NOT NULL,
  `marked_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 7. Camps & Applications
CREATE TABLE IF NOT EXISTS `camp_types` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type_name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `camps` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `camp_name` VARCHAR(150) NOT NULL,
  `camp_type_id` INT NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `start_date` DATE NOT NULL,
  `end_date` DATE NOT NULL,
  `organizer_unit` VARCHAR(100) NOT NULL,
  `unit_id` INT NOT NULL,
  `description` TEXT NULL,
  `eligibility_criteria` TEXT NULL,
  `max_participants` INT NOT NULL DEFAULT 50,
  `registration_deadline` DATE NOT NULL,
  `status` ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') DEFAULT 'Upcoming',
  `image_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `camp_applications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `camp_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `application_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `status` ENUM('Pending', 'Under Review', 'Selected', 'Waitlisted', 'Rejected') DEFAULT 'Pending',
  `remarks` VARCHAR(255) NULL,
  `reviewed_by_officer_id` INT NULL
) ENGINE=InnoDB;

-- 8. Certificates & Verification
CREATE TABLE IF NOT EXISTS `certificate_types` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `type_name` VARCHAR(100) NOT NULL UNIQUE, -- e.g. 'Certificate A', 'Certificate B', 'Certificate C'
  `min_camps_required` INT DEFAULT 1,
  `min_attendance_percentage` DECIMAL(5,2) DEFAULT 75.00
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `certificates` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `certificate_number` VARCHAR(50) NOT NULL UNIQUE,
  `certificate_type_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `issue_date` DATE NOT NULL,
  `issuing_authority` VARCHAR(150) NOT NULL DEFAULT 'Directorate General NCC / State Battalion',
  `grading` ENUM('A', 'B', 'C') NOT NULL DEFAULT 'A',
  `document_url` VARCHAR(255) NULL,
  `is_valid` BOOLEAN DEFAULT TRUE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `certificate_verifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `certificate_number` VARCHAR(50) NOT NULL,
  `searched_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `ip_address` VARCHAR(45) NULL,
  `result` ENUM('Valid', 'Invalid', 'NotFound') NOT NULL
) ENGINE=InnoDB;

-- 9. Achievements & Campus Achievers
CREATE TABLE IF NOT EXISTS `achievement_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_name` VARCHAR(50) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `achievements` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `student_id` INT NOT NULL,
  `category_id` INT NOT NULL,
  `award_level` ENUM('National', 'State', 'University', 'Battalion') NOT NULL DEFAULT 'University',
  `achievement_date` DATE NOT NULL,
  `description` TEXT NULL,
  `award_name` VARCHAR(100) NULL,
  `image_url` VARCHAR(255) NULL,
  `is_featured` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 10. Social Activities & Drives
CREATE TABLE IF NOT EXISTS `activities` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `category` ENUM('Blood Donation', 'Tree Plantation', 'Cleanliness Drive', 'Awareness Campaign', 'Disaster Management', 'Social Service') DEFAULT 'Social Service',
  `activity_date` DATE NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `impact_summary` VARCHAR(255) NULL,
  `image_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `activity_participants` (
  `activity_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `hours_logged` DECIMAL(4,1) DEFAULT 4.0,
  PRIMARY KEY (`activity_id`, `student_id`)
) ENGINE=InnoDB;

-- 11. Payments & Cadet Allowances
CREATE TABLE IF NOT EXISTS `payments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `transaction_reference` VARCHAR(50) NOT NULL UNIQUE,
  `student_id` INT NOT NULL,
  `purpose` ENUM('Refreshment Allowance', 'Washing Allowance', 'Camp Registration Fee', 'Uniform Deposit') NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `payment_type` ENUM('Credit Allowance', 'Debit Fee') NOT NULL DEFAULT 'Credit Allowance',
  `status` ENUM('Completed', 'Pending', 'Failed') DEFAULT 'Completed',
  `payment_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 12. Notices, Gallery, Documents, Notifications & Audit Logs
CREATE TABLE IF NOT EXISTS `notices` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(200) NOT NULL,
  `category` ENUM('General', 'Enrolment', 'Camp Notice', 'Exam/Certificate', 'Urgent') DEFAULT 'General',
  `content` TEXT NOT NULL,
  `publish_date` DATE NOT NULL,
  `expiry_date` DATE NULL,
  `is_pinned` BOOLEAN DEFAULT FALSE,
  `attachment_url` VARCHAR(255) NULL,
  `created_by_user_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(150) NOT NULL,
  `category` ENUM('Parades', 'Camps', 'Social Service', 'Achievements', 'VIP Visits') DEFAULT 'Parades',
  `image_url` VARCHAR(255) NOT NULL,
  `caption` VARCHAR(255) NULL,
  `event_date` DATE NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `documents` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `student_id` INT NOT NULL,
  `document_type` ENUM('ID Card', 'Medical Fitness', 'Aadhaar Card', 'Parent Consent Form', 'College ID') NOT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `upload_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `message` TEXT NOT NULL,
  `is_read` BOOLEAN DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NULL,
  `action` VARCHAR(100) NOT NULL,
  `entity_type` VARCHAR(50) NOT NULL,
  `entity_id` INT NULL,
  `details` TEXT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
