-- dev.bot_config definition

CREATE TABLE bot_config (
  prefix varchar(1) NOT NULL
)
ENGINE=InnoDB;


-- dev.tb_pergunta_tipo definition

CREATE TABLE tb_pergunta_tipo (
  id_tipo int(11) NOT NULL,
  nome_tipo varchar(100) NOT NULL,
  CONSTRAINT tb_pergunta_tipo_pk PRIMARY KEY (id_tipo)
) ENGINE=InnoDB;

-- dev.tb_nivel definition

CREATE TABLE tb_nivel (
  nivel int(11) NOT NULL,
  nivel_xp int(11) NOT NULL,
  PRIMARY KEY (nivel)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- dev.tb_perguntas definition

CREATE TABLE tb_perguntas (
  id_pergunta int(11) NOT NULL AUTO_INCREMENT,
  pergunta text NOT NULL,
  resposta varchar(100) NOT NULL,
  alternativas_falsas text NOT NULL,
  tempo int(11) NOT NULL,
  pontuacao int(11) NOT NULL,
  fk_id_tipo int(11) NOT NULL,
  fk_nivel int(11) NOT NULL,
  PRIMARY KEY (id_pergunta),
  CONSTRAINT tb_perguntas_FK FOREIGN KEY (fk_id_tipo) REFERENCES tb_pergunta_tipo (id_tipo),
  CONSTRAINT tb_perguntas_FK_1 FOREIGN KEY (fk_nivel) REFERENCES tb_nivel (nivel)
) ENGINE=InnoDB;





-- dev.tb_pessoa definition

CREATE TABLE tb_pessoa (
  id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
  pontuacao_desafio int(11) NOT NULL,
  pontuacao_duelo int(11) NOT NULL,
  xp int(11) NOT NULL,
  PRIMARY KEY (id_pessoa)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- dev.tb_pergunta_pessoa definition

CREATE TABLE tb_pergunta_pessoa (
  id_relacao int(11) NOT NULL AUTO_INCREMENT,
  fk_id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
  fk_id_pergunta int(11) NOT NULL,
  PRIMARY KEY (id_relacao),
  KEY tb_pergunta_pessoa_FK (fk_id_pessoa),
  KEY tb_pergunta_pessoa_FK_1 (fk_id_pergunta),
  CONSTRAINT tb_pergunta_pessoa_FK FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa),
  CONSTRAINT tb_pergunta_pessoa_FK_1 FOREIGN KEY (fk_id_pergunta) REFERENCES tb_perguntas (id_pergunta)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- dev.tb_progresso_livros definition

CREATE TABLE tb_progresso_livros (
  id_progresso int(11) NOT NULL AUTO_INCREMENT,
  fk_id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
  id_livro int(11) NOT NULL,
  pagina_atual int(11) NOT NULL,
  PRIMARY KEY (id_progresso),
  KEY tb_progresso_livrso_FK (fk_id_pessoa),
  CONSTRAINT tb_progresso_livrso_FK FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;


-- dev.tb_desafios definition

CREATE TABLE tb_desafios (
  id_desafio int(11) NOT NULL AUTO_INCREMENT,
  titulo_desafio varchar(100) COLLATE latin1_bin NOT NULL,
  descricao desafio text COLLATE latin1_bin NOT NULL,
  codigos_resposta text COLLATE latin1_bin NOT NULL,
  nivel int(11) NOT NULL,
  pontuacao int(11) NOT NULL,
  PRIMARY KEY (id_desafio),
  KEY tb_desafio_FK (nivel),
  CONSTRAINT tb_desafio_FK FOREIGN KEY (nivel) REFERENCES tb_nivel (nivel)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- dev.tb_desafio_testes definition

CREATE TABLE tb_desafio_testes (
  id_teste int(11) NOT NULL AUTO_INCREMENT,
  fk_id_desafio int(11) NOT NULL,
  entrada varchar(100) COLLATE latin1_bin NOT NULL,
  saida varchar(100) COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (id_teste),
  KEY tb_desafio_testes_FK (fk_id_desafio),
  CONSTRAINT tb_desafio_testes_FK FOREIGN KEY (fk_id_desafio) REFERENCES tb_desafios (id_desafio)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;


-- dev.tb_atividade definition

CREATE TABLE tb_atividade (
  id_atividade int(11) NOT NULL AUTO_INCREMENT,
  fk_id_desafio int(11) DEFAULT NULL,
  fk_id_pergunta int(11) DEFAULT NULL,
  datetime datetime NOT NULL,
  PRIMARY KEY (id_atividade),
  KEY tb_atividade_FK (fk_id_pergunta),
  KEY tb_atividade_FK_1 (fk_id_desafio),
  CONSTRAINT tb_atividade_FK FOREIGN KEY (fk_id_pergunta) REFERENCES tb_perguntas (id_pergunta),
  CONSTRAINT tb_atividade_FK_1 FOREIGN KEY (fk_id_desafio) REFERENCES tb_desafios (id_desafio)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- dev.tb_duelo definition

CREATE TABLE tb_duelo (
  id_duelo int(11) NOT NULL AUTO_INCREMENT,
  start_time datetime NOT NULL,
  fk_id_desafiante varchar(18) COLLATE latin1_bin NOT NULL,
  fk_id_desafiado varchar(18) COLLATE latin1_bin NOT NULL,
  end_time datetime DEFAULT NULL,
  fk_atividade int(11) NOT NULL,
  PRIMARY KEY (id_duelo),
  KEY tb_duelo_FK (fk_id_desafiado),
  KEY tb_duelo_FK_1 (fk_id_desafiante),
  KEY tb_duelo_FK_2 (fk_atividade),
  CONSTRAINT tb_duelo_FK FOREIGN KEY (fk_id_desafiado) REFERENCES tb_pessoa (id_pessoa),
  CONSTRAINT tb_duelo_FK_1 FOREIGN KEY (fk_id_desafiante) REFERENCES tb_pessoa (id_pessoa),
  CONSTRAINT tb_duelo_FK_2 FOREIGN KEY (fk_atividade) REFERENCES tb_atividade (id_atividade)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

















-- dev.tb_quizz definition

CREATE TABLE tb_quizz (
  id_quizz int(11) NOT NULL AUTO_INCREMENT,
  fk_id_solicitante varchar(18) COLLATE latin1_bin NOT NULL,
  start_time datetime NOT NULL,
  end_time datetime DEFAULT NULL,
  PRIMARY KEY (id_quizz),
  KEY tb_quizz_FK (fk_id_solicitante),
  CONSTRAINT tb_quizz_FK FOREIGN KEY (fk_id_solicitante) REFERENCES tb_pessoa (id_pessoa)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- dev.tb_quizz_participantes definition

CREATE TABLE tb_quizz_participantes (
  id_participacao int(11) NOT NULL AUTO_INCREMENT,
  fk_id_pessoa varchar(18) COLLATE latin1_bin NOT NULL,
  fk_id_quizz int(11) NOT NULL,
  PRIMARY KEY (id_participacao),
  KEY tb_quizz_participantes_FK (fk_id_pessoa),
  KEY tb_quizz_participantes_FK_1 (fk_id_quizz),
  CONSTRAINT tb_quizz_participantes_FK FOREIGN KEY (fk_id_pessoa) REFERENCES tb_pessoa (id_pessoa),
  CONSTRAINT tb_quizz_participantes_FK_1 FOREIGN KEY (fk_id_quizz) REFERENCES tb_quizz (id_quizz)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;

-- dev.tb_perguntas_quizz definition

CREATE TABLE tb_perguntas_quizz (
  id_relacao int(11) NOT NULL AUTO_INCREMENT,
  fk_id_quizz int(11) NOT NULL,
  fk_id_atividade int(11) NOT NULL,
  PRIMARY KEY (id_relacao),
  KEY tb_perguntas_quizz_FK (fk_id_quizz),
  KEY tb_perguntas_quizz_FK_1 (fk_id_atividade),
  CONSTRAINT tb_perguntas_quizz_FK FOREIGN KEY (fk_id_quizz) REFERENCES tb_quizz (id_quizz),
  CONSTRAINT tb_perguntas_quizz_FK_1 FOREIGN KEY (fk_id_atividade) REFERENCES tb_atividade (id_atividade)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_bin;