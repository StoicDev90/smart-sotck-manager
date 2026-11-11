-- MySQL dump 10.13  Distrib 5.7.44, for Linux (x86_64)
--
-- Host: localhost    Database: abm
-- ------------------------------------------------------
-- Server version	5.7.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asignacion`
--

DROP TABLE IF EXISTS `asignacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignacion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_alta` date NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  `asignado_a_login` varchar(255) NOT NULL,
  `asignado_por_id_usuario` bigint(20) NOT NULL,
  `ceco_id_ceco` bigint(20) NOT NULL,
  `celo_id_celo` bigint(20) DEFAULT NULL,
  `id_recurso` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKby7xowkbkpydwq0iuht9xeqjw` (`asignado_a_login`),
  KEY `FKec6o3hfcb0naho47fvvxwy4xb` (`asignado_por_id_usuario`),
  KEY `FKr8x8wo9g5bpht09lrma2eqpmq` (`ceco_id_ceco`),
  KEY `FKsrc3lucc4id71lfrx8m8n5axj` (`celo_id_celo`),
  KEY `FKpf8lm65x3lemgtprcqvpns4yd` (`id_recurso`),
  CONSTRAINT `FKby7xowkbkpydwq0iuht9xeqjw` FOREIGN KEY (`asignado_a_login`) REFERENCES `persona` (`login`),
  CONSTRAINT `FKec6o3hfcb0naho47fvvxwy4xb` FOREIGN KEY (`asignado_por_id_usuario`) REFERENCES `usuario` (`id_usuario`),
  CONSTRAINT `FKpf8lm65x3lemgtprcqvpns4yd` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id_recurso`),
  CONSTRAINT `FKr8x8wo9g5bpht09lrma2eqpmq` FOREIGN KEY (`ceco_id_ceco`) REFERENCES `ceco` (`id_ceco`),
  CONSTRAINT `FKsrc3lucc4id71lfrx8m8n5axj` FOREIGN KEY (`celo_id_celo`) REFERENCES `centro_logistico` (`id_celo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacion`
--

LOCK TABLES `asignacion` WRITE;
/*!40000 ALTER TABLE `asignacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ceco`
--

DROP TABLE IF EXISTS `ceco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ceco` (
  `id_ceco` bigint(20) NOT NULL AUTO_INCREMENT,
  `codigo_ceco` varchar(255) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `region_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id_ceco`),
  UNIQUE KEY `UK_c5n6o6v3lilokwr0a8pip440p` (`codigo_ceco`),
  KEY `FKnx5w0vxe51taq0dgwyb19hcxu` (`region_id`),
  CONSTRAINT `FKnx5w0vxe51taq0dgwyb19hcxu` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ceco`
--

LOCK TABLES `ceco` WRITE;
/*!40000 ALTER TABLE `ceco` DISABLE KEYS */;
/*!40000 ALTER TABLE `ceco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `celular`
--

DROP TABLE IF EXISTS `celular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `celular` (
  `id_celular` bigint(20) NOT NULL AUTO_INCREMENT,
  `numero_linea` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) NOT NULL,
  `modelo_id` bigint(20) NOT NULL,
  `recurso_id_recurso` bigint(20) NOT NULL,
  PRIMARY KEY (`id_celular`),
  UNIQUE KEY `UK_h7xbxn36vdp596tohekc062t2` (`recurso_id_recurso`),
  UNIQUE KEY `UK_q3gaag9y4cfphq03m90673jhi` (`serial_number`),
  UNIQUE KEY `UK_6q9age7dgc8p5vjrul04jyle5` (`numero_linea`),
  KEY `FKn4utkqx8iuoysidm0rp0b4foj` (`modelo_id`),
  CONSTRAINT `FK86ti2fn6hebdoon007gdumvp8` FOREIGN KEY (`recurso_id_recurso`) REFERENCES `recurso` (`id_recurso`),
  CONSTRAINT `FKn4utkqx8iuoysidm0rp0b4foj` FOREIGN KEY (`modelo_id`) REFERENCES `modelo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `celular`
--

LOCK TABLES `celular` WRITE;
/*!40000 ALTER TABLE `celular` DISABLE KEYS */;
/*!40000 ALTER TABLE `celular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centro_logistico`
--

DROP TABLE IF EXISTS `centro_logistico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `centro_logistico` (
  `id_celo` bigint(20) NOT NULL,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `localidad_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_celo`),
  UNIQUE KEY `UK_ltfis2yn9pniwh3s7fo0qdcww` (`codigo`),
  KEY `FKqrx9l2wienmkl0ndirq8locar` (`localidad_id`),
  CONSTRAINT `FKqrx9l2wienmkl0ndirq8locar` FOREIGN KEY (`localidad_id`) REFERENCES `localidad` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centro_logistico`
--

LOCK TABLES `centro_logistico` WRITE;
/*!40000 ALTER TABLE `centro_logistico` DISABLE KEYS */;
/*!40000 ALTER TABLE `centro_logistico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `computadora`
--

DROP TABLE IF EXISTS `computadora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `computadora` (
  `id_cpu` bigint(20) NOT NULL AUTO_INCREMENT,
  `gw` varchar(255) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `sm` varchar(255) DEFAULT NULL,
  `tag` int(11) DEFAULT NULL,
  `modelo_id` bigint(20) NOT NULL,
  `recurso_id_recurso` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_cpu`),
  UNIQUE KEY `UK_97j7nkks6phimtca4ctjdaet7` (`nombre`),
  UNIQUE KEY `UK_belbf2q584bf3pejadnjba8kr` (`serial_number`),
  UNIQUE KEY `UK_axey9xuc5es8aboj9720pgb7x` (`ip`),
  KEY `FKiy3uf4rgjt6uxtkksmm2hhxsd` (`modelo_id`),
  KEY `FKn09wafy9rnxqxp15uq72t9s2r` (`recurso_id_recurso`),
  CONSTRAINT `FKiy3uf4rgjt6uxtkksmm2hhxsd` FOREIGN KEY (`modelo_id`) REFERENCES `modelo` (`id`),
  CONSTRAINT `FKn09wafy9rnxqxp15uq72t9s2r` FOREIGN KEY (`recurso_id_recurso`) REFERENCES `recurso` (`id_recurso`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `computadora`
--

LOCK TABLES `computadora` WRITE;
/*!40000 ALTER TABLE `computadora` DISABLE KEYS */;
/*!40000 ALTER TABLE `computadora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `localidad` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `localidad` varchar(255) NOT NULL,
  `region_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_gcudlce7fv5n93yk7968serlv` (`localidad`),
  KEY `FKbd6oeu1c4ui7yakwuah1jpbgx` (`region_id`),
  CONSTRAINT `FKbd6oeu1c4ui7yakwuah1jpbgx` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marca` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_g42kcgw83i65q054yikohi8b9` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (2,'Apple'),(1,'Samsung');
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo`
--

DROP TABLE IF EXISTS `modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modelo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `marca_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKllxq2dldvhxvb5q9csar7vdfy` (`marca_id`),
  CONSTRAINT `FKllxq2dldvhxvb5q9csar7vdfy` FOREIGN KEY (`marca_id`) REFERENCES `marca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
INSERT INTO `modelo` VALUES (1,'Galaxy A56',1),(2,'iPhone 11',2);
/*!40000 ALTER TABLE `modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monitor`
--

DROP TABLE IF EXISTS `monitor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monitor` (
  `id_monitor` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `tag` int(11) DEFAULT NULL,
  `modelo_id` bigint(20) NOT NULL,
  `recurso_id_recurso` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id_monitor`),
  UNIQUE KEY `UK_eueuvmp69wqc8e4k7yy3ucc6h` (`nombre`),
  UNIQUE KEY `UK_5gxxu0fcjqc2ivuwi2crp455` (`serial_number`),
  UNIQUE KEY `UK_1hyn74f4q9s2kf113gt8rgbnh` (`tag`),
  KEY `FKi6n2hmn8dmb7pns7mkytd7kny` (`modelo_id`),
  KEY `FK4ykc3t4j3kut2k3wxegghkgcl` (`recurso_id_recurso`),
  CONSTRAINT `FK4ykc3t4j3kut2k3wxegghkgcl` FOREIGN KEY (`recurso_id_recurso`) REFERENCES `recurso` (`id_recurso`),
  CONSTRAINT `FKi6n2hmn8dmb7pns7mkytd7kny` FOREIGN KEY (`modelo_id`) REFERENCES `modelo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monitor`
--

LOCK TABLES `monitor` WRITE;
/*!40000 ALTER TABLE `monitor` DISABLE KEYS */;
/*!40000 ALTER TABLE `monitor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `persona` (
  `login` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegio`
--

DROP TABLE IF EXISTS `privilegio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilegio` (
  `id_privilegio` bigint(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_privilegio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegio`
--

LOCK TABLES `privilegio` WRITE;
/*!40000 ALTER TABLE `privilegio` DISABLE KEYS */;
INSERT INTO `privilegio` VALUES (1,'RECURSO_VER'),(2,'RECURSO_CREAR'),(3,'RECURSO_EDITAR'),(4,'RECURSO_BORRAR');
/*!40000 ALTER TABLE `privilegio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegio_roles`
--

DROP TABLE IF EXISTS `privilegio_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privilegio_roles` (
  `id_rol` bigint(20) NOT NULL,
  `id_privilegio` bigint(20) NOT NULL,
  KEY `FKgqg2ltlp2q9yt6ctv0ne95of2` (`id_privilegio`),
  KEY `FK1yv3pw1mir3ucb8w4ht1aodq4` (`id_rol`),
  CONSTRAINT `FK1yv3pw1mir3ucb8w4ht1aodq4` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  CONSTRAINT `FKgqg2ltlp2q9yt6ctv0ne95of2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegio` (`id_privilegio`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegio_roles`
--

LOCK TABLES `privilegio_roles` WRITE;
/*!40000 ALTER TABLE `privilegio_roles` DISABLE KEYS */;
INSERT INTO `privilegio_roles` VALUES (1,2),(1,3),(1,4);
/*!40000 ALTER TABLE `privilegio_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recurso`
--

DROP TABLE IF EXISTS `recurso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recurso` (
  `id_recurso` bigint(20) NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) NOT NULL,
  `fecha_baja` date DEFAULT NULL,
  `fecha_creacion` date NOT NULL,
  `fecha_ultima_actualizacion` date DEFAULT NULL,
  `tipo_id` bigint(20) NOT NULL,
  `ultima_actualizacion_por_id_usuario` bigint(20) NOT NULL,
  PRIMARY KEY (`id_recurso`),
  KEY `FKd8xnqfpji17uxpeh45nlfw2hw` (`tipo_id`),
  KEY `FKksd8r35n58ffkfy2uu577wrem` (`ultima_actualizacion_por_id_usuario`),
  CONSTRAINT `FKd8xnqfpji17uxpeh45nlfw2hw` FOREIGN KEY (`tipo_id`) REFERENCES `tipo` (`id`),
  CONSTRAINT `FKksd8r35n58ffkfy2uu577wrem` FOREIGN KEY (`ultima_actualizacion_por_id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recurso`
--

LOCK TABLES `recurso` WRITE;
/*!40000 ALTER TABLE `recurso` DISABLE KEYS */;
/*!40000 ALTER TABLE `recurso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_gx3qpilbkrktjxo845mdtiw6h` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id_rol` bigint(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'ADMIN');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_usuarios`
--

DROP TABLE IF EXISTS `roles_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles_usuarios` (
  `id_usuario` bigint(20) NOT NULL,
  `id_rol` bigint(20) NOT NULL,
  KEY `FKhray3l5w1m82hia6uyyka7cj8` (`id_rol`),
  KEY `FKsl9jx85ff1byy0x5q8ddwn0hu` (`id_usuario`),
  CONSTRAINT `FKhray3l5w1m82hia6uyyka7cj8` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  CONSTRAINT `FKsl9jx85ff1byy0x5q8ddwn0hu` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_usuarios`
--

LOCK TABLES `roles_usuarios` WRITE;
/*!40000 ALTER TABLE `roles_usuarios` DISABLE KEYS */;
INSERT INTO `roles_usuarios` VALUES (1,1);
/*!40000 ALTER TABLE `roles_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_kht4w8gto0m4nqp15il1ksfgn` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
INSERT INTO `tipo` VALUES (3,'CELULAR'),(1,'CPU'),(2,'MONITOR');
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` bigint(20) NOT NULL,
  `habilitado` bit(1) NOT NULL,
  `login` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `UK_pm3f4m4fqv89oeeeac4tbe2f4` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,_binary '','admin','Administrador');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'abm'
--

--
-- Dumping routines for database 'abm'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-11 13:48:35
