/*
MySQL Data Transfer
Source Host: localhost
Source Database: oimsv3
Target Host: localhost
Target Database: oimsv3
Date: 2014/6/23 20:48:15
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for eyeballpress
-- ----------------------------
DROP TABLE IF EXISTS `eyeballpress`;
CREATE TABLE `eyeballpress` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `l_eye_value1` varchar(50) DEFAULT NULL,
  `l_eye_value2` varchar(50) DEFAULT NULL,
  `r_eye_value1` varchar(50) DEFAULT NULL,
  `r_eye_value2` varchar(50) DEFAULT NULL,
  `check_doc` varchar(50) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyebchao
-- ----------------------------
DROP TABLE IF EXISTS `eyebchao`;
CREATE TABLE `eyebchao` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `jckj1` varchar(500) DEFAULT NULL,
  `jckj2` varchar(500) DEFAULT NULL,
  `jckj3` varchar(500) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyect
-- ----------------------------
DROP TABLE IF EXISTS `eyect`;
CREATE TABLE `eyect` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `r_k1` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `r_k2` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `r_l` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `r_iol` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `l_k1` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `l_k2` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `l_l` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `l_iol` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `check_type` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `ct_result` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `check_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `memo` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `doctor` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cli_date` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `rep_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for eyejmdxt
-- ----------------------------
DROP TABLE IF EXISTS `eyejmdxt`;
CREATE TABLE `eyejmdxt` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `jm_xt` varchar(50) DEFAULT NULL,
  `jm_ql` varchar(500) DEFAULT NULL,
  `jm_txwz` varchar(50) DEFAULT NULL,
  `jm_zddwz` varchar(50) DEFAULT NULL,
  `jm_zpdwz` varchar(50) DEFAULT NULL,
  `jm_sqd_zx` varchar(50) DEFAULT NULL,
  `jm_zddjsz` varchar(50) DEFAULT NULL,
  `jm_zyq` varchar(50) DEFAULT NULL,
  `jm_pzyq` varchar(50) DEFAULT NULL,
  `jm_zbq` varchar(50) DEFAULT NULL,
  `jm_jmyq` varchar(50) DEFAULT NULL,
  `jm_simk` varchar(50) DEFAULT NULL,
  `jm_sai` varchar(50) DEFAULT NULL,
  `jm_sri` varchar(50) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `check_doc` varchar(50) DEFAULT NULL,
  `yb` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyejmqlj
-- ----------------------------
DROP TABLE IF EXISTS `eyejmqlj`;
CREATE TABLE `eyejmqlj` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `lk1` varchar(50) DEFAULT NULL,
  `lk2` varchar(50) DEFAULT NULL,
  `lk1_direction` varchar(50) DEFAULT NULL,
  `lk2_direction` varchar(50) DEFAULT NULL,
  `rk1` varchar(50) DEFAULT NULL,
  `rk2` varchar(50) DEFAULT NULL,
  `rk1_direction` varchar(50) DEFAULT NULL,
  `rk2_direction` varchar(50) DEFAULT NULL,
  `demo` varchar(50) DEFAULT NULL,
  `check_doc` varchar(50) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyejmspjs
-- ----------------------------
DROP TABLE IF EXISTS `eyejmspjs`;
CREATE TABLE `eyejmspjs` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `midu` varchar(50) DEFAULT NULL,
  `daxiao` varchar(50) DEFAULT NULL,
  `bianyixishu` varchar(50) DEFAULT NULL,
  `memo` varchar(50) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `yb` varchar(50) DEFAULT NULL,
  `r_cd` varchar(50) DEFAULT NULL,
  `r_ave` varchar(50) DEFAULT NULL,
  `r_sd` varchar(50) DEFAULT NULL,
  `r_cv` varchar(50) DEFAULT NULL,
  `r_aa` varchar(50) DEFAULT NULL,
  `r_num` varchar(50) DEFAULT NULL,
  `r_min` varchar(50) DEFAULT NULL,
  `r_max` varchar(50) DEFAULT NULL,
  `l_cd` varchar(50) DEFAULT NULL,
  `l_ave` varchar(50) DEFAULT NULL,
  `l_sd` varchar(50) DEFAULT NULL,
  `l_cv` varchar(50) DEFAULT NULL,
  `l_aa` varchar(50) DEFAULT NULL,
  `l_num` varchar(50) DEFAULT NULL,
  `l_min` varchar(50) DEFAULT NULL,
  `l_max` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `check_doc` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyeoct
-- ----------------------------
DROP TABLE IF EXISTS `eyeoct`;
CREATE TABLE `eyeoct` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `oct_result` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `check_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `yanbie` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `check_type` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `extend_result1` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result2` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result3` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `memo` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `doctor` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cli_date` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `rep_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for eyeqfjj
-- ----------------------------
DROP TABLE IF EXISTS `eyeqfjj`;
CREATE TABLE `eyeqfjj` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `seq_r_1_s` varchar(50) DEFAULT NULL,
  `seq_r_2_s` varchar(50) DEFAULT NULL,
  `seq_r_3_s` varchar(50) DEFAULT NULL,
  `seq_r_4_s` varchar(50) DEFAULT NULL,
  `seq_r_1_d` varchar(50) DEFAULT NULL,
  `seq_r_2_d` varchar(50) DEFAULT NULL,
  `seq_r_3_d` varchar(50) DEFAULT NULL,
  `seq_r_4_d` varchar(50) DEFAULT NULL,
  `seq_l_1_s` varchar(50) DEFAULT NULL,
  `seq_l_2_s` varchar(50) DEFAULT NULL,
  `seq_l_3_s` varchar(50) DEFAULT NULL,
  `seq_l_4_s` varchar(50) DEFAULT NULL,
  `seq_l_1_d` varchar(50) DEFAULT NULL,
  `seq_l_2_d` varchar(50) DEFAULT NULL,
  `seq_l_3_d` varchar(50) DEFAULT NULL,
  `seq_l_4_d` varchar(50) DEFAULT NULL,
  `memo` varchar(1000) DEFAULT NULL,
  `check_doc` varchar(50) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyereportpicture
-- ----------------------------
DROP TABLE IF EXISTS `eyereportpicture`;
CREATE TABLE `eyereportpicture` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `report_id` int(10) NOT NULL,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `path_picture` varchar(200) DEFAULT NULL,
  `memo` varchar(200) DEFAULT NULL,
  `paixu` int(10) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyesmj
-- ----------------------------
DROP TABLE IF EXISTS `eyesmj`;
CREATE TABLE `eyesmj` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `smj_result` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result1` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result2` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result3` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `doctor` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cli_date` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `rep_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for eyetsjjfw
-- ----------------------------
DROP TABLE IF EXISTS `eyetsjjfw`;
CREATE TABLE `eyetsjjfw` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `seq_1` varchar(50) DEFAULT NULL,
  `seq_2` varchar(50) DEFAULT NULL,
  `seq_3` varchar(50) DEFAULT NULL,
  `seq_4` varchar(50) DEFAULT NULL,
  `seq_5` varchar(50) DEFAULT NULL,
  `seq_6` varchar(50) DEFAULT NULL,
  `seq_7` varchar(50) DEFAULT NULL,
  `seq_8` varchar(50) DEFAULT NULL,
  `seq_9` varchar(50) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `check_doc` varchar(50) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyetsjsj
-- ----------------------------
DROP TABLE IF EXISTS `eyetsjsj`;
CREATE TABLE `eyetsjsj` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `sj_1` varchar(500) DEFAULT NULL,
  `sj_2` varchar(500) DEFAULT NULL,
  `sj_3` varchar(500) DEFAULT NULL,
  `swmdy` varchar(500) DEFAULT NULL,
  `memo` varchar(500) DEFAULT NULL,
  `check_doc` varchar(50) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for eyeubm
-- ----------------------------
DROP TABLE IF EXISTS `eyeubm`;
CREATE TABLE `eyeubm` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `ubm_no` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `yanbie` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `result` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `memo` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result1` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result2` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result3` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `check_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `doctor` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cli_date` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `rep_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for eyeydzx
-- ----------------------------
DROP TABLE IF EXISTS `eyeydzx`;
CREATE TABLE `eyeydzx` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `ydzx_result` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `check_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `yanbie` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `check_type` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `extend_result1` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result2` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result3` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `memo` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `doctor` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cli_date` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `rep_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for eyeygzy
-- ----------------------------
DROP TABLE IF EXISTS `eyeygzy`;
CREATE TABLE `eyeygzy` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `ygzy_result` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `check_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `yanbie` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `check_type` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `extend_result1` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result2` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `extend_result3` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `memo` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
  `doctor` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cli_date` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `rep_doc` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for eyeyxjc
-- ----------------------------
DROP TABLE IF EXISTS `eyeyxjc`;
CREATE TABLE `eyeyxjc` (
  `flow_no` int(10) NOT NULL AUTO_INCREMENT,
  `jcd_id` int(10) NOT NULL,
  `huanzhexinxi_id` int(10) NOT NULL,
  `jcfs` varchar(300) DEFAULT NULL,
  `result` varchar(2000) DEFAULT NULL,
  `doctor` varchar(50) DEFAULT NULL,
  `cli_date` varchar(50) DEFAULT NULL,
  `rep_doc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`flow_no`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
