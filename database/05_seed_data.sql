-- ============================================================================
-- NCC Academic & Management Portal - Comprehensive Seed Data
-- File: 05_seed_data.sql
-- ============================================================================

USE `ncc_portal_db`;

-- Roles
INSERT INTO `roles` (`id`, `role_name`, `description`) VALUES
(1, 'Super Admin', 'Full system administration access'),
(2, 'Admin', 'University administrative staff'),
(3, 'NCC Officer', 'Associate NCC Officer (ANO) / Unit commander'),
(4, 'Student Cadet', 'Enrolled NCC student cadet')
ON DUPLICATE KEY UPDATE `role_name`=`role_name`;

-- Departments
INSERT INTO `departments` (`id`, `department_code`, `department_name`, `head_of_dept`) VALUES
(1, 'CSE', 'Computer Science & Engineering', 'Dr. A. K. Sharma'),
(2, 'ECE', 'Electronics & Communication Engineering', 'Dr. S. Mukherjee'),
(3, 'ME', 'Mechanical Engineering', 'Dr. R. V. Patel'),
(4, 'PHYS', 'Physics & Natural Sciences', 'Dr. M. Banerjee'),
(5, 'COMM', 'Commerce & Business Administration', 'Dr. P. K. Das')
ON DUPLICATE KEY UPDATE `department_name`=`department_name`;

-- Courses
INSERT INTO `courses` (`id`, `course_code`, `course_name`, `department_id`, `duration_years`) VALUES
(1, 'BTECH-CSE', 'B.Tech in Computer Science', 1, 4),
(2, 'BTECH-ECE', 'B.Tech in Electronics', 2, 4),
(3, 'BTECH-ME', 'B.Tech in Mechanical Engg', 3, 4),
(4, 'BSC-PHYS', 'B.Sc in Physics (Hons)', 4, 3),
(5, 'BCOM-HONS', 'B.Com (Honours)', 5, 3)
ON DUPLICATE KEY UPDATE `course_name`=`course_name`;

-- Units
INSERT INTO `units` (`id`, `unit_name`, `battalion_code`, `wing_type`, `division_category`, `establishment_year`, `sanctioned_strength`) VALUES
(1, '1st Bengal Battalion NCC (SD)', '1-BN-KOL', 'Army', 'SD', 1962, 120),
(2, '1st Bengal Girls Battalion NCC (SW)', '1-GIRLS-BN', 'Army', 'SW', 1974, 80),
(3, '4th Bengal Naval Unit NCC', '4-NAV-BN', 'Navy', 'SD', 1980, 50)
ON DUPLICATE KEY UPDATE `unit_name`=`unit_name`;

-- Ranks
INSERT INTO `ranks` (`id`, `rank_code`, `rank_name`, `division`, `seniority_order`, `badge_icon`, `responsibilities`) VALUES
(1, 'CDT', 'Cadet', 'SD/SW', 1, 'cadet.svg', 'Basic drill, parades, theory lectures, social service participation'),
(2, 'LCPL', 'Lance Corporal', 'SD/SW', 2, 'lcpl.svg', 'Section second-in-command, squad formation assistant'),
(3, 'CPL', 'Corporal', 'SD/SW', 3, 'cpl.svg', 'Section commander, squad leader for parade drills'),
(4, 'SGT', 'Sergeant', 'SD/SW', 4, 'sgt.svg', 'Platoon sergeant, attendance coordination & discipline enforcement'),
(5, 'CQMS', 'Company Quartermaster Sergeant', 'SD/SW', 5, 'cqms.svg', 'Stores, equipment, refreshment allowances & log keeper'),
(6, 'CSM', 'Company Sergeant Major', 'SD/SW', 6, 'csm.svg', 'Parade discipline, parade ground drill commander'),
(7, 'JUO', 'Junior Under Officer', 'SD/SW', 7, 'juo.svg', 'Platoon commander, assistant to ANO in training execution'),
(8, 'SUO', 'Senior Under Officer', 'SD/SW', 8, 'suo.svg', 'Senior-most cadet commander, overall cadet battalion leader')
ON DUPLICATE KEY UPDATE `rank_name`=`rank_name`;

-- Users (Hashed password defaults for demo: 'password123')
INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role_id`) VALUES
(1, 'admin@ncc.demo', '$2a$10$wT.gK/2Tf5S3B4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W', 'System Administrator', 1),
(2, 'officer@ncc.demo', '$2a$10$wT.gK/2Tf5S3B4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W', 'Capt. Arindam Roy', 3),
(3, 'officer.female@ncc.demo', '$2a$10$wT.gK/2Tf5S3B4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W', 'Lt. Sunita Verma', 3),
(4, 'student@ncc.demo', '$2a$10$wT.gK/2Tf5S3B4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W', 'Cadet Rahul Sharma', 4),
(5, 'cadet.ananya@ncc.demo', '$2a$10$wT.gK/2Tf5S3B4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W', 'Cadet Ananya Sen', 4),
(6, 'cadet.vikram@ncc.demo', '$2a$10$wT.gK/2Tf5S3B4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0T1U2V3W', 'SUO Vikram Singh', 4)
ON DUPLICATE KEY UPDATE `email`=`email`;

-- Officers
INSERT INTO `officers` (`id`, `user_id`, `officer_number`, `first_name`, `last_name`, `designation`, `military_rank`, `department_id`, `unit_id`, `phone`, `joining_date`) VALUES
(1, 2, 'ANO-2018-042', 'Arindam', 'Roy', 'Associate NCC Officer (ANO)', 'Captain', 1, 1, '+91 98301 12345', '2018-07-15'),
(2, 3, 'ANO-2020-089', 'Sunita', 'Verma', 'Associate NCC Officer (ANO)', 'Lieutenant', 4, 2, '+91 98302 67890', '2020-01-10')
ON DUPLICATE KEY UPDATE `officer_number`=`officer_number`;

-- Students (Cadets)
INSERT INTO `students` (`id`, `user_id`, `student_id`, `regimental_number`, `first_name`, `last_name`, `gender`, `date_of_birth`, `blood_group`, `phone`, `department_id`, `course_id`, `academic_year`, `academic_section`, `unit_id`, `rank_id`, `enrollment_year`, `cadet_status`, `height_cm`, `weight_kg`) VALUES
(1, 4, 'UG-2023-CS-042', 'WB/23/SD/A/104089', 'Rahul', 'Sharma', 'Male', '2004-05-14', 'B+', '+91 98765 43210', 1, 1, 2, 'A', 1, 4, 2023, 'Active', 174.5, 68.0),
(2, 5, 'UG-2023-PH-018', 'WB/23/SW/A/104090', 'Ananya', 'Sen', 'Female', '2004-08-22', 'O+', '+91 98765 43211', 4, 4, 2, 'B', 2, 7, 2023, 'Active', 165.0, 56.5),
(3, 6, 'UG-2022-ME-009', 'WB/22/SD/A/103012', 'Vikram', 'Singh', 'Male', '2003-11-03', 'A+', '+91 98765 43212', 3, 3, 3, 'A', 1, 8, 2022, 'Active', 180.0, 74.0)
ON DUPLICATE KEY UPDATE `student_id`=`student_id`;

-- Configurable Eligibility Rules
INSERT INTO `eligibility_rules` (`id`, `rule_name`, `min_attendance_percentage`, `min_height_male_cm`, `min_height_female_cm`, `max_age_years`, `min_gpa`) VALUES
(1, 'Standard University NCC Cadet Criteria', 75.00, 157.00, 152.00, 26, 5.00)
ON DUPLICATE KEY UPDATE `rule_name`=`rule_name`;

-- Training Classes
INSERT INTO `training_classes` (`id`, `unit_id`, `class_topic`, `class_date`, `start_time`, `end_time`, `instructor_name`, `location`, `category`) VALUES
(1, 1, 'Squad Drill & Command Words', '2025-02-15', '07:00:00', '09:00:00', 'Subedar M. S. Thapa', 'Parade Ground Alpha', 'Drill'),
(2, 1, 'Map Reading & Grid References', '2025-02-22', '07:30:00', '09:30:00', 'Capt. Arindam Roy', 'Lecture Hall 102', 'Map Reading'),
(3, 1, '.22 Deluxe Rifle Handling & Safety', '2025-03-01', '07:00:00', '10:00:00', 'Havildar R. K. Yadav', 'University Firing Range', 'Weapon Training')
ON DUPLICATE KEY UPDATE `class_topic`=`class_topic`;

-- Attendance Records
INSERT INTO `attendance` (`id`, `training_class_id`, `student_id`, `status`, `remarks`, `marked_by_officer_id`) VALUES
(1, 1, 1, 'Present', 'Punctual & sharp drill', 1),
(2, 1, 2, 'Present', 'Good cadence', 1),
(3, 1, 3, 'Present', 'Drill instructor assist', 1),
(4, 2, 1, 'Present', 'Completed practical grid exercise', 1),
(5, 2, 2, 'Present', 'Passed map assessment', 1),
(6, 2, 3, 'Present', 'High accuracy', 1)
ON DUPLICATE KEY UPDATE `status`=`status`;

-- Camp Types & Camps
INSERT INTO `camp_types` (`id`, `type_name`, `description`) VALUES
(1, 'Combined Annual Training Camp (CATC)', 'Mandatory 10-day annual camp for Certificate B/C qualification'),
(2, 'Republic Day Camp (RDC)', 'Prestigious national camp in New Delhi featuring Rajpath parade selection'),
(3, 'Thal Sainik Camp (TSC)', 'Army wing competitive camp covering shooting, obstacle course, map reading')
ON DUPLICATE KEY UPDATE `type_name`=`type_name`;

INSERT INTO `camps` (`id`, `camp_name`, `camp_type_id`, `location`, `start_date`, `end_date`, `organizer_unit`, `unit_id`, `description`, `eligibility_criteria`, `max_participants`, `registration_deadline`, `status`) VALUES
(1, 'Combined Annual Training Camp 2025 (CATC-104)', 1, 'Fort William Garrison Grounds, Kolkata', '2025-04-10', '2025-04-20', '1st Bengal Battalion NCC', 1, 'Comprehensive 10-day parade, obstacle clearance, weapon firing, and cultural evening camp.', 'Min 75% attendance in drill sessions', 60, '2025-03-25', 'Upcoming'),
(2, 'National Integration Camp (NIC-Varanasi)', 1, 'BHU Campus, Varanasi', '2025-05-15', '2025-05-25', 'UP Directorate NCC', 1, 'Cultural exchange, national integration lectures, and heritage visits.', 'Certificate B holder or 2nd year SD/SW cadet', 25, '2025-04-30', 'Upcoming')
ON DUPLICATE KEY UPDATE `camp_name`=`camp_name`;

-- Camp Applications
INSERT INTO `camp_applications` (`id`, `camp_id`, `student_id`, `status`, `remarks`, `reviewed_by_officer_id`) VALUES
(1, 1, 1, 'Selected', 'Eligible with 88% drill attendance', 1),
(2, 1, 2, 'Selected', 'JUO leadership recommendation', 1)
ON DUPLICATE KEY UPDATE `status`=`status`;

-- Certificate Types & Certificates
INSERT INTO `certificate_types` (`id`, `type_name`, `min_camps_required`, `min_attendance_percentage`) VALUES
(1, 'Certificate A', 1, 70.00),
(2, 'Certificate B', 1, 75.00),
(3, 'Certificate C', 2, 75.00)
ON DUPLICATE KEY UPDATE `type_name`=`type_name`;

INSERT INTO `certificates` (`id`, `certificate_number`, `certificate_type_id`, `student_id`, `issue_date`, `issuing_authority`, `grading`, `is_valid`) VALUES
(1, 'NCC-CERT-2024-B-8902', 2, 3, '2024-06-30', 'Directorate General NCC - WB & Sikkim', 'A', TRUE),
(2, 'NCC-CERT-2025-A-4102', 1, 1, '2024-12-15', '1st Bengal Battalion NCC', 'A', TRUE)
ON DUPLICATE KEY UPDATE `certificate_number`=`certificate_number`;

-- Achievement Categories & Achievements
INSERT INTO `achievement_categories` (`id`, `category_name`) VALUES
(1, 'Best Cadet Award'),
(2, 'Firing & Marksmanship'),
(3, 'Parade Command'),
(4, 'Social Service Excellence')
ON DUPLICATE KEY UPDATE `category_name`=`category_name`;

INSERT INTO `achievements` (`id`, `title`, `student_id`, `category_id`, `award_level`, `achievement_date`, `description`, `award_name`, `is_featured`) VALUES
(1, 'Governor Gold Medalist - Best SD Cadet 2024', 3, 1, 'State', '2024-11-14', 'Awarded Governor Gold Medal for outstanding parade leadership and top score in rifle marksmanship.', 'Governor Gold Medal', TRUE),
(2, '1st Position in 0.22 Rifle Marksmanship', 1, 2, 'Battalion', '2025-01-26', 'Achieved 48/50 score in annual inter-college firing competition.', 'Trophy & Commendation', TRUE)
ON DUPLICATE KEY UPDATE `title`=`title`;

-- Social Service Activities
INSERT INTO `activities` (`id`, `title`, `category`, `activity_date`, `location`, `description`, `impact_summary`) VALUES
(1, 'Mega Blood Donation Drive 2025', 'Blood Donation', '2025-01-12', 'University Gymnasium', 'Organized in collaboration with SSKM Blood Bank for National Youth Day.', '184 Units of blood collected'),
(2, 'Hooghly Riverfront Cleanliness Drive', 'Cleanliness Drive', '2025-02-02', 'Babu Ghat Riverfront', 'Puneet Sagar Abhiyan initiative for cleaning plastic waste.', '450 kg plastic debris cleared')
ON DUPLICATE KEY UPDATE `title`=`title`;

INSERT INTO `activity_participants` (`activity_id`, `student_id`, `hours_logged`) VALUES
(1, 1, 6.0), (1, 2, 6.0), (1, 3, 8.0),
(2, 1, 4.0), (2, 2, 4.0)
ON DUPLICATE KEY UPDATE `hours_logged`=`hours_logged`;

-- Notices
INSERT INTO `notices` (`id`, `title`, `category`, `content`, `publish_date`, `expiry_date`, `is_pinned`, `created_by_user_id`) VALUES
(1, 'Enrolment Drive 2025-26 Selection Schedule', 'Enrolment', 'Selection trials for 1st Bengal BN and 1st Girls BN will take place at the University Ground from March 10th to March 12th.', '2025-02-20', '2025-03-15', TRUE, 1),
(2, 'Parade Schedule & Uniform Inspection Notice', 'General', 'All SD and SW cadets must assemble in full ceremonial uniform (Khaki / White) on Saturday 07:00 AM sharp.', '2025-02-25', '2025-03-10', FALSE, 2)
ON DUPLICATE KEY UPDATE `title`=`title`;
