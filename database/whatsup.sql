-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2023 at 02:52 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `whatsup`
--

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `DepartmentID` int(11) NOT NULL,
  `DepartmentName` varchar(30) DEFAULT NULL,
  `Classification` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`DepartmentID`, `DepartmentName`, `Classification`) VALUES
(1000, 'College of Arts and Sciences', 'College'),
(1001, 'School of Technology', 'College'),
(1002, 'Scholarships', 'Student'),
(1003, 'Student Organizations', 'Student'),
(1004, 'UP System', 'University'),
(1005, 'UP Visayas', 'University');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `PostID` int(11) NOT NULL,
  `ProfileID` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `PostContent` text NOT NULL,
  `HasThread` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`PostID`, `ProfileID`, `DateTime`, `PostContent`, `HasThread`) VALUES
(10002, 1048, '2023-05-28 13:03:11', 'asdasdas', 0),
(10003, 1048, '2023-05-28 13:16:05', 'Test Test 1 2 3 ', 0),
(10004, 1048, '2023-05-28 13:17:13', 'Test Test 1 2 3 ', 0),
(10005, 1048, '2023-05-28 13:38:23', 'Youtube Test', 0),
(10006, 1048, '2023-05-29 18:18:57', 'Brand New Thing', 0),
(10007, 1048, '2023-05-29 18:19:50', 'Brand New Thing', 0),
(10008, 1048, '2023-05-29 18:20:49', 'test', 0),
(10009, 1048, '2023-05-29 18:27:18', 'Bug Test', 0),
(10010, 1048, '2023-05-29 18:29:48', 'Try', 0),
(10011, 1048, '2023-05-30 06:06:13', 'Miami Heat Win!!!1', 0),
(10012, 1048, '2023-05-30 06:07:20', 'Heat win', 0),
(10013, 1048, '2023-05-30 06:09:15', 'Bug Test Again [Tags]', 0),
(10014, 1048, '2023-05-30 06:10:32', 'Sample', 0),
(10015, 1048, '2023-05-30 06:10:56', 'Sample', 0),
(10016, 1048, '2023-05-30 06:12:00', 'Sample', 0),
(10017, 1048, '2023-05-30 06:14:30', 'Sample', 0),
(10018, 1048, '2023-05-30 06:15:56', 'Sample', 0),
(10019, 1048, '2023-05-30 06:16:31', 'Sample', 0),
(10020, 1048, '2023-05-30 06:16:51', 'Sample', 0),
(10021, 1048, '2023-05-30 06:17:28', 'Sample', 0),
(10022, 1048, '2023-05-30 06:17:57', 'Sample', 0),
(10023, 1048, '2023-05-30 06:18:31', 'Sample', 0),
(10024, 1048, '2023-05-30 06:21:17', 'Sample', 0),
(10025, 1048, '2023-05-30 06:22:39', 'Heheheh', 0),
(10026, 1048, '2023-05-31 06:31:30', 'asdasdasdasdasd', 0),
(10027, 1049, '2023-05-31 10:35:24', 'TEst', 0),
(10028, 1049, '2023-05-31 10:35:40', 'TEst', 0),
(10029, 1049, '2023-05-31 10:54:10', 'HelloPOst', 0);

-- --------------------------------------------------------

--
-- Table structure for table `post_coordinates`
--

CREATE TABLE `post_coordinates` (
  `PostID` int(11) NOT NULL,
  `Latitude` decimal(9,6) NOT NULL,
  `Longtitude` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_coordinates`
--

INSERT INTO `post_coordinates` (`PostID`, `Latitude`, `Longtitude`) VALUES
(10004, 6.634087, 124.597138),
(10010, 15.000000, 121.083333),
(10014, 10.952217, 122.579946),
(10015, 10.952217, 122.579946),
(10026, 40.712728, -74.006015);

-- --------------------------------------------------------

--
-- Table structure for table `post_media`
--

CREATE TABLE `post_media` (
  `PostID` int(11) NOT NULL,
  `MediaType` varchar(30) NOT NULL,
  `URL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_media`
--

INSERT INTO `post_media` (`PostID`, `MediaType`, `URL`) VALUES
(10002, 'image', '647334ef6c03d.png'),
(10002, 'image', '647334ef6d837.jpeg'),
(10003, 'image', '647337f54da65.jpeg'),
(10003, 'image', '647337f550e0f.jpeg'),
(10003, 'image', '647337f552856.jpeg'),
(10004, 'image', '647338395b9dd.jpeg'),
(10004, 'image', '647338395e3f1.jpeg'),
(10004, 'image', '64733839616d7.jpeg'),
(10005, 'youtube', 'https://www.youtube.com/embed/ZrmclgHtd6I'),
(10005, 'youtube', 'https://www.youtube.com/embed/4QN1BzxF8wM'),
(10006, 'image', '6474d07141b61.jpeg'),
(10007, 'image', '6474d0a63a1f3.jpeg'),
(10008, 'youtube', 'https://www.youtube.com/embed/cK3Ro7OCvWk'),
(10009, 'image', '6474d266c0a7a.jpeg'),
(10009, 'image', '6474d266c3081.jpeg'),
(10010, 'youtube', 'https://www.youtube.com/embed/QBSw8nSVpmI'),
(10011, 'youtube', 'https://www.youtube.com/embed/d32RLSmCBIA'),
(10011, 'youtube', 'https://www.youtube.com/embed/1zm7-d1_ocM'),
(10012, 'youtube', 'https://www.youtube.com/embed/QBSw8nSVpmI'),
(10012, 'youtube', 'https://www.youtube.com/embed/QBSw8nSVpmI'),
(10014, 'image', '647577382f4b7.jpeg'),
(10014, 'image', '6475773830857.jpeg'),
(10025, 'youtube', 'https://www.youtube.com/embed/1zm7-d1_ocM'),
(10025, 'youtube', 'https://www.youtube.com/embed/1zm7-d1_ocM'),
(10026, 'image', '6476cda211874.jpeg'),
(10026, 'image', '6476cda21442b.jpeg'),
(10026, 'image', '6476cda215c3a.jpeg'),
(10026, 'image', '6476cda21726e.jpeg'),
(10027, 'image', '647706cc9be94.jpeg'),
(10028, 'image', '647706dc89ae2.jpeg'),
(10029, 'image', '64770b3265a94.jpeg'),
(10029, 'image', '64770b3266b5e.png'),
(10029, 'image', '64770b3267965.jpeg'),
(10029, 'image', '64770b3268cab.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `post_tags`
--

CREATE TABLE `post_tags` (
  `PostID` int(11) NOT NULL,
  `Tags` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_tags`
--

INSERT INTO `post_tags` (`PostID`, `Tags`) VALUES
(10002, 'UP'),
(10002, 'UPV'),
(10002, 'UPCAT'),
(10003, 'UPCAT'),
(10003, 'UP'),
(10003, 'WhatsUP'),
(10003, 'Hehe'),
(10004, 'UPCAT'),
(10004, 'UP'),
(10004, 'WhatsUP'),
(10004, 'Hehe'),
(10005, 'VCT Pacific'),
(10005, 'Drx'),
(10005, 'Prx'),
(10005, 'Something'),
(10005, 'Forsaken'),
(10006, 'Brand '),
(10006, 'New '),
(10007, 'Brand '),
(10007, 'New '),
(10007, 'thing'),
(10007, 'thing'),
(10008, 'test1'),
(10009, 'Bug'),
(10009, 'Test'),
(10010, 'Test'),
(10011, 'Miami'),
(10011, 'Boston'),
(10011, 'Game7'),
(10012, 'heat'),
(10012, '7'),
(10012, 'celtics'),
(10013, 'Tags'),
(10013, 'Tags'),
(10013, 'Tags'),
(10013, 'Tags1'),
(10013, 'TagsBug'),
(10014, 'Sample'),
(10014, 'Sample2'),
(10015, 'Sample'),
(10015, 'Sample2'),
(10016, 'Smple'),
(10016, 'Smple'),
(10017, 'Smple'),
(10017, 'Smple'),
(10018, 'Smple'),
(10018, 'Smple'),
(10019, 'Smple'),
(10019, 'Smple'),
(10020, 'Smple'),
(10020, 'Smple'),
(10021, 'Smple'),
(10021, 'Smple'),
(10022, 'Smple'),
(10022, 'Smple'),
(10023, 'Smple'),
(10023, 'Smple'),
(10023, 'sample'),
(10023, 'sample samlep'),
(10024, 'Smple'),
(10024, 'Smple'),
(10025, 'hehehe123'),
(10025, '12323'),
(10026, 'sfdsdfsdf'),
(10026, 'Sample Post'),
(10027, 'TesterPOst'),
(10027, 'POstTest'),
(10028, 'TesterPOst'),
(10028, 'POstTest'),
(10029, 'PostTest');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `ProfileID` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Details` text NOT NULL,
  `Category` varchar(30) NOT NULL,
  `DisplayPicture` varchar(30) NOT NULL,
  `DisplayBanner` varchar(30) NOT NULL,
  `DepartmentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`ProfileID`, `Name`, `Details`, `Category`, `DisplayPicture`, `DisplayBanner`, `DepartmentID`) VALUES
(1048, 'UP - Visayas', 'The University of the Philippines Visayas (UPV) is one of the constituent units of the UP System. It has campuses in Miagao, Iloilo; Iloilo City; and Tacloban City — with Miagao being the main campus where the central administration offices are located. UPV’s strategic location has given it the enviable status of being the University with the most far-reaching influence in two regions – Region 6 and 7. UPV has four colleges and a school. These are the College of Fisheries and Ocean Sciences (CFOS), the College of Arts and Sciences (CAS), the College of Management (CM), the School of Technology (SoTech), and the UPV Tacloban College (UPVTC).', 'Official University Page', 'upvLogo.png', 'upVisayas.jpg', 1005),
(1049, 'UPV Komsai.org', 'After a year since it was founded during the first academic year of 2000, UPV Komsai.Org has extended its membership to include not only the UPV student population but also to other schools and private individuals who also share its cause to provide a support group to students and individuals related to IT.\r\n\r\nThe basic principle is that if an individual shares his or her knowledge to another person, they both acquire new knowledge and another new knowledge is formed from the fusion of the two ideas. It would be only logical that if the same concept, if applied to a group of individuals, a massive amount of new ideas would be generated, uplifting the level of consciousness of each individual in the group. Making ourselves better individuals, better persons to others and making a bit of difference to life.', 'Course Page', 'komsai.png', 'komsai_banner.png', 1000),
(1050, 'UPV Statistical Society', 'Official Page of the University of the Philippines - Visayas Statistical Society', 'Course Page', 'stat.png', 'stat_banner.jpg', 1000),
(1051, 'UPV Iloilo DOST', 'Financial Assistance for Students Yey', 'Student Financial Assitance', 'dost.jpg', 'dost_banner.jpg', 1002),
(1054, 'UP System', 'Official Page hehehe.', 'Official Page of the UP System', 'upSystemLogo.png', 'up_system_banner.jpg', 1004),
(1055, 'CAS SC UPV', 'This is the official page for the College of Arts and Sciences Student Council. ', 'Student Council Page', 'casSC.jpg', 'cas_banner.jpg', 1003);

-- --------------------------------------------------------

--
-- Table structure for table `profile_contacts`
--

CREATE TABLE `profile_contacts` (
  `ProfileID` int(11) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Mobile` varchar(11) DEFAULT NULL,
  `Telephone` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_contacts`
--

INSERT INTO `profile_contacts` (`ProfileID`, `Address`, `Email`, `Mobile`, `Telephone`) VALUES
(1048, 'Miagao, Iloilo', 'ipo.upvisayas@up.edu.ph', '09617950005', ''),
(1049, 'UPV Miagao', 'upvkomsai@gmail.com', '', ''),
(1050, 'Miagao, Iloilo', 'upvstatisticalsociety2002@gmai', '', ''),
(1051, 'Miagao, Iloilo', 'scholarship@ro6.dost.gov.ph', '', ''),
(1054, 'Kalaw corner Quirino Streets, UP Diliman Campus, Quezon City', 'upcollegeapplications.oadms@up', '', ''),
(1055, 'Miagao, Philippines', 'cassc.upv@gmail.com', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `profile_credentials`
--

CREATE TABLE `profile_credentials` (
  `ProfileID` int(11) NOT NULL,
  `Username` varchar(30) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_credentials`
--

INSERT INTO `profile_credentials` (`ProfileID`, `Username`, `Password`) VALUES
(1048, 'upvisayas', 'upv1123'),
(1049, 'upvkomsai', 'komsai1123'),
(1050, 'upvStat', 'stat123'),
(1051, 'dost6', 'allowance1234'),
(1054, 'upSystem', 'upSystem1123'),
(1055, 'casSC', 'cas123');

-- --------------------------------------------------------

--
-- Table structure for table `profile_socials`
--

CREATE TABLE `profile_socials` (
  `ProfileID` int(11) NOT NULL,
  `Website` varchar(50) DEFAULT NULL,
  `Facebook` varchar(50) DEFAULT NULL,
  `Youtube` varchar(50) DEFAULT NULL,
  `Twitter` varchar(50) DEFAULT NULL,
  `Tiktok` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_socials`
--

INSERT INTO `profile_socials` (`ProfileID`, `Website`, `Facebook`, `Youtube`, `Twitter`, `Tiktok`) VALUES
(1048, 'www.upv.edu.ph', 'fb.com/UPVisayas', NULL, NULL, NULL),
(1049, 'https://upv.komsai.org/', 'https://fb.com/UPVKomsai.Org', NULL, 'https://twitter.com/upvkomsai', NULL),
(1050, NULL, 'https://www.facebook.com/UPVStatSoc', NULL, 'https://twitter.com/upv_statsoc', NULL),
(1051, NULL, 'https://www.facebook.com/dost6.scholarship', NULL, NULL, NULL),
(1054, 'http://upcat2024.up.edu.ph/', 'https://www.facebook.com/UPSystemOfficeOfAdmission', NULL, NULL, NULL),
(1055, NULL, 'https://www.facebook.com/UPVCASSC', NULL, 'https://twitter.com/UPVCASSC', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `thread`
--

CREATE TABLE `thread` (
  `ThreadID` int(11) NOT NULL,
  `ProfileID` int(11) NOT NULL,
  `PostID` int(11) NOT NULL,
  `DateTime` datetime NOT NULL,
  `PostContent` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thread_coordinates`
--

CREATE TABLE `thread_coordinates` (
  `ThreadID` int(11) NOT NULL,
  `Latitude` decimal(9,6) NOT NULL,
  `Longtitude` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thread_media`
--

CREATE TABLE `thread_media` (
  `ThreadID` int(11) NOT NULL,
  `MediaType` varchar(30) NOT NULL,
  `URL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `thread_tags`
--

CREATE TABLE `thread_tags` (
  `ThreadID` int(11) NOT NULL,
  `Tags` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`DepartmentID`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`PostID`);

--
-- Indexes for table `post_coordinates`
--
ALTER TABLE `post_coordinates`
  ADD PRIMARY KEY (`PostID`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`ProfileID`);

--
-- Indexes for table `profile_contacts`
--
ALTER TABLE `profile_contacts`
  ADD PRIMARY KEY (`ProfileID`);

--
-- Indexes for table `profile_credentials`
--
ALTER TABLE `profile_credentials`
  ADD PRIMARY KEY (`ProfileID`);

--
-- Indexes for table `profile_socials`
--
ALTER TABLE `profile_socials`
  ADD PRIMARY KEY (`ProfileID`);

--
-- Indexes for table `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`ThreadID`);

--
-- Indexes for table `thread_coordinates`
--
ALTER TABLE `thread_coordinates`
  ADD PRIMARY KEY (`ThreadID`);

--
-- Indexes for table `thread_media`
--
ALTER TABLE `thread_media`
  ADD PRIMARY KEY (`ThreadID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10030;

--
-- AUTO_INCREMENT for table `profile_credentials`
--
ALTER TABLE `profile_credentials`
  MODIFY `ProfileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1056;

--
-- AUTO_INCREMENT for table `thread`
--
ALTER TABLE `thread`
  MODIFY `ThreadID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1000;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
