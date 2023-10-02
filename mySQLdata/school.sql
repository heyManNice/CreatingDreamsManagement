-- --------------------------------------------------------
-- 主机:                           100.100.100.100
-- 服务器版本:                        5.7.37-log - Source distribution
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- 导出  表 schoolsystem.computer 结构
CREATE TABLE IF NOT EXISTS `computer` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL DEFAULT '0',
  `schoolid` int(11) NOT NULL DEFAULT '0',
  `class` json DEFAULT NULL,
  `notice` json DEFAULT NULL,
  `wallpaper` varchar(200) DEFAULT './img/wallpaper/6X8ax1682922927991.png',
  `version` float DEFAULT '0',
  `pass` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COMMENT='多媒体信息';

-- 正在导出表  schoolsystem.computer 的数据：~5 rows (大约)
INSERT INTO `computer` (`id`, `key`, `schoolid`, `class`, `notice`, `wallpaper`, `version`, `pass`) VALUES
	(1, '0', 1, '{"class": 3, "grade": 9}', '{"msg": "hello"}', './img/wallpaper/6X8ax1682922927991.png', 1.5, 1),
	(2, '1', 1, '{"class": 1, "grade": 9}', '{"msg": "hello"}', './img/wallpaper/6X8ax1682922927991.png', 1.5, 1),
	(3, '0', 1, '{"class": 2, "grade": 9}', '{"msg": "hello"}', './img/wallpaper/6X8ax1682922927991.png', 1.5, 1),
	(4, '4', 1, '{"class": 2, "grade": 8}', '{"msg": "hello"}', './img/wallpaper/aAebK1682922597519.png', 1.5, 1),
	(41, '73c0dadfe86cef27411d0ab28cada29f', 1, '{"class": "6", "grade": "8"}', NULL, './img/wallpaper/6X8ax1682922927991.png', 0, 1);

-- 导出  表 schoolsystem.download 结构
CREATE TABLE IF NOT EXISTS `download` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `file` varchar(50) NOT NULL DEFAULT '0',
  `md5` varchar(32) NOT NULL DEFAULT '0',
  `schoolid` int(11) NOT NULL DEFAULT '0',
  `version` float NOT NULL DEFAULT '0',
  `type` varchar(10) DEFAULT NULL,
  `msg` varchar(400) DEFAULT NULL,
  `timestamp` varchar(20) DEFAULT NULL,
  `size` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 正在导出表  schoolsystem.download 的数据：~2 rows (大约)
INSERT INTO `download` (`id`, `name`, `file`, `md5`, `schoolid`, `version`, `type`, `msg`, `timestamp`, `size`) VALUES
	(1, '默认镜像Win10', 'test.wim', '0', 1, 1, 'image', '用于测试', '1682751979067', '4.7'),
	(2, 'Win10', 'test.wim', '0', 1, 1, 'image', '预装软件：WPS Office、希沃白板5、Microsoft Edge、Chrome、VLC、火绒', '1682751979067', '4.3');

-- 导出  表 schoolsystem.examine 结构
CREATE TABLE IF NOT EXISTS `examine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL DEFAULT '0',
  `targetid` int(11) NOT NULL DEFAULT '0',
  `result` tinyint(4) NOT NULL DEFAULT '0',
  `content` varchar(50) NOT NULL DEFAULT '0',
  `sourceid` int(11) NOT NULL DEFAULT '0',
  `schoolid` int(11) DEFAULT '0',
  `timestamp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- 正在导出表  schoolsystem.examine 的数据：~4 rows (大约)
INSERT INTO `examine` (`id`, `type`, `targetid`, `result`, `content`, `sourceid`, `schoolid`, `timestamp`) VALUES
	(1, 'user', 7, 1, '正在注册为希望中学教师1', 16, 1, '1682751979067'),
	(2, 'user', 7, 1, '正在注册为希望中学教师2', 16, 1, '1682751979067'),
	(3, 'user', 7, 1, '正在注册为希望中学教师3', 16, 1, '1682751979067'),
	(15, 'pc', 41, 1, '正在注册为8年级6班多媒体', 16, 1, '1684059867090');

-- 导出  表 schoolsystem.log 结构
CREATE TABLE IF NOT EXISTS `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` varchar(20) NOT NULL DEFAULT '0',
  `schoolid` int(11) NOT NULL DEFAULT '0',
  `type` varchar(50) NOT NULL DEFAULT '0',
  `compurterid` int(11) NOT NULL DEFAULT '0',
  `content` varchar(400) DEFAULT NULL,
  `img` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb4;

-- 正在导出表  schoolsystem.log 的数据：~2 rows (大约)
INSERT INTO `log` (`id`, `timestamp`, `schoolid`, `type`, `compurterid`, `content`, `img`) VALUES
	(1, '1682861766416', 1, '正常', 1, '多媒体开机', NULL),
	(54, '1684059867099', 1, '正常', 41, '多媒体注册', NULL);

-- 导出  表 schoolsystem.notice 结构
CREATE TABLE IF NOT EXISTS `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(600) DEFAULT NULL,
  `onOff` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 正在导出表  schoolsystem.notice 的数据：~1 rows (大约)
INSERT INTO `notice` (`id`, `title`, `content`, `onOff`) VALUES
	(1, '多媒体系统升级通知', '请同学们不要在多媒体上刷短视频、玩游戏。一但被多媒体检测到，一律严肃处置', 0);

-- 导出  表 schoolsystem.school 结构
CREATE TABLE IF NOT EXISTS `school` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL DEFAULT '0',
  `class` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 正在导出表  schoolsystem.school 的数据：~2 rows (大约)
INSERT INTO `school` (`id`, `name`, `class`) VALUES
	(1, '希望中学', '{"test": 0}'),
	(2, '你的中学', '{"test": 0}');

-- 导出  表 schoolsystem.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `schoolid` int(11) unsigned DEFAULT '0',
  `username` varchar(10) DEFAULT '用户名',
  `phone` varchar(11) DEFAULT '0',
  `password` char(32) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `pass` tinyint(1) DEFAULT '0',
  `disk` varchar(50) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COMMENT='用户的表';

-- 正在导出表  schoolsystem.user 的数据：~2 rows (大约)
INSERT INTO `user` (`id`, `schoolid`, `username`, `phone`, `password`, `isAdmin`, `pass`, `disk`) VALUES
	(7, 1, '杨先生', '15700000000', 'a0a80386c68f2167c66c9d6e9e67b962', 0, 0, '0'),
	(16, 1, '李华', '18800000000', 'a0a80386c68f2167c66c9d6e9e67b962', 1, 0, '0');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
