-- ============================================================================
-- NCC Academic & Management Portal - MySQL Indexes & Performance Tuning
-- File: 04_indexes.sql
-- ============================================================================

USE `ncc_portal_db`;

-- Indexes on high-frequency search & join columns
CREATE INDEX `idx_users_email` ON `users` (`email`);
CREATE INDEX `idx_students_student_id` ON `students` (`student_id`);
CREATE INDEX `idx_students_regimental_number` ON `students` (`regimental_number`);
CREATE INDEX `idx_students_dept_unit` ON `students` (`department_id`, `unit_id`);
CREATE INDEX `idx_attendance_class_student` ON `attendance` (`training_class_id`, `student_id`);
CREATE INDEX `idx_attendance_status` ON `attendance` (`status`);
CREATE INDEX `idx_certificates_number` ON `certificates` (`certificate_number`);
CREATE INDEX `idx_certificates_student` ON `certificates` (`student_id`);
CREATE INDEX `idx_camps_dates_status` ON `camps` (`start_date`, `status`);
CREATE INDEX `idx_camp_apps_student_status` ON `camp_applications` (`student_id`, `status`);
CREATE INDEX `idx_achievements_featured` ON `achievements` (`is_featured`, `award_level`);
CREATE INDEX `idx_notices_pinned_expiry` ON `notices` (`is_pinned`, `publish_date`, `expiry_date`);
