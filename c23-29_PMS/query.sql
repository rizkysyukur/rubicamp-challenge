-- Table: public.projects

-- DROP TABLE public.projects;

CREATE TABLE public.projects
(
  projectid integer NOT NULL DEFAULT nextval('projects_projectid_seq'::regclass),
  name character varying(30),
  CONSTRAINT projects_pkey PRIMARY KEY (projectid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.projects
OWNER TO saeful;


-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
  userid integer NOT NULL DEFAULT nextval('user_userid_seq'::regclass),
  email character varying(30),
  password character varying(20),
  firstname character varying(15),
  lastname character varying(15),
  role character varying,
  type character varying(20),
  CONSTRAINT user_pkey PRIMARY KEY (userid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.users
OWNER TO saeful;


-- Table: public.members

-- DROP TABLE public.members;

CREATE TABLE public.members
(
  id integer NOT NULL DEFAULT nextval('members_id_seq'::regclass),
  userid integer,
  projectid integer,
  CONSTRAINT members_pkey PRIMARY KEY (id),
  CONSTRAINT members_projectid_fkey FOREIGN KEY (projectid)
  REFERENCES public.projects (projectid) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT members_userid_fkey FOREIGN KEY (userid)
  REFERENCES public.users (userid) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.members
OWNER TO saeful;


-- Table: public.issues

-- DROP TABLE public.issues;

CREATE TABLE public.issues
(
  issuesid integer NOT NULL DEFAULT nextval('issues_issuesid_seq'::regclass),
  projectid integer,
  tracker character varying(7),
  subject character varying,
  description text,
  status character varying(11),
  priority character varying(9),
  assignee integer,
  startdate date,
  duedate date,
  done smallint,
  file character varying(30),
  spendtime integer,
  targetversion character varying(30),
  author smallint,
  createdate date,
  updateddate date,
  closedate date,
  parenttask integer,
  estimatedtime integer,
  CONSTRAINT issues_pkey PRIMARY KEY (issuesid),
  CONSTRAINT issues_assignee_fkey FOREIGN KEY (assignee)
  REFERENCES public.users (userid) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT issues_author_fkey FOREIGN KEY (author)
  REFERENCES public.users (userid) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT issues_projectid_fkey FOREIGN KEY (projectid)
  REFERENCES public.projects (projectid) MATCH SIMPLE
  ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.issues
OWNER TO saeful;


-- Table: public.activity

-- DROP TABLE public.activity;

CREATE TABLE public.activity
(
  logid integer NOT NULL DEFAULT nextval('log_logid_seq'::regclass),
  logdate date,
  note text,
  CONSTRAINT log_pkey PRIMARY KEY (logid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.activity
OWNER TO postgres;


-- Table: public.colum

-- DROP TABLE public.colum;

CREATE TABLE public.colum
(
  columid integer NOT NULL DEFAULT nextval('colum_columid_seq'::regclass),
  c_id boolean,
  c_name boolean,
  c_member boolean,
  email character varying(30),
  CONSTRAINT colum_pkey PRIMARY KEY (columid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.colum
OWNER TO saeful;


-- Table: public.colum_member

-- DROP TABLE public.colum_member;

CREATE TABLE public.colum_member
(
  cmemberid integer NOT NULL DEFAULT nextval('colum_member_cmemberid_seq'::regclass),
  c_id boolean,
  c_name boolean,
  c_position boolean,
  email character varying(30),
  CONSTRAINT colum_member_pkey PRIMARY KEY (cmemberid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.colum_member
OWNER TO saeful;


-- Table: public.colum_issues

-- DROP TABLE public.colum_issues;

CREATE TABLE public.colum_issues
(
  c_issueid boolean,
  c_subject boolean,
  c_tracker boolean,
  email character varying(30),
  cissueid integer NOT NULL DEFAULT nextval('colum_issues_cissueid_seq'::regclass),
  c_description boolean,
  c_status boolean,
  c_priority boolean,
  c_assignee boolean,
  c_startdate boolean,
  c_duedate boolean,
  c_estimatedtime boolean,
  c_done boolean,
  c_files boolean,
  c_spendtime boolean,
  c_targetversion boolean,
  c_author boolean,
  c_createddate boolean,
  c_updateddate boolean,
  c_closeddate boolean,
  c_parenttask boolean,
  c_projectid boolean,
  CONSTRAINT colum_issues_pkey PRIMARY KEY (cissueid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE public.colum_issues
OWNER TO saeful;
