-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2023 at 12:05 PM
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
(1, 1054, '2023-06-03 19:42:46', 'LOOK: #UPCAT2024 test takers form a queue outside the University of the Philippines Bonifacio Global City (UP BGC) campus in Taguig, as they wait for their turn to take the UP College Admission Test (UPCAT). \nThis is the first time that the UP BGC campus is hosting the admission test for the University. This is also the first time the test is being administered, after it was suspended during the height of the pandemic. Successful test takers will be qualified for enrollment in Academic Year 2024-2025. \nPhotos by UP Media and Public Relations Office (UP MPRO) photographers Abraham Arboleda, Misael Bacani and Jonathan Madrid. Text by KIM G. Quilinguing, UP MPRO.', 1),
(3, 1048, '2023-06-04 02:19:45', 'Junior Executive Society hold Panubli culminating event \nPanubli, a Hiligaynon term which means “to inherit,” accurately describes what the Junior Executive Society, the flagship organization of UPV BS in Management, wanted to achieve through their initiative - the preservation of our rich and unparalleled cultural heritage. \nLaunched in 2022, the Panubli initiative of the Junior Executive Society aims to provide a platform for Ilonggo heritage artisans to address their hurdles, raise awareness regarding these constraints, and ultimately provide them a platform to market their products. The Junior Executive Society took on the challenge of retelling the incredible and incomparable stories of ingenious and passionate Ilongga artisans. \nRead: https://www.upv.edu.ph/.../junior-executive-society-hold...\n📷: UPV Junior Executive Society\n[1/n]', 1),
(4, 1049, '2023-06-04 04:49:14', '𝐒𝐄𝐀𝐑𝐂𝐇: KomCon Speakers\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐑𝐞𝐬𝐮𝐥𝐭𝐬...]\n[𝐑𝐞𝐬𝐮𝐥𝐭𝐬 𝟏/𝟒...]\n❗Jeffrey Aborot | Senior Science Research Specialist | DOST-ASTI\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧...]\nJeffrey Aborot is a science researcher at the DOST-Advanced Science and Technology Institute. He leads research and development projects in DOST-ASTI with topics ranging from software engineering, artificial intelligence, Internet-of-Things, and quantum computing. He is currently the lead for quantum computing research and development in DOST-ASTI. 𝐒𝐞𝐞 𝐦𝐨𝐫𝐞... 🔒 \n❗𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐭𝐨 𝐤𝐧𝐨𝐰 𝐦𝐨𝐫𝐞❗\nJoin us 𝐭𝐨𝐝𝐚𝐲 and become ready for the 𝐟𝐮𝐭𝐮𝐫𝐞!\nRegister through this link: https://up-edu.zoom.us/.../tJUrfuupqjMrH9MWw0e0172...\n𝐏𝐫𝐞𝐬𝐞𝐧𝐭𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Komsai.Org\nAnonymous\n𝐀𝐥𝐬𝐨 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Mathematics Circle \nBeans and Bubbles \nBangs Cocktails Mixes \nMiami One (Christine Marie Nulada )\nIloilo Shanghai Bazar Inc \nJayvee Castañeda\n𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐭𝐡𝐚𝐧𝐤𝐬 𝐭𝐨…\nUPV Diwata Esports \nUPV Elektrons \nUPV Chemistry Society \nAnon\nPatricia Marie Garcia\nAra Abigail Ambita\n#KomsaiWeek2023\n#KomsAIAIAI\nCaption by: Russel Jade Tumanon (BS CS IV)\nPubs by: Ann Beatrice Destajo (BS CS III)', 1),
(5, 1049, '2023-06-04 09:43:18', 'Calling all UPV Miagao students with an artistic flair! 🎨🎉 It\'s time to unleash your creativity and show off your design skills at the Komsai Week T-Shirt Design Contest!\n\nHere are the mechanics:\n\n👕 Participants must be a student of UPV Miagao.\n💙 The shirt color is Deep Dark Blue (#010038) or Black.\n🎨 Each participant can submit up to three (3) entries, so let your imagination run wild!\n👥 Our esteemed judges from UPV Komsai.Org will evaluate the designs.\n⏰ Submissions are open until Friday, June 2, 2023, at 12 Midnight (extended from May 26, 2023)\n🎉 The winner will receive a Cash Prize of P500!\n🤍 Non-winning participants are qualified for a raffle also with a cash prize\n\nTo submit your entries, simply use this form: [https://forms.gle/EgjacG6WgBu5kvGZ6]\n\nShow us what you\'ve got, and let your design shine among the Komsai stars! 🌟🎨 Don\'t miss this chance to leave your mark on KOMSAI WEEK! Good luck, and may the most fabulous design prevail! 🎉✨\n\n🎉 Excitement overload! Don\'t miss out on Komsai Week\'s gaming extravaganza!\n🙌🎉 Grab your controllers, channel your inner gamer, and get ready for an unforgettable adventure! Join us for the ultimate celebration of all things Komsai! Let\'s make memories that will last a lifetime! 🌟🎮\n\nRemember, Komsai Game Night starts at 7:00 PM. Get ready to unleash the gaming beast within! See you there, champions! 🎉🔥\n\n#KomsaiWeek\n#UnleashTheGamerWithin\n\n𝐏𝐫𝐞𝐬𝐞𝐧𝐭𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Komsai.Org\nAnonymous\n\n𝐀𝐥𝐬𝐨 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Mathematics Circle\nBeans and Bubbles\nBangs Cocktails Mixes\nMiami One (Christine Marie Nulada )\nIloilo Shanghai Bazar Inc\nJayvee Castañeda\n\n𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐭𝐡𝐚𝐧𝐤𝐬 𝐭𝐨…\nUPV Diwata Esports\nUPV Elektrons\nUPV Chemistry Society\nAnonymous\nPatricia Marie Garcia\nAra Abigail Ambita\n\n#KomsaiWeek2023\n#KomsAiAiAi\n\nCaption by: Rheymart G. Tugado (BS CS III)\nPubs by: Ron Paolo Molejona (BS CS II)', 0),
(6, 1049, '2023-06-04 09:53:57', ' 𝐄𝐲𝐞𝐬 𝐡𝐞𝐫𝐞! \n❗ It is with great pleasure and enthusiasm that we announce the winners of the 🏆 𝐏𝐞𝐨𝐩𝐥𝐞\'𝐬 𝐂𝐡𝐨𝐢𝐜𝐞 𝐀𝐰𝐚𝐫𝐝 🏆 for 𝐊𝐨𝐦𝐬𝐚𝐢 𝐖𝐞𝐞𝐤\'𝐬 𝐏𝐫𝐨𝐣𝐞𝐜𝐭 𝐄𝐱𝐡𝐢𝐛𝐢𝐭 𝟐𝟎𝟐𝟑 🖥️🖲️\nThis award represents the culmination of the developers\' remarkable displays of ability, innovation, and hard work. \n𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐜𝐨𝐧𝐭𝐫𝐢𝐛𝐮𝐭𝐢𝐧𝐠 𝐢𝐧 𝐭𝐡𝐞 𝐚𝐝𝐯𝐚𝐧𝐜𝐞𝐦𝐞𝐧𝐭 𝐨𝐟 𝐭𝐞𝐜𝐡𝐧𝐨𝐥𝐨𝐠𝐲!\n🏆 WAKIM APP \nby Kimberly Arceña\n🥈 Aqualify \nby Kimberly Arceña and \nNico Guarnes \n🥉 Lost and Found \nby Steve Felizardo,\nDynmar Acevedo,\nJude Deloso, and\nChris Doyo\n𝐏𝐫𝐞𝐬𝐞𝐧𝐭𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Komsai.Org\nAnonymous\n𝐀𝐥𝐬𝐨 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Mathematics Circle \nBeans and Bubbles \nBangs Cocktails Mixes \nMiami One (ChristineMarieNulada )\nIloilo Shanghai Bazar Inc \nJayvee Castañeda\n𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐭𝐡𝐚𝐧𝐤𝐬 𝐭𝐨…\nUPV Diwata Esports \nUPV Elektrons \nUPV Chemistry Society \nAnon\nPatricia Marie Garcia\nAra Abigail Ambita\n#KomsaiWeek2023\n#KomsAIAIAI \nCaption by: Russel Jade Tumanon (BS CS IV)\nPubs by: Ann Beatrice Destajo (BS CS III)', 0),
(7, 1056, '2023-06-04 11:07:07', '✨ Opportunity for our alumni✨\nUNIVERSAL ROBINA CORPORATION (URC) is among the Philippines\' pioneers in the food manufacturing business having been operating in the country for over 50 years. URC Sugar and Renewables Division provides sugar cane milling and refining services, trades raw sugar and sells refined sugar and molasses. URC-Sugar and Renewables (Ursumco) is a raw sugar mill and refinery plant located at Brgy. Alangilanan, Manjuyod, Negros Oriental.\nUrsumco currently needs a Pollution Control Officer (Graduate of Environmental Engineering, Chemical Engineering, or any related degree). If interested, please see the pubmat for the details.', 0),
(8, 1056, '2023-06-04 11:08:44', '✨Opportunity for our ChE alumni✨\nMABUHAY VINYL CORPORATION (MVC) in Iligan City, the only chlor-alkali producer in the country, is currently hiring TECHNICAL SERVICES SPECIALISTS - preferably registered Chemical Engineers.\nIf interested, kindly send application letter and resume to the address indicated in the poster.', 0),
(9, 1056, '2023-06-04 11:11:04', '✨ Opportunity for our alumni✨\n\nManila Water Philippine Ventures is looking for exceptional graduates willing to be part of the Cadetship Training Program (CTP).\n\nThe management development program consists of classroom-based training, specialized on-the-job training and actual immersions to build strengths and capabilities in the technical and management aspects of the business.\n\nBridge the gap between the academic and professional divide and set yourself up for a bright future.', 0),
(10, 1056, '2023-06-04 11:22:47', '𝐂𝐡𝐞𝐦𝐢𝐜𝐚𝐥 𝐄𝐧𝐠𝐢𝐧𝐞𝐞𝐫𝐢𝐧𝐠 𝐚𝐥𝐮𝐦𝐧𝐮𝐬 𝐩𝐫𝐞𝐬𝐞𝐧𝐭𝐬 𝐩𝐚𝐩𝐞𝐫 𝐢𝐧 𝐢𝐧𝐭𝐞𝐫𝐧𝐚𝐭𝐢𝐨𝐧𝐚𝐥 𝐜𝐨𝐧𝐟𝐞𝐫𝐞𝐧𝐜𝐞\nEngr. Fritz Z. Ortigas (BSChE 2020 cum laude) presented virtually the paper entitled \"Synthesis and characterization of hydroxyapatite derived from waste chicken eggshells for cyanide removal application\"  during the 13th International Conference on Key Engineering Materials (ICKEM 2023) last March 24 to 26, 2023. The conference was organized by the Biomaterials and Nanotechnology Research Group & BioNanoTeam of Istanbul University, Türkiye. Onsite participants presented their paper in Istanbul University, Türkiye, while online participants presented their papers via Zoom.\nThe study was co-authored with Engr. Arianne Joy A. Batallones (BSChE 2020 cum laude), and Engr. Elizalde Miguel S. Flores (BSChE 2020 magna cum laude) with adviser Asst. Prof. Francis Eric P. Almaquer. The study was funded by the Small Budget In-House Research Grant (SBIRG) of the Office of the Vice Chancellor for Research and Extension, UP Visayas. The group acknowledges the support of the Department of Science and Technology, UPV Regional Research Center, School of Technology, College of Arts and Sciences, College of Fisheries and Ocean Sciences and Dr. Dennis Ong and Dr. Vivian Topor.', 0),
(11, 1054, '2023-06-04 11:26:24', 'LOOK: #UPCAT2024 test takers form lines outside the University of the Philippines School of Statistics building in UP Diliman on Sunday, June 4, as they wait for their scheduled test.\nThe UP School of Statistics is one of the testing centers in the UP Diliman campus in Quezon City, where the UP College Admission Test (UPCAT) is conducted. Test takers who will pass the UPCAT will be qualified to enroll in the University for Academic Year 2024-2025.\nPhotos by Abraham Arboleda, UP MPRO. Text by KIM G. Quilinguing, UP MPRO.', 1),
(12, 1054, '2023-06-04 11:29:35', 'LOOK: As the University of the Philippines prepares to administer the UP College Admission Test (UPCAT) for the first time since 2020, UP campuses and units have released helpful announcements, traffic rerouting schemes, and reminders for our UPCAT-takers who will be taking the test in the UP campuses.\nHere are some tips for those who will be taking the #UPCAT2024 tomorrow, June 3, and on Sunday, June 4.\nRead more here: https://up.edu.ph/up-college-admission-test-upcat-2024-tips/', 0),
(13, 1054, '2023-06-04 11:54:09', 'UP Manila officially launched its UP Manila Healthy University Policy and Framework. The policy \"emphasized UP Manila\'s unwavering dedication to prioritize the well-being of its students, faculty, and staff, while fostering an atmosphere that promotes health, wellness, and sustainability.\"', 1),
(14, 1054, '2023-06-04 12:02:32', 'For #UPCAT2024 takers in UP Diliman, the Cardinal Santos Medical Center has stationed its Cardinal On Wheels and Hospital On Wheels units on standby at the Palma Hall. Please do not hesitate to approach their medical professionals for help.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `post_coordinates`
--

CREATE TABLE `post_coordinates` (
  `PostID` int(11) NOT NULL,
  `Latitude` decimal(9,6) NOT NULL,
  `Longtitude` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'image', '647b7b9656802.jpeg'),
(1, 'image', '647b7b96581b0.jpeg'),
(1, 'image', '647b7b96598d7.jpeg'),
(1, 'image', '647b7b965cbc8.jpeg'),
(3, 'image', '647bd8a1ac559.jpeg'),
(3, 'image', '647bd8a1af9b4.jpeg'),
(3, 'image', '647bd8a1b1229.jpeg'),
(3, 'image', '647bd8a1b476c.jpeg'),
(4, 'image', '647bfbaa7ca2e.jpeg'),
(5, 'image', '647c40960a937.jpeg'),
(6, 'image', '647c4315429c9.jpeg'),
(6, 'image', '647c431546441.jpeg'),
(7, 'image', '647c543bc7932.jpeg'),
(8, 'image', '647c549cb070b.jpeg'),
(9, 'image', '647c552839371.jpeg'),
(10, 'image', '647c57e71f77f.jpeg'),
(11, 'image', '647c58c01adf3.jpeg'),
(11, 'image', '647c58c01c260.jpeg'),
(11, 'image', '647c58c01e136.jpeg'),
(12, 'image', '647c597f56c11.jpeg'),
(13, 'image', '647c5f41eb162.jpeg'),
(13, 'image', '647c5f41ec3f8.jpeg'),
(13, 'image', '647c5f41ee315.jpeg'),
(13, 'image', '647c5f41ef63b.jpeg'),
(14, 'image', '647c6138eb572.jpeg'),
(14, 'image', '647c6138eea66.jpeg'),
(14, 'image', '647c6138f22f8.jpeg');

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
(1, 'UPCAT'),
(1, 'UP BGC'),
(1, '#UPCAT2024'),
(3, 'Junior Executive Society'),
(3, 'Panubli'),
(3, 'Management'),
(4, 'KomCon2023'),
(4, 'KomsaiWeek2023'),
(4, 'KomsAIAIAI'),
(5, 'KomsaiWeek2023'),
(5, 'TShirt Contest'),
(6, 'KomsaiWeek2023'),
(7, 'Job Opportunity'),
(7, 'Universal Robina Corporation'),
(7, 'SOTECH Alumni'),
(8, 'Job Opportunity'),
(8, 'SOTECH Alumni'),
(8, 'MABUHAY VINYL CORPORATION'),
(8, 'Iligan'),
(9, 'Job Opportunity'),
(9, 'Manila Water Philippine Ventures'),
(9, 'SOTECH Alumni'),
(10, '13th International Conference on Key Engineering Materials'),
(11, 'UPCAT 2024'),
(11, 'UP Diliman'),
(12, 'UPCAT2024'),
(12, 'UPCAT Tips'),
(13, 'UP Manila Healthy University Policy and Framework'),
(13, 'UP Manila'),
(14, 'UPCAT2024'),
(14, 'Hospital On Wheels');

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
(1055, 'CAS SC UPV', 'This is the official page for the College of Arts and Sciences Student Council. ', 'Student Council Page', 'casSC.jpg', 'cas_banner.jpg', 1003),
(1056, 'UPV Sotech', 'The Official Page for the University of the Philippines - Visayas School of Technology. ', 'Department Page', 'upvSotech.png', 'sotechBanner.png', 1001),
(1057, 'UPV Freedom Wall', 'Hehe', ' Kalingawan', 'upvFreedomWall.jpg', 'sample1.jpg', 1005);

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
(1055, 'Miagao, Philippines', 'cassc.upv@gmail.com', '', ''),
(1056, 'Miagao, Iloilo', '', '', ''),
(1057, 'UPV Miagao', '', '', '');

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
(1055, 'casSC', 'cas123'),
(1056, 'upvSotech', '1234'),
(1057, 'freedomWall', '1234');

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
(1055, NULL, 'https://www.facebook.com/UPVCASSC', NULL, 'https://twitter.com/UPVCASSC', NULL),
(1056, '', 'fb.com/upvsotechofficial', '', '', ''),
(1057, '', 'fb.com/UPVFreedomWall', '', '', '');

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

--
-- Dumping data for table `thread`
--

INSERT INTO `thread` (`ThreadID`, `ProfileID`, `PostID`, `DateTime`, `PostContent`) VALUES
(3, 1048, 3, '2023-06-04 02:21:53', 'Junior Executive Society hold Panubli culminating event Panubli, a Hiligaynon term which means “to inherit,” accurately describes what the Junior Executive Society, the flagship organization of UPV BS in Management, wanted to achieve through their initiative - the preservation of our rich and unparalleled cultural heritage. Launched in 2022, the Panubli initiative of the Junior Executive Society aims to provide a platform for Ilonggo heritage artisans to address their hurdles, raise awareness regarding these constraints, and ultimately provide them a platform to market their products. The Junior Executive Society took on the challenge of retelling the incredible and incomparable stories of ingenious and passionate Ilongga artisans. Read: https://www.upv.edu.ph/.../junior-executive-society-hold... 📷: UPV Junior Executive Society [2/n]'),
(5, 1048, 3, '2023-06-04 04:24:17', 'Junior Executive Society hold Panubli culminating event Panubli, a Hiligaynon term which means “to inherit,” accurately describes what the Junior Executive Society, the flagship organization of UPV BS in Management, wanted to achieve through their initiative - the preservation of our rich and unparalleled cultural heritage. Launched in 2022, the Panubli initiative of the Junior Executive Society aims to provide a platform for Ilonggo heritage artisans to address their hurdles, raise awareness regarding these constraints, and ultimately provide them a platform to market their products. The Junior Executive Society took on the challenge of retelling the incredible and incomparable stories of ingenious and passionate Ilongga artisans. Read: https://www.upv.edu.ph/.../junior-executive-society-hold... 📷: UPV Junior Executive Society [n/n]\n\n'),
(9, 1049, 4, '2023-06-04 09:40:12', '𝐒𝐄𝐀𝐑𝐂𝐇: KomCon Speakers\n\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐑𝐞𝐬𝐮𝐥𝐭𝐬...]\n\n[𝐑𝐞𝐬𝐮𝐥𝐭𝐬 𝟐/𝟒...]\n\n❗Hezekiah John Rizan | Associate Software Engineer | Chevron Holdings, Inc.\n\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧...]\n\nHezekiah John Rizan is currently an Associate Software Engineer in Chevron with 30 licenses and certifications on varied programming and software development frameworks. His projects include VacChain (Blockchain), Know-Your-Plate (Machine Learning), and SitMate (Flutter). 𝐒𝐞𝐞 𝐦𝐨𝐫𝐞... 🔒\n\n❗𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐭𝐨 𝐤𝐧𝐨𝐰 𝐦𝐨𝐫𝐞❗\n\nJoin us 𝐭𝐨𝐝𝐚𝐲 and become ready for the 𝐟𝐮𝐭𝐮𝐫𝐞!\nRegister through this link: https://up-edu.zoom.us/.../tJUrfuupqjMrH9MWw0e0172...\n\n𝐏𝐫𝐞𝐬𝐞𝐧𝐭𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Komsai.Org\nAnonymous\n\n𝐀𝐥𝐬𝐨 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Mathematics Circle\nBeans and Bubbles\nBangs Cocktails Mixes\nMiami One (Christine Marie Nulada )\nIloilo Shanghai Bazar Inc\nJayvee Castañeda\n\n𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐭𝐡𝐚𝐧𝐤𝐬 𝐭𝐨…\nUPV Diwata Esports\nUPV Elektrons\nUPV Chemistry Society\nAnon\nPatricia Marie Garcia\nAra Abigail Ambita\n\n#KomsaiWeek2023\n#KomsAIAIAI\n\nCaption by: Russel Jade Tumanon (BS CS IV)\nPubs by: Ann Beatrice Destajo (BS CS III)'),
(17, 1049, 4, '2023-06-04 10:35:21', '𝐒𝐄𝐀𝐑𝐂𝐇: KomCon Speakers\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐑𝐞𝐬𝐮𝐥𝐭𝐬...]\n[𝐑𝐞𝐬𝐮𝐥𝐭𝐬 𝟑/𝟒...]\n❗Ma. Josita Montales | Senior Solutions Consultant | Infor\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧...]\nMa. Josita Montales is currently working as a Senior Solutions Consultant at INFOR PSSC., a software development company for ERP (Enterprise Resource Planning) solutions. 𝐒𝐞𝐞 𝐦𝐨𝐫𝐞... 🔒 \n❗𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐭𝐨 𝐤𝐧𝐨𝐰 𝐦𝐨𝐫𝐞❗\nJoin us 𝐭𝐨𝐝𝐚𝐲 and become ready for the 𝐟𝐮𝐭𝐮𝐫𝐞!\nRegister through this link: https://up-edu.zoom.us/.../tJUrfuupqjMrH9MWw0e0172...\n𝐏𝐫𝐞𝐬𝐞𝐧𝐭𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Komsai.Org\nAnonymous\n𝐀𝐥𝐬𝐨 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Mathematics Circle \nBeans and Bubbles \nBangs Cocktails Mixes \nMiami One (Christine Marie Nulada )\nIloilo Shanghai Bazar Inc \nJayvee Castañeda\n𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐭𝐡𝐚𝐧𝐤𝐬 𝐭𝐨…\nUPV Diwata Esports \nUPV Elektrons \nUPV Chemistry Society \nAnon\nPatricia Marie Garcia\nAra Abigail Ambita\n#KomsaiWeek2023\n#KomsAIAIAI\nCaption by: Russel Jade Tumanon (BS CS IV)\nPubs by: Ann Beatrice Destajo (BS CS III)'),
(18, 1049, 4, '2023-06-04 10:51:56', '𝐒𝐄𝐀𝐑𝐂𝐇: KomCon Speakers\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐑𝐞𝐬𝐮𝐥𝐭𝐬...]\n[𝐑𝐞𝐬𝐮𝐥𝐭𝐬 𝟒/𝟒...]\n❗Dr. Yvette Gonzales | Computer Department Head of Center for Technology Research and Development | Chairperson\n[𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧...]\nDr. Yvette Gonzales is currently the Head of the Computer Department of Iloilo Science and Technology University. She has a PhD. in Computer and Information and Communication Engineering, Computer Software Engineering, and a Masters in Multimedia Engineering. 𝐒𝐞𝐞 𝐦𝐨𝐫𝐞... 🔒 \n❗𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐭𝐨 𝐤𝐧𝐨𝐰 𝐦𝐨𝐫𝐞❗\nJoin us 𝐭𝐨𝐝𝐚𝐲 and become ready for the 𝐟𝐮𝐭𝐮𝐫𝐞!\nRegister through this link: https://up-edu.zoom.us/.../tJUrfuupqjMrH9MWw0e0172...\n𝐏𝐫𝐞𝐬𝐞𝐧𝐭𝐞𝐝 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Komsai.Org\nAnonymous\n𝐀𝐥𝐬𝐨 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐭𝐨 𝐲𝐨𝐮 𝐛𝐲…\nUPV Mathematics Circle \nBeans and Bubbles \nBangs Cocktails Mixes \nMiami One (Christine Marie Nulada )\nIloilo Shanghai Bazar Inc \nJayvee Castañeda\n𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐭𝐡𝐚𝐧𝐤𝐬 𝐭𝐨…\nUPV Diwata Esports \nUPV Elektrons \nUPV Chemistry Society \nAnon\nPatricia Marie Garcia\nAra Abigail Ambita\n#KomsaiWeek2023\n#KomsAIAIAI\nCaption by: Russel Jade Tumanon (BS CS IV)\nPubs by: Ann Beatrice Destajo (BS CS III)'),
(19, 1054, 1, '2023-06-04 10:54:03', 'LOOK: #UPCAT2024 test takers form a queue outside the University of the Philippines Bonifacio Global City (UP BGC) campus in Taguig, as they wait for their turn to take the UP College Admission Test (UPCAT). This is the first time that the UP BGC campus is hosting the admission test for the University. This is also the first time the test is being administered, after it was suspended during the height of the pandemic. Successful test takers will be qualified for enrollment in Academic Year 2024-2025. Photos by UP Media and Public Relations Office (UP MPRO) photographers Abraham Arboleda, Misael Bacani and Jonathan Madrid. Text by KIM G. Quilinguing, UP MPRO. [n/n]'),
(20, 1054, 11, '2023-06-04 11:27:28', ''),
(21, 1054, 13, '2023-06-04 11:55:21', 'UP Manila officially launched its UP Manila Healthy University Policy and Framework. The policy \"emphasized UP Manila\'s unwavering dedication to prioritize the well-being of its students, faculty, and staff, while fostering an atmosphere that promotes health, wellness, and sustainability.\" [2/2]'),
(22, 1054, 14, '2023-06-04 12:03:17', '[2/3]'),
(23, 1054, 14, '2023-06-04 12:04:04', '[3/3]');

-- --------------------------------------------------------

--
-- Table structure for table `thread_coordinates`
--

CREATE TABLE `thread_coordinates` (
  `ThreadID` int(11) NOT NULL,
  `Latitude` decimal(9,6) NOT NULL,
  `Longtitude` decimal(9,6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thread_coordinates`
--

INSERT INTO `thread_coordinates` (`ThreadID`, `Latitude`, `Longtitude`) VALUES
(3, 10.650612, 122.221526),
(21, 14.575944, 120.986473);

-- --------------------------------------------------------

--
-- Table structure for table `thread_media`
--

CREATE TABLE `thread_media` (
  `ThreadID` int(11) NOT NULL,
  `MediaType` varchar(30) NOT NULL,
  `URL` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thread_media`
--

INSERT INTO `thread_media` (`ThreadID`, `MediaType`, `URL`) VALUES
(3, 'image', '647bd9219fe8e.jpeg'),
(3, 'image', '647bd921a17ba.jpeg'),
(3, 'image', '647bd921a2fa4.jpeg'),
(3, 'image', '647bd921a7010.jpeg'),
(5, 'image', '647bf5d12fc48.jpeg'),
(9, 'image', '647c3fdcc98f3.jpeg'),
(17, 'image', '647c4cc99ee24.jpeg'),
(18, 'image', '647c50ac35f8a.jpeg'),
(19, 'image', '647c512bada95.jpeg'),
(19, 'image', '647c512baf8a9.jpeg'),
(20, 'image', '647c5900b035e.jpeg'),
(20, 'image', '647c5900b2253.jpeg'),
(21, 'image', '647c5f89960f4.jpeg'),
(21, 'image', '647c5f8997c7b.jpeg'),
(22, 'image', '647c6165d020b.jpeg'),
(22, 'image', '647c6165d36de.jpeg'),
(23, 'image', '647c6194b0521.jpeg'),
(23, 'image', '647c6194b214b.jpeg'),
(23, 'image', '647c6194b548b.jpeg'),
(23, 'image', '647c6194b6db9.jpeg');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `PostID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `profile_credentials`
--
ALTER TABLE `profile_credentials`
  MODIFY `ProfileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1058;

--
-- AUTO_INCREMENT for table `thread`
--
ALTER TABLE `thread`
  MODIFY `ThreadID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
