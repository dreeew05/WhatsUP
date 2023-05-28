-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 28, 2023 at 01:39 PM
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
  `Type` varchar(10) NOT NULL DEFAULT 'Post',
  `HasThread` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`PostID`, `ProfileID`, `DateTime`, `PostContent`, `Type`, `HasThread`) VALUES
(10002, 1048, '2023-05-28 13:03:11', 'asdasdas', 'post', 0),
(10003, 1048, '2023-05-28 13:16:05', 'Test Test 1 2 3 ', 'post', 0),
(10004, 1048, '2023-05-28 13:17:13', 'Test Test 1 2 3 ', 'post', 0),
(10005, 1048, '2023-05-28 13:38:23', 'Youtube Test', 'post', 0);

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
(10004, 6.634087, 124.597138);

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
(10005, 'youtube', 'https://www.youtube.com/embed/4QN1BzxF8wM');

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
(10005, 'Forsaken');

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
(1049, 'UPV Komsai.org', 'After a year since it was founded during the first academic year of 2000, UPV Komsai.Org has extended its membership to include not only the UPV student population but also to other schools and private individuals who also share its cause to provide a support group to students and individuals related to IT.\r\n\r\nThe basic principle is that if an individual shares his or her knowledge to another person, they both acquire new knowledge and another new knowledge is formed from the fusion of the two ideas. It would be only logical that if the same concept, if applied to a group of individuals, a massive amount of new ideas would be generated, uplifting the level of consciousness of each individual in the group. Making ourselves better individuals, better persons to others and making a bit of difference to life.', 'Course Page', 'komsai.png', '', 1000),
(1050, 'UPV Statistical Society', 'Official Page of the University of the Philippines - Visayas Statistical Society', 'Course Page', 'stat.png', '', 1000),
(1051, 'UPV Iloilo DOST', 'Financial Assistance for Students Yey', 'Student Financial Assitance', 'dost.jpg', '', 1002),
(1054, 'UP System', 'Official Page hehehe.', 'Official Page of the UP System', 'upSystemLogo.png', '', 1004),
(1055, 'CAS SC UPV', 'This is the official page for the College of Arts and Sciences Student Council. ', 'Student Council Page', 'casSC.jpg', '', 1003);

-- --------------------------------------------------------

--
-- Table structure for table `profile_contacts`
--

CREATE TABLE `profile_contacts` (
  `ProfileID` int(11) NOT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Email` varchar(30) DEFAULT NULL,
  `Mobile` int(11) DEFAULT NULL,
  `Telephone` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profile_contacts`
--

INSERT INTO `profile_contacts` (`ProfileID`, `Address`, `Email`, `Mobile`, `Telephone`) VALUES
(1048, 'Miagao, Iloilo', 'ipo.upvisayas@up.edu.ph', 2147483647, 0),
(1049, 'UPV Miagao', 'upvkomsai@gmail.com', -1, 0),
(1050, 'Miagao, Iloilo', 'upvstatisticalsociety2002@gmai', 0, 0),
(1051, 'Miagao, Iloilo', 'scholarship@ro6.dost.gov.ph', 0, 0),
(1054, 'Kalaw corner Quirino Streets, UP Diliman Campus, Quezon City', 'upcollegeapplications.oadms@up', 0, 0),
(1055, 'Miagao, Philippines', 'cassc.upv@gmail.com', 0, -2);

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
(1048, 'www.upv.edu.ph', 'fb.com/UPVisayas', '', '', ''),
(1049, 'https://upv.komsai.org/', 'https://fb.com/UPVKomsai.Org', '', 'https://twitter.com/upvkomsai', ''),
(1050, '', 'https://www.facebook.com/UPVStatSoc', '', 'https://twitter.com/upv_statsoc', ''),
(1051, '', 'https://www.facebook.com/dost6.scholarship', '', '', ''),
(1054, 'http://upcat2024.up.edu.ph/', 'https://www.facebook.com/UPSystemOfficeOfAdmission', '', '', ''),
(1055, '', 'https://www.facebook.com/UPVCASSC', '', 'https://twitter.com/UPVCASSC', '');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10006;

--
-- AUTO_INCREMENT for table `profile_credentials`
--
ALTER TABLE `profile_credentials`
  MODIFY `ProfileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1056;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
