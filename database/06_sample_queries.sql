-- ============================================================================
-- NCC Academic & Management Portal - Academic DBMS Analytical Queries & Reports
-- File: 06_sample_queries.sql
-- ============================================================================

USE `ncc_portal_db`;

-- ----------------------------------------------------------------------------
-- QUERY 1: Find all students with drill attendance percentage above required threshold (75%)
-- Demonstrates: JOIN, COUNT, CASE, GROUP BY, HAVING, Aggregate Math
-- ----------------------------------------------------------------------------
SELECT 
  s.id AS student_db_id,
  s.student_id,
  s.regimental_number,
  CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
  u.unit_name,
  COUNT(a.id) AS total_classes_conducted,
  SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS total_present,
  ROUND((SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) / COUNT(a.id)) * 100, 2) AS attendance_percentage
FROM students s
INNER JOIN units u ON s.unit_id = u.id
LEFT JOIN attendance a ON s.id = a.student_id
GROUP BY s.id, s.student_id, s.regimental_number, cadet_name, u.unit_name
HAVING attendance_percentage >= 75.00
ORDER BY attendance_percentage DESC;

-- ----------------------------------------------------------------------------
-- QUERY 2: Find all cadets who successfully passed Certificate B examination
-- Demonstrates: INNER JOIN, WHERE filter on certificate types
-- ----------------------------------------------------------------------------
SELECT 
  c.certificate_number,
  ct.type_name AS certificate_name,
  s.student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
  c.issue_date,
  c.grading,
  c.issuing_authority
FROM certificates c
INNER JOIN certificate_types ct ON c.certificate_type_id = ct.id
INNER JOIN students s ON c.student_id = s.id
WHERE ct.type_name = 'Certificate B' AND c.is_valid = TRUE;

-- ----------------------------------------------------------------------------
-- QUERY 3: Find all cadets who completed Certificate C examination
-- Demonstrates: Filtered lookup on Certificate C holders
-- ----------------------------------------------------------------------------
SELECT 
  c.certificate_number,
  s.student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
  r.rank_name,
  c.issue_date,
  c.grading
FROM certificates c
INNER JOIN certificate_types ct ON c.certificate_type_id = ct.id
INNER JOIN students s ON c.student_id = s.id
INNER JOIN ranks r ON s.rank_id = r.id
WHERE ct.type_name = 'Certificate C' AND c.is_valid = TRUE;

-- ----------------------------------------------------------------------------
-- QUERY 4: Annual Enrolled Cadet Strength Breakdown by Year
-- Demonstrates: GROUP BY, COUNT aggregations
-- ----------------------------------------------------------------------------
SELECT 
  enrollment_year,
  COUNT(*) AS total_enrolled_cadets,
  SUM(CASE WHEN gender = 'Male' THEN 1 ELSE 0 END) AS male_cadets,
  SUM(CASE WHEN gender = 'Female' THEN 1 ELSE 0 END) AS female_cadets
FROM students
GROUP BY enrollment_year
ORDER BY enrollment_year DESC;

-- ----------------------------------------------------------------------------
-- QUERY 5: Count of Passed-Out Cadets per Battalion Unit
-- Demonstrates: JOIN, WHERE, GROUP BY
-- ----------------------------------------------------------------------------
SELECT 
  u.unit_name,
  COUNT(s.id) AS passed_out_cadet_count
FROM students s
INNER JOIN units u ON s.unit_id = u.id
WHERE s.cadet_status = 'Passed Out'
GROUP BY u.unit_name;

-- ----------------------------------------------------------------------------
-- QUERY 6: Identify Top 5 Most Active NCC Cadets by Social Service Hours
-- Demonstrates: Subquery / Join with Aggregate SUM
-- ----------------------------------------------------------------------------
SELECT 
  s.student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
  r.rank_name,
  SUM(ap.hours_logged) AS total_social_service_hours
FROM activity_participants ap
INNER JOIN students s ON ap.student_id = s.id
INNER JOIN ranks r ON s.rank_id = r.id
GROUP BY s.id, s.student_id, cadet_name, r.rank_name
ORDER BY total_social_service_hours DESC
LIMIT 5;

-- ----------------------------------------------------------------------------
-- QUERY 7: Rank Students by Attendance Performance in Current Academic Session
-- Demonstrates: Window functions / Rank ordering
-- ----------------------------------------------------------------------------
SELECT 
  s.student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
  d.department_code,
  COUNT(a.id) AS classes_attended
FROM attendance a
INNER JOIN students s ON a.student_id = s.id
INNER JOIN departments d ON s.department_id = d.id
WHERE a.status = 'Present'
GROUP BY s.id, s.student_id, cadet_name, d.department_code
ORDER BY classes_attended DESC;

-- ----------------------------------------------------------------------------
-- QUERY 8: Achievement Summary by Award Level and Year
-- Demonstrates: GROUP BY on Date Extracting Year
-- ----------------------------------------------------------------------------
SELECT 
  YEAR(achievement_date) AS achievement_year,
  award_level,
  COUNT(*) AS total_awards
FROM achievements
GROUP BY YEAR(achievement_date), award_level
ORDER BY achievement_year DESC, total_awards DESC;

-- ----------------------------------------------------------------------------
-- QUERY 9: Camp Participation Breakdown by Camp Category
-- Demonstrates: Multi-table JOIN with Status Filtering
-- ----------------------------------------------------------------------------
SELECT 
  ct.type_name AS camp_type,
  COUNT(ca.id) AS total_selected_participants
FROM camp_applications ca
INNER JOIN camps c ON ca.camp_id = c.id
INNER JOIN camp_types ct ON c.camp_type_id = ct.id
WHERE ca.status = 'Selected'
GROUP BY ct.type_name;

-- ----------------------------------------------------------------------------
-- QUERY 10: Department-wise NCC Cadet Enrollment Distribution
-- Demonstrates: JOIN with Percentage calculation subquery
-- ----------------------------------------------------------------------------
SELECT 
  d.department_name,
  COUNT(s.id) AS cadet_count,
  ROUND((COUNT(s.id) * 100.0 / (SELECT COUNT(*) FROM students)), 2) AS percentage_of_total_cadets
FROM departments d
LEFT JOIN students s ON d.id = s.department_id
GROUP BY d.id, d.department_name
ORDER BY cadet_count DESC;

-- ----------------------------------------------------------------------------
-- QUERY 11: Certificate Grade Distribution (A vs B vs C Grades)
-- Demonstrates: COUNT aggregation with GROUP BY
-- ----------------------------------------------------------------------------
SELECT 
  grading,
  COUNT(*) AS certificate_count
FROM certificates
WHERE is_valid = TRUE
GROUP BY grading;

-- ----------------------------------------------------------------------------
-- QUERY 12: Active vs Inactive / Discharged Cadets Summary
-- Demonstrates: GROUP BY on cadet status
-- ----------------------------------------------------------------------------
SELECT 
  cadet_status,
  COUNT(*) AS total_cadets
FROM students
GROUP BY cadet_status;

-- ----------------------------------------------------------------------------
-- QUERY 13: List All Upcoming Camps with Registration Deadlines
-- Demonstrates: Date Comparison Filters
-- ----------------------------------------------------------------------------
SELECT 
  c.camp_name,
  ct.type_name,
  c.location,
  c.start_date,
  c.registration_deadline,
  c.max_participants
FROM camps c
INNER JOIN camp_types ct ON c.camp_type_id = ct.id
WHERE c.status = 'Upcoming' AND c.registration_deadline >= CURRENT_DATE()
ORDER BY c.registration_deadline ASC;

-- ----------------------------------------------------------------------------
-- QUERY 14: Pending Cadet Applications Requiring Officer Approval
-- Demonstrates: Filtered selection for pending workflow
-- ----------------------------------------------------------------------------
SELECT 
  ca.id AS application_id,
  c.camp_name,
  s.student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
  ca.application_date
FROM camp_applications ca
INNER JOIN camps c ON ca.camp_id = c.id
INNER JOIN students s ON ca.student_id = s.id
WHERE ca.status = 'Pending'
ORDER BY ca.application_date ASC;

-- ----------------------------------------------------------------------------
-- QUERY 15: Cadets Eligible for Advance Camp (Attendance >= 75% AND Certificate A Holder)
-- Demonstrates: Complex Subquery Intersections
-- ----------------------------------------------------------------------------
SELECT 
  s.student_id,
  CONCAT(s.first_name, ' ', s.last_name) AS cadet_name,
  u.unit_name
FROM students s
INNER JOIN units u ON s.unit_id = u.id
WHERE s.id IN (
  SELECT student_id 
  FROM attendance 
  GROUP BY student_id 
  HAVING (SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) / COUNT(*)) >= 0.75
)
AND s.id IN (
  SELECT student_id 
  FROM certificates c
  INNER JOIN certificate_types ct ON c.certificate_type_id = ct.id
  WHERE ct.type_name = 'Certificate A' AND c.is_valid = TRUE
);
