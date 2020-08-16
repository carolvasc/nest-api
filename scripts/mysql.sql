-- SCRIPTS

-- Cria um Schema
CREATE SCHEMA `7180`;

-- Cria a tabela Produto
CREATE TABLE `7180`.`product` (
  `id` INT NOT NULL,
  `title` VARCHAR(80) NULL,
  `description` TEXT(4000) NULL,
  `product_col` VARCHAR(45) NULL,
  PRIMARY KEY (`id`)
);