-- ============================================================================
-- NCC Academic & Management Portal - MySQL Foreign Key Constraints & Relationships
-- File: 03_relationships.sql
-- ============================================================================

USE `ncc_portal_db`;

-- Role Permissions
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `fk_rp_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_rp_perm` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

-- Users
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT;

-- Courses
ALTER TABLE `courses`
  ADD CONSTRAINT `fk_courses_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE;

-- Students
ALTER TABLE `students`
  ADD CONSTRAINT `fk_students_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_students_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_students_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_students_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_students_rank` FOREIGN KEY (`rank_id`) REFERENCES `ranks` (`id`) ON DELETE RESTRICT;

-- Officers
ALTER TABLE `officers`
  ADD CONSTRAINT `fk_officers_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_officers_dept` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_officers_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE RESTRICT;

-- Training Classes
ALTER TABLE `training_classes`
  ADD CONSTRAINT `fk_training_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE CASCADE;

-- Attendance
ALTER TABLE `attendance`
  ADD CONSTRAINT `fk_att_class` FOREIGN KEY (`training_class_id`) REFERENCES `training_classes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_att_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_att_officer` FOREIGN KEY (`marked_by_officer_id`) REFERENCES `officers` (`id`) ON DELETE RESTRICT;

-- Camps
ALTER TABLE `camps`
  ADD CONSTRAINT `fk_camps_type` FOREIGN KEY (`camp_type_id`) REFERENCES `camp_types` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_camps_unit` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE RESTRICT;

-- Camp Applications
ALTER TABLE `camp_applications`
  ADD CONSTRAINT `fk_ca_camp` FOREIGN KEY (`camp_id`) REFERENCES `camps` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ca_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ca_officer` FOREIGN KEY (`reviewed_by_officer_id`) REFERENCES `officers` (`id`) ON DELETE SET NULL;

-- Certificates
ALTER TABLE `certificates`
  ADD CONSTRAINT `fk_cert_type` FOREIGN KEY (`certificate_type_id`) REFERENCES `certificate_types` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `fk_cert_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

-- Achievements
ALTER TABLE `achievements`
  ADD CONSTRAINT `fk_achieve_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_achieve_cat` FOREIGN KEY (`category_id`) REFERENCES `achievement_categories` (`id`) ON DELETE RESTRICT;

-- Activity Participants
ALTER TABLE `activity_participants`
  ADD CONSTRAINT `fk_ap_activity` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_ap_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

-- Payments
ALTER TABLE `payments`
  ADD CONSTRAINT `fk_pay_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

-- Notices
ALTER TABLE `notices`
  ADD CONSTRAINT `fk_notices_user` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT;

-- Documents
ALTER TABLE `documents`
  ADD CONSTRAINT `fk_docs_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

-- Notifications
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_notif_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
