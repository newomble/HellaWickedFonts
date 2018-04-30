--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.12
-- Dumped by pg_dump version 9.5.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comment_id_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    comment_id integer DEFAULT nextval('public.comment_id_seq'::regclass) NOT NULL,
    user_id integer,
    font_id integer,
    comment_text text,
    rating integer
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- Name: font_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.font_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.font_id_seq OWNER TO postgres;

--
-- Name: font; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.font (
    font_id integer DEFAULT nextval('public.font_id_seq'::regclass) NOT NULL,
    family character varying(45),
    source_json character varying(45) DEFAULT '/fonts/json/'::character varying NOT NULL,
    popularity integer DEFAULT '-1'::integer,
    trending_rank integer,
    kind character varying(15) DEFAULT 'unknown'::character varying NOT NULL
);


ALTER TABLE public.font OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.history_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.history_id_seq OWNER TO postgres;

--
-- Name: font_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.font_history (
    history_id integer DEFAULT nextval('public.history_id_seq'::regclass) NOT NULL,
    font_id integer,
    rank integer,
    trending_rank integer,
    "time" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.font_history OWNER TO postgres;

--
-- Name: rating_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rating_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rating_id_seq OWNER TO postgres;

--
-- Name: rating; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rating (
    rating_id integer DEFAULT nextval('public.rating_id_seq'::regclass) NOT NULL,
    user_id integer,
    font_id integer,
    comment_id integer,
    rating smallint
);


ALTER TABLE public.rating OWNER TO postgres;

--
-- Name: sampletxt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sampletxt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sampletxt_id_seq OWNER TO postgres;

--
-- Name: sample_text; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sample_text (
    sample_id integer DEFAULT nextval('public.sampletxt_id_seq'::regclass) NOT NULL,
    font_id integer,
    sample_text text
);


ALTER TABLE public.sample_text OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    user_id integer DEFAULT nextval('public.user_id_seq'::regclass) NOT NULL,
    username character varying(45),
    first_name character varying(45),
    last_name character varying(45),
    password character varying(555),
    salt character varying(45),
    email character varying(45)
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_font_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_font_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_font_id_seq OWNER TO postgres;

--
-- Name: user_font; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_font (
    user_font_id integer DEFAULT nextval('public.user_font_id_seq'::regclass) NOT NULL,
    user_user_id integer,
    font_font_id integer,
    rank integer
);


ALTER TABLE public.user_font OWNER TO postgres;

--
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (comment_id, user_id, font_id, comment_text, rating) FROM stdin;
1	2	1	asdasda	\N
2	2	1	hello, sir	\N
3	2	114	hey there	\N
\.


--
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 3, true);


--
-- Data for Name: font; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.font (font_id, family, source_json, popularity, trending_rank, kind) FROM stdin;
72	EB Garamond	/fonts/json/	78	526	serif
50	Pacifico	/fonts/json/	50	559	handwriting
27	Fira Sans	/fonts/json/	27	377	sans-serif
30	Nanum Gothic	/fonts/json/	33	291	sans-serif
86	Vollkorn	/fonts/json/	85	429	serif
12	Merriweather	/fonts/json/	12	356	serif
53	Libre Franklin	/fonts/json/	53	688	sans-serif
36	Oxygen	/fonts/json/	35	573	sans-serif
102	Noticia Text	/fonts/json/	103	361	serif
87	Catamaran	/fonts/json/	82	402	sans-serif
107	Cookie	/fonts/json/	108	490	handwriting
62	Dancing Script	/fonts/json/	63	395	handwriting
90	Cinzel	/fonts/json/	89	226	serif
17	Roboto Mono	/fonts/json/	21	151	monospace
71	Acme	/fonts/json/	71	678	sans-serif
78	Rokkitt	/fonts/json/	73	130	serif
106	ABeeZee	/fonts/json/	105	272	sans-serif
32	Bitter	/fonts/json/	32	409	serif
100	Pathway Gothic One	/fonts/json/	96	72	sans-serif
76	Francois One	/fonts/json/	77	618	sans-serif
98	Poiret One	/fonts/json/	95	494	display
91	Passion One	/fonts/json/	90	627	display
83	Ropa Sans	/fonts/json/	84	191	sans-serif
110	Orbitron	/fonts/json/	114	634	sans-serif
109	Monda	/fonts/json/	111	85	sans-serif
75	Rajdhani	/fonts/json/	79	90	sans-serif
84	Source Code Pro	/fonts/json/	83	413	monospace
96	Teko	/fonts/json/	102	181	sans-serif
79	Patua One	/fonts/json/	74	682	display
52	Ubuntu Condensed	/fonts/json/	51	230	sans-serif
3	Lato	/fonts/json/	3	366	sans-serif
70	Kanit	/fonts/json/	70	398	sans-serif
47	Abel	/fonts/json/	46	303	sans-serif
22	Arimo	/fonts/json/	22	414	sans-serif
108	Courgette	/fonts/json/	106	399	handwriting
41	Arvo	/fonts/json/	42	692	serif
68	Amatic SC	/fonts/json/	67	171	handwriting
5	Roboto Condensed	/fonts/json/	5	417	sans-serif
38	Fjalla One	/fonts/json/	40	363	sans-serif
99	Philosopher	/fonts/json/	104	139	sans-serif
25	Noto Serif	/fonts/json/	25	253	serif
28	Indie Flower	/fonts/json/	28	294	handwriting
103	Russo One	/fonts/json/	98	172	sans-serif
48	Lobster	/fonts/json/	45	798	display
35	Inconsolata	/fonts/json/	36	580	monospace
39	Libre Baskerville	/fonts/json/	38	384	serif
82	Crete Round	/fonts/json/	81	659	serif
74	Maven Pro	/fonts/json/	76	599	sans-serif
51	Abril Fatface	/fonts/json/	52	450	display
89	Righteous	/fonts/json/	86	178	display
19	Lora	/fonts/json/	18	389	serif
15	Noto Sans	/fonts/json/	16	451	sans-serif
105	Alfa Slab One	/fonts/json/	125	112	display
58	Varela Round	/fonts/json/	57	328	sans-serif
44	Hind	/fonts/json/	44	739	sans-serif
57	Shadows Into Light	/fonts/json/	58	581	handwriting
34	Dosis	/fonts/json/	29	596	sans-serif
95	Heebo	/fonts/json/	94	200	sans-serif
26	Nunito	/fonts/json/	26	390	sans-serif
42	Quicksand	/fonts/json/	41	496	sans-serif
20	Titillium Web	/fonts/json/	19	217	sans-serif
40	Work Sans	/fonts/json/	39	367	sans-serif
2	Open Sans	/fonts/json/	2	510	sans-serif
46	Rubik	/fonts/json/	49	491	sans-serif
97	Old Standard TT	/fonts/json/	99	766	serif
43	Josefin Sans	/fonts/json/	43	695	sans-serif
63	Gloria Hallelujah	/fonts/json/	64	341	handwriting
8	Slabo 27px	/fonts/json/	8	684	serif
21	PT Serif	/fonts/json/	20	620	serif
49	Karla	/fonts/json/	48	282	sans-serif
29	Anton	/fonts/json/	31	323	sans-serif
45	Yanone Kaffeesatz	/fonts/json/	47	773	sans-serif
60	Bree Serif	/fonts/json/	62	420	serif
88	Berkshire Swash	/fonts/json/	92	348	handwriting
104	Great Vibes	/fonts/json/	97	788	handwriting
94	Permanent Marker	/fonts/json/	93	342	handwriting
80	Comfortaa	/fonts/json/	80	440	display
101	Yantramanav	/fonts/json/	100	208	sans-serif
10	PT Sans	/fonts/json/	10	568	sans-serif
67	Signika	/fonts/json/	68	789	sans-serif
56	Merriweather Sans	/fonts/json/	55	442	sans-serif
9	Raleway	/fonts/json/	9	350	sans-serif
37	Cabin	/fonts/json/	37	443	sans-serif
66	Source Serif Pro	/fonts/json/	60	141	serif
77	Hind Siliguri	/fonts/json/	75	142	sans-serif
92	Alegreya	/fonts/json/	91	685	serif
31	Crimson Text	/fonts/json/	30	569	serif
93	Shrikhand	/fonts/json/	101	143	display
65	Play	/fonts/json/	66	214	sans-serif
1	Roboto	/fonts/json/	1	512	sans-serif
64	Questrial	/fonts/json/	65	216	sans-serif
4	Montserrat	/fonts/json/	4	283	sans-serif
11	Roboto Slab	/fonts/json/	11	400	serif
728	Diplomata SC	/fonts/json/	741	89	display
798	Felipa	/fonts/json/	794	382	handwriting
678	Jim Nightshade	/fonts/json/	711	756	handwriting
418	Cambo	/fonts/json/	418	222	serif
142	Marck Script	/fonts/json/	143	232	handwriting
200	Scada	/fonts/json/	222	393	sans-serif
698	Julee	/fonts/json/	693	673	handwriting
448	Mate	/fonts/json/	438	426	serif
748	Sahitya	/fonts/json/	749	760	serif
13	Open Sans Condensed	/fonts/json/	13	233	sans-serif
428	Proza Libre	/fonts/json/	433	102	sans-serif
688	Griffy	/fonts/json/	686	674	display
250	Black Ops One	/fonts/json/	252	124	display
190	Basic	/fonts/json/	193	252	sans-serif
498	Harmattan	/fonts/json/	441	704	sans-serif
220	Actor	/fonts/json/	219	458	sans-serif
121	Josefin Slab	/fonts/json/	122	777	serif
658	Text Me One	/fonts/json/	665	462	sans-serif
180	Cabin Sketch	/fonts/json/	174	260	display
309	IM Fell DW Pica	/fonts/json/	314	13	serif
230	Arsenal	/fonts/json/	230	509	sans-serif
538	Tulpen One	/fonts/json/	559	785	display
808	Libre Barcode 39 Text	/fonts/json/	773	18	display
758	Lakki Reddy	/fonts/json/	761	537	handwriting
778	Sirin Stencil	/fonts/json/	782	556	display
648	Nova Round	/fonts/json/	646	144	display
598	Donegal One	/fonts/json/	606	149	serif
240	Ubuntu Mono	/fonts/json/	248	265	monospace
815	Almendra Display	/fonts/json/	807	165	display
350	Jaldi	/fonts/json/	352	168	sans-serif
718	Kantumruy	/fonts/json/	723	35	sans-serif
568	Wendy One	/fonts/json/	618	795	sans-serif
528	Italiana	/fonts/json/	536	713	serif
876	Dokdo	/fonts/json/	876	839	handwriting
408	Oxygen Mono	/fonts/json/	416	48	monospace
380	Cambay	/fonts/json/	376	49	sans-serif
608	Germania One	/fonts/json/	607	724	display
398	Convergence	/fonts/json/	424	306	sans-serif
578	Delius Unicase	/fonts/json/	572	464	handwriting
170	Hind Madurai	/fonts/json/	169	64	sans-serif
628	League Script	/fonts/json/	598	725	handwriting
825	Fruktur	/fonts/json/	827	567	display
319	Londrina Solid	/fonts/json/	327	593	display
279	Goudy Bookletter 1911	/fonts/json/	293	75	serif
488	Bilbo Swash Caps	/fonts/json/	490	733	handwriting
150	Boogaloo	/fonts/json/	153	170	display
160	Pragati Narrow	/fonts/json/	168	736	sans-serif
438	Baumans	/fonts/json/	447	608	display
259	Itim	/fonts/json/	269	850	handwriting
269	Ovo	/fonts/json/	271	851	serif
370	Abhaya Libre	/fonts/json/	378	615	serif
768	Rum Raisin	/fonts/json/	777	633	sans-serif
111	Concert One	/fonts/json/	110	322	display
846	Chela One	/fonts/json/	846	737	display
329	Archivo	/fonts/json/	317	353	sans-serif
518	Suez One	/fonts/json/	500	80	serif
618	Averia Libre	/fonts/json/	604	354	display
856	Fasthand	/fonts/json/	853	373	serif
788	Risque	/fonts/json/	787	870	display
388	Merienda One	/fonts/json/	385	743	handwriting
558	Mallanna	/fonts/json/	540	469	sans-serif
508	Gurajada	/fonts/json/	532	636	serif
638	Numans	/fonts/json/	635	744	sans-serif
668	Cormorant Upright	/fonts/json/	708	88	serif
866	Libre Barcode 39	/fonts/json/	867	872	display
210	Martel	/fonts/json/	208	177	serif
299	Halant	/fonts/json/	304	184	serif
738	Smythe	/fonts/json/	733	195	display
289	Voltaire	/fonts/json/	292	475	sans-serif
458	Poly	/fonts/json/	458	637	serif
835	Sofadi One	/fonts/json/	832	486	display
478	Orienta	/fonts/json/	492	374	sans-serif
340	VT323	/fonts/json/	359	209	monospace
548	Nova Mono	/fonts/json/	549	488	monospace
588	Amarante	/fonts/json/	584	489	display
131	Amiri	/fonts/json/	131	498	serif
708	Coiny	/fonts/json/	712	670	display
468	Waiting for the Sunrise	/fonts/json/	464	671	handwriting
360	Lilita One	/fonts/json/	360	508	display
446	Emilys Candy	/fonts/json/	430	137	display
122	News Cycle	/fonts/json/	120	587	sans-serif
830	Butterfly Kids	/fonts/json/	830	145	handwriting
819	Sedgwick Ave Display	/fonts/json/	803	589	handwriting
233	Sarala	/fonts/json/	233	174	sans-serif
476	Meddon	/fonts/json/	474	349	handwriting
385	Allan	/fonts/json/	370	179	display
681	Ramaraja	/fonts/json/	716	358	serif
660	Joti One	/fonts/json/	680	709	display
859	Gaegu	/fonts/json/	859	10	handwriting
151	Volkhov	/fonts/json/	156	726	serif
255	Coustard	/fonts/json/	266	843	serif
352	Spirax	/fonts/json/	357	20	display
192	Vidaloka	/fonts/json/	191	846	serif
132	Fira Sans Condensed	/fonts/json/	135	234	sans-serif
286	Oranienbaum	/fonts/json/	294	449	serif
750	Meie Script	/fonts/json/	755	867	handwriting
641	BioRhyme	/fonts/json/	663	33	serif
171	Unica One	/fonts/json/	171	728	display
405	Andika	/fonts/json/	392	746	sans-serif
721	Underdog	/fonts/json/	726	597	display
869	Black And White Picture	/fonts/json/	868	34	sans-serif
520	Tienne	/fonts/json/	524	365	serif
243	Oleo Script	/fonts/json/	240	607	display
326	El Messiri	/fonts/json/	299	767	sans-serif
375	Six Caps	/fonts/json/	379	609	sans-serif
316	Carrois Gothic	/fonts/json/	312	372	sans-serif
741	Bayon	/fonts/json/	719	55	display
630	Stoke	/fonts/json/	610	236	serif
790	Romanesco	/fonts/json/	784	771	handwriting
769	Modak	/fonts/json/	774	617	display
759	Trykker	/fonts/json/	751	648	serif
711	IM Fell Double Pica SC	/fonts/json/	722	657	serif
213	Advent Pro	/fonts/json/	218	242	sans-serif
336	Annie Use Your Telescope	/fonts/json/	324	781	handwriting
600	Rosarivo	/fonts/json/	597	664	serif
436	Walter Turncoat	/fonts/json/	429	381	handwriting
202	Alice	/fonts/json/	203	459	serif
850	Hanalei Fill	/fonts/json/	850	797	display
426	Capriola	/fonts/json/	427	482	sans-serif
485	Clicker Script	/fonts/json/	479	505	handwriting
810	Passero One	/fonts/json/	808	677	display
500	Shojumaru	/fonts/json/	533	511	display
691	Plaster	/fonts/json/	706	806	display
113	Alegreya Sans	/fonts/json/	109	518	sans-serif
779	Galdeano	/fonts/json/	790	530	sans-serif
701	Atma	/fonts/json/	694	60	display
182	Yrsa	/fonts/json/	183	388	serif
347	Faster One	/fonts/json/	348	62	display
510	Creepster	/fonts/json/	514	63	display
650	Ruluko	/fonts/json/	645	535	sans-serif
840	Federant	/fonts/json/	839	259	display
266	Antic	/fonts/json/	354	67	sans-serif
731	Snowburst One	/fonts/json/	736	544	display
14	Ubuntu	/fonts/json/	14	305	sans-serif
560	Nova Square	/fonts/json/	563	401	display
620	Encode Sans Semi Condensed	/fonts/json/	614	809	sans-serif
466	Laila	/fonts/json/	472	83	serif
570	Slackey	/fonts/json/	570	421	display
276	Coming Soon	/fonts/json/	280	326	handwriting
490	Port Lligat Slab	/fonts/json/	498	327	serif
540	Sumana	/fonts/json/	481	93	serif
799	Freehand	/fonts/json/	802	330	display
671	Mina	/fonts/json/	709	826	sans-serif
223	Damion	/fonts/json/	217	550	handwriting
365	Scheherazade	/fonts/json/	329	346	serif
590	Rakkas	/fonts/json/	508	838	display
416	Hanuman	/fonts/json/	436	111	serif
245	Coda	/fonts/json/	250	679	display
610	Aref Ruqaa	/fonts/json/	580	842	serif
143	Kalam	/fonts/json/	142	424	handwriting
296	Freckle Face	/fonts/json/	291	552	display
580	Princess Sofia	/fonts/json/	642	562	handwriting
395	Delius	/fonts/json/	384	572	handwriting
530	Euphoria Script	/fonts/json/	528	700	handwriting
550	Over the Rainbow	/fonts/json/	546	706	handwriting
306	Rochester	/fonts/json/	308	425	handwriting
161	Armata	/fonts/json/	162	428	sans-serif
456	Stalemate	/fonts/json/	428	430	handwriting
812	Trochut	/fonts/json/	817	553	display
851	Unlock	/fonts/json/	852	59	display
381	Average Sans	/fonts/json/	387	555	sans-serif
651	Ranchers	/fonts/json/	656	66	display
225	Overpass	/fonts/json/	211	228	sans-serif
732	Oldenburg	/fonts/json/	728	76	display
861	Suravaram	/fonts/json/	860	79	serif
16	Playfair Display	/fonts/json/	15	235	serif
555	Vibur	/fonts/json/	517	833	handwriting
702	Della Respira	/fonts/json/	697	705	serif
772	Eater	/fonts/json/	780	96	display
752	Faustina	/fonts/json/	746	100	serif
277	Jockey One	/fonts/json/	297	708	sans-serif
575	Sriracha	/fonts/json/	575	379	handwriting
123	Tinos	/fonts/json/	128	243	serif
145	Ruda	/fonts/json/	150	244	sans-serif
430	Vast Shadow	/fonts/json/	432	586	display
463	Rouge Script	/fonts/json/	463	606	handwriting
185	Glegoo	/fonts/json/	195	610	serif
327	Bubblegum Sans	/fonts/json/	330	614	display
235	Alex Brush	/fonts/json/	234	403	handwriting
337	Lalezar	/fonts/json/	148	105	display
841	Erica One	/fonts/json/	841	624	display
870	East Sea Dokdo	/fonts/json/	870	836	handwriting
195	Rufina	/fonts/json/	207	840	serif
722	Purple Purse	/fonts/json/	704	257	display
586	Mystery Quest	/fonts/json/	583	844	display
409	Trocchi	/fonts/json/	405	433	serif
493	Brawler	/fonts/json/	495	632	serif
165	Merienda	/fonts/json/	188	710	handwriting
297	Baloo	/fonts/json/	307	845	display
215	Homemade Apple	/fonts/json/	215	434	handwriting
473	Podkova	/fonts/json/	483	734	serif
361	Poller One	/fonts/json/	342	114	display
258	Carter One	/fonts/json/	258	117	display
355	Kelly Slab	/fonts/json/	351	296	display
419	Cutive Mono	/fonts/json/	410	860	monospace
633	Rationale	/fonts/json/	632	639	sans-serif
692	Spicy Rice	/fonts/json/	705	118	display
400	Happy Monkey	/fonts/json/	404	300	display
624	Ribeye	/fonts/json/	622	764	display
712	Eagle Lake	/fonts/json/	703	642	handwriting
782	IM Fell Great Primer SC	/fonts/json/	776	439	serif
452	Pangolin	/fonts/json/	450	863	handwriting
482	Imprima	/fonts/json/	497	770	sans-serif
390	Rasa	/fonts/json/	409	772	serif
605	Simonetta	/fonts/json/	603	780	display
831	Tenali Ramakrishna	/fonts/json/	835	125	sans-serif
133	Pontano Sans	/fonts/json/	132	312	sans-serif
515	Encode Sans	/fonts/json/	516	448	sans-serif
822	Chathura	/fonts/json/	820	315	sans-serif
155	Bangers	/fonts/json/	145	190	display
175	Amaranth	/fonts/json/	176	868	sans-serif
672	Linden Hill	/fonts/json/	672	796	serif
114	Titan One	/fonts/json/	112	3	display
682	Encode Sans Expanded	/fonts/json/	683	316	sans-serif
205	Press Start 2P	/fonts/json/	212	874	display
802	Black Han Sans	/fonts/json/	814	6	sans-serif
307	Limelight	/fonts/json/	311	799	display
441	Fondamento	/fonts/json/	439	324	handwriting
762	Dr Sugiyama	/fonts/json/	768	461	handwriting
504	Amethysta	/fonts/json/	504	364	serif
613	Condiment	/fonts/json/	619	667	handwriting
662	Sonsie One	/fonts/json/	662	466	display
792	Londrina Shadow	/fonts/json/	795	804	display
545	Shanti	/fonts/json/	556	807	sans-serif
565	Denk One	/fonts/json/	565	198	sans-serif
640	Scope One	/fonts/json/	641	199	serif
247	Electrolize	/fonts/json/	245	472	sans-serif
268	Marcellus SC	/fonts/json/	267	501	serif
525	Asap Condensed	/fonts/json/	520	369	sans-serif
287	Leckerli One	/fonts/json/	274	502	handwriting
343	Palanquin	/fonts/json/	341	517	sans-serif
371	Graduate	/fonts/json/	364	822	display
536	Finger Paint	/fonts/json/	530	539	display
595	Mate SC	/fonts/json/	587	686	serif
317	Saira Extra Condensed	/fonts/json/	368	689	sans-serif
742	Caesar Dressing	/fonts/json/	744	823	display
833	Sevillana	/fonts/json/	828	565	display
410	Gruppo	/fonts/json/	390	54	display
793	Metal	/fonts/json/	806	274	display
313	Puritan	/fonts/json/	320	406	sans-serif
221	Barlow	/fonts/json/	221	275	sans-serif
843	Baloo Tammudu	/fonts/json/	840	410	display
622	Cagliostro	/fonts/json/	628	829	sans-serif
18	Poppins	/fonts/json/	17	173	sans-serif
667	Monsieur La Doulaise	/fonts/json/	668	422	handwriting
707	Nokora	/fonts/json/	734	61	serif
501	Unkempt	/fonts/json/	485	432	display
212	Barlow Semi Condensed	/fonts/json/	216	78	sans-serif
803	Devonshire	/fonts/json/	805	278	handwriting
460	Just Me Again Down Here	/fonts/json/	507	287	handwriting
582	Bilbo	/fonts/json/	553	849	handwriting
753	Elsie Swash Caps	/fonts/json/	752	97	display
733	Macondo	/fonts/json/	740	861	display
491	Arya	/fonts/json/	496	866	sans-serif
368	Rosario	/fonts/json/	366	579	sans-serif
511	Bentham	/fonts/json/	511	292	serif
863	Dhurjati	/fonts/json/	861	99	sans-serif
763	Piedra	/fonts/json/	758	182	display
783	Bokor	/fonts/json/	793	107	display
304	Alef	/fonts/json/	286	186	sans-serif
612	Rhodium Libre	/fonts/json/	620	108	serif
542	Suranna	/fonts/json/	545	203	serif
399	Give You Glory	/fonts/json/	391	585	handwriting
813	Moul	/fonts/json/	821	301	display
439	Gabriela	/fonts/json/	451	638	serif
687	Wellfleet	/fonts/json/	684	207	display
655	Croissant One	/fonts/json/	638	325	display
632	Milonga	/fonts/json/	624	129	display
602	Maiden Orange	/fonts/json/	586	661	display
479	Secular One	/fonts/json/	461	223	sans-serif
112	Satisfy	/fonts/json/	107	437	handwriting
183	Bevan	/fonts/json/	190	238	display
333	Norican	/fonts/json/	340	140	handwriting
562	Codystar	/fonts/json/	558	663	display
274	Marcellus	/fonts/json/	278	666	serif
203	Patrick Hand	/fonts/json/	200	334	handwriting
338	Space Mono	/fonts/json/	323	247	monospace
264	Candal	/fonts/json/	279	152	sans-serif
521	Ledger	/fonts/json/	544	355	serif
283	Karma	/fonts/json/	296	251	serif
532	Cantora One	/fonts/json/	539	255	sans-serif
697	Sunshiney	/fonts/json/	696	262	handwriting
429	Kristi	/fonts/json/	435	438	handwriting
124	Assistant	/fonts/json/	119	155	sans-serif
378	La Belle Aurore	/fonts/json/	415	159	handwriting
773	Ribeye Marrow	/fonts/json/	764	750	display
450	Pattaya	/fonts/json/	470	169	sans-serif
552	Engagement	/fonts/json/	552	368	handwriting
141	Cabin Condensed	/fonts/json/	149	378	sans-serif
253	Caveat Brush	/fonts/json/	241	779	handwriting
572	Gothic A1	/fonts/json/	567	1	sans-serif
853	Gidugu	/fonts/json/	851	477	sans-serif
823	Gamja Flower	/fonts/json/	826	7	handwriting
389	Mukta Vaani	/fonts/json/	394	45	sans-serif
193	Gentium Book Basic	/fonts/json/	182	263	serif
469	Sarpanch	/fonts/json/	475	50	sans-serif
323	Yesteryear	/fonts/json/	316	487	handwriting
134	Sacramento	/fonts/json/	133	503	handwriting
421	Fjord One	/fonts/json/	423	52	serif
162	Audiowide	/fonts/json/	161	507	display
348	Aladin	/fonts/json/	344	791	handwriting
242	Viga	/fonts/json/	244	268	sans-serif
717	Uncial Antiqua	/fonts/json/	718	801	display
592	Montserrat Subrayada	/fonts/json/	616	516	sans-serif
723	Autour One	/fonts/json/	715	802	display
677	Baloo Bhaijaan	/fonts/json/	675	816	display
873	Yeon Sung	/fonts/json/	873	818	display
743	Ewert	/fonts/json/	756	386	display
232	Rancho	/fonts/json/	236	387	handwriting
152	Hammersmith One	/fonts/json/	152	528	sans-serif
645	Peralta	/fonts/json/	636	269	display
358	Doppio One	/fonts/json/	347	540	sans-serif
172	Arima Madurai	/fonts/json/	175	545	display
294	Radley	/fonts/json/	298	391	serif
125	Prompt	/fonts/json/	129	86	sans-serif
837	Emblema One	/fonts/json/	837	574	display
516	Lemon	/fonts/json/	519	245	display
877	Sunflower	/fonts/json/	877	871	sans-serif
867	Libre Barcode 128 Text	/fonts/json/	871	87	display
465	Carrois Gothic SC	/fonts/json/	460	94	sans-serif
780	Jacques Francois	/fonts/json/	779	452	serif
281	Molengo	/fonts/json/	273	719	sans-serif
789	Ranga	/fonts/json/	788	877	display
311	Reem Kufi	/fonts/json/	300	722	sans-serif
231	Chewy	/fonts/json/	231	575	display
435	Federo	/fonts/json/	443	115	sans-serif
720	Petrona	/fonts/json/	702	591	serif
201	Yellowtail	/fonts/json/	206	595	handwriting
567	Averia Sans Libre	/fonts/json/	571	640	display
412	Arizonia	/fonts/json/	408	476	handwriting
617	Dekko	/fonts/json/	601	258	handwriting
597	Londrina Outline	/fonts/json/	600	738	display
690	Asset	/fonts/json/	690	264	display
445	Athiti	/fonts/json/	446	119	sans-serif
364	Pompiere	/fonts/json/	372	266	display
404	IM Fell English SC	/fonts/json/	419	759	serif
191	Prata	/fonts/json/	173	480	serif
577	Dorsa	/fonts/json/	577	485	sans-serif
670	Fresca	/fonts/json/	670	763	sans-serif
374	Mada	/fonts/json/	381	120	sans-serif
331	Nanum Gothic Coding	/fonts/json/	343	646	monospace
115	Domine	/fonts/json/	113	270	serif
739	Original Surfer	/fonts/json/	730	782	display
301	Italianno	/fonts/json/	301	131	handwriting
627	Buda	/fonts/json/	644	493	display
211	Bad Script	/fonts/json/	210	500	handwriting
506	Knewave	/fonts/json/	505	652	display
546	Vampiro One	/fonts/json/	550	515	display
661	IM Fell Great Primer	/fonts/json/	667	529	serif
495	Fira Mono	/fonts/json/	506	654	monospace
181	Enriqueta	/fonts/json/	178	271	serif
749	Keania One	/fonts/json/	753	286	display
847	Chenla	/fonts/json/	847	288	display
770	Meera Inimai	/fonts/json/	778	150	sans-serif
135	Fredoka One	/fonts/json/	138	154	display
384	Quando	/fonts/json/	383	800	serif
241	Allura	/fonts/json/	238	156	handwriting
174	Gentium Basic	/fonts/json/	187	290	serif
423	Mako	/fonts/json/	420	533	sans-serif
394	Trirong	/fonts/json/	407	308	serif
800	Bonbon	/fonts/json/	800	805	handwriting
526	Salsa	/fonts/json/	527	536	display
730	Goblin One	/fonts/json/	739	333	display
475	Frijole	/fonts/json/	477	810	display
144	Monoton	/fonts/json/	144	542	display
486	Manuale	/fonts/json/	654	16	serif
222	Fugaz One	/fonts/json/	235	669	display
342	Homenaje	/fonts/json/	334	672	sans-serif
809	Encode Sans Semi Expanded	/fonts/json/	822	17	sans-serif
252	Eczar	/fonts/json/	253	22	serif
291	Nobile	/fonts/json/	290	681	sans-serif
535	Battambang	/fonts/json/	568	26	display
557	Khmer	/fonts/json/	562	41	display
858	Moulpali	/fonts/json/	862	176	display
353	Biryani	/fonts/json/	353	219	sans-serif
760	Kavivanar	/fonts/json/	653	43	handwriting
262	Overlock	/fonts/json/	256	225	display
680	Revalia	/fonts/json/	649	241	display
607	McLaren	/fonts/json/	599	548	display
272	Pridi	/fonts/json/	263	343	serif
637	Junge	/fonts/json/	631	397	serif
587	Quintessential	/fonts/json/	574	683	handwriting
164	Economica	/fonts/json/	157	551	sans-serif
700	Glass Antiqua	/fonts/json/	701	717	display
652	Baloo Thambi	/fonts/json/	666	718	display
455	Duru Sans	/fonts/json/	456	563	sans-serif
820	Nova Cut	/fonts/json/	818	564	display
829	Kumar One	/fonts/json/	829	828	display
321	Mitr	/fonts/json/	325	855	sans-serif
710	Henny Penny	/fonts/json/	714	865	display
154	Fira Sans Extra Condensed	/fonts/json/	146	405	sans-serif
642	Bubbler One	/fonts/json/	627	416	sans-serif
544	Lovers Quarrel	/fonts/json/	509	30	handwriting
505	Loved by the King	/fonts/json/	502	660	handwriting
249	Cantata One	/fonts/json/	255	662	serif
496	Crushed	/fonts/json/	486	189	display
514	Corben	/fonts/json/	522	201	display
126	Cardo	/fonts/json/	124	786	serif
226	Varela	/fonts/json/	229	457	sans-serif
167	Ultra	/fonts/json/	179	204	serif
484	Padauk	/fonts/json/	476	36	sans-serif
524	Sofia	/fonts/json/	529	675	handwriting
594	Mukta Mahee	/fonts/json/	602	42	sans-serif
553	Nova Slim	/fonts/json/	555	221	display
177	Frank Ruhl Libre	/fonts/json/	165	687	serif
369	Mukta	/fonts/json/	371	65	sans-serif
198	Adamina	/fonts/json/	198	483	serif
657	UnifrakturCook	/fonts/json/	660	697	display
157	Prosto One	/fonts/json/	164	70	display
767	Kenia	/fonts/json/	759	484	display
260	Hind Guntur	/fonts/json/	246	73	sans-serif
583	Mogra	/fonts/json/	596	495	display
320	Copse	/fonts/json/	313	514	serif
116	Archivo Black	/fonts/json/	121	790	sans-serif
647	IBM Plex Sans Condensed	/fonts/json/	671	91	sans-serif
188	Sigmar One	/fonts/json/	181	106	display
359	Nanum Brush Script	/fonts/json/	363	794	handwriting
686	Sedgwick Ave	/fonts/json/	679	224	handwriting
300	Fauna One	/fonts/json/	289	256	serif
574	Nosifer	/fonts/json/	573	827	display
626	Spectral SC	/fonts/json/	611	279	serif
787	Tillana	/fonts/json/	799	699	handwriting
414	Montez	/fonts/json/	414	701	handwriting
148	BenchNine	/fonts/json/	154	520	sans-serif
827	Macondo Swash Caps	/fonts/json/	825	835	display
391	Encode Sans Condensed	/fonts/json/	389	122	sans-serif
280	Average	/fonts/json/	276	524	serif
434	Seaweed Script	/fonts/json/	382	712	display
797	Ruge Boogie	/fonts/json/	792	848	handwriting
351	Nanum Pen Script	/fonts/json/	358	531	handwriting
777	IM Fell French Canon SC	/fonts/json/	769	127	serif
838	Bungee Outline	/fonts/json/	842	547	display
454	Anaheim	/fonts/json/	455	135	sans-serif
424	Yatra One	/fonts/json/	444	588	display
757	Jacques Francois Shadow	/fonts/json/	770	741	display
216	Special Elite	/fonts/json/	213	852	display
807	Kdam Thmor	/fonts/json/	785	14	display
290	Unna	/fonts/json/	282	21	serif
136	Didact Gothic	/fonts/json/	140	592	sans-serif
206	Kreon	/fonts/json/	196	598	serif
860	Libre Barcode 39 Extended	/fonts/json/	863	602	display
737	Irish Grover	/fonts/json/	737	621	display
706	IBM Plex Serif	/fonts/json/	710	23	serif
330	Allerta Stencil	/fonts/json/	332	318	sans-serif
665	Nova Flat	/fonts/json/	648	859	display
727	Monofett	/fonts/json/	724	147	display
533	Life Savers	/fonts/json/	537	321	display
444	Palanquin Dark	/fonts/json/	442	148	sans-serif
464	Chau Philomene One	/fonts/json/	489	869	sans-serif
716	Inknut Antiqua	/fonts/json/	717	340	serif
474	Rammetto One	/fonts/json/	480	875	display
849	Peddana	/fonts/json/	855	751	serif
379	Gilda Display	/fonts/json/	375	160	serif
816	Stalinist One	/fonts/json/	815	185	display
615	Kadwa	/fonts/json/	617	641	serif
636	Trade Winds	/fonts/json/	640	352	display
341	Racing Sans One	/fonts/json/	339	357	display
310	Nixie One	/fonts/json/	309	360	display
747	Iceberg	/fonts/json/	748	757	display
237	Montserrat Alternates	/fonts/json/	232	758	sans-serif
270	Lustria	/fonts/json/	268	768	serif
696	Marko One	/fonts/json/	707	371	serif
603	Esteban	/fonts/json/	623	643	serif
676	Content	/fonts/json/	687	407	display
871	Stylish	/fonts/json/	872	774	sans-serif
563	Geo	/fonts/json/	566	783	sans-serif
402	IM Fell Double Pica	/fonts/json/	369	415	serif
314	Bungee	/fonts/json/	322	37	display
431	Mouse Memoirs	/fonts/json/	426	394	sans-serif
619	Bellefair	/fonts/json/	585	793	serif
842	Aubrey	/fonts/json/	843	560	display
781	Zilla Slab Highlight	/fonts/json/	763	408	display
470	Miriam Libre	/fonts/json/	457	220	sans-serif
417	Mr De Haviland	/fonts/json/	413	576	handwriting
427	Wire One	/fonts/json/	425	584	sans-serif
214	Arbutus Slab	/fonts/json/	214	418	serif
832	Baloo Da	/fonts/json/	833	803	display
204	Sintony	/fonts/json/	209	611	sans-serif
852	Mr Bedfort	/fonts/json/	849	427	handwriting
709	New Rocker	/fonts/json/	691	38	display
293	Reenie Beanie	/fonts/json/	285	453	handwriting
163	Chivo	/fonts/json/	172	39	sans-serif
244	Niconne	/fonts/json/	237	455	handwriting
589	Elsie	/fonts/json/	588	239	display
127	Gudea	/fonts/json/	130	630	sans-serif
366	Inder	/fonts/json/	361	655	sans-serif
334	Telex	/fonts/json/	337	815	sans-serif
629	Pirata One	/fonts/json/	630	240	display
284	Parisienne	/fonts/json/	284	460	handwriting
345	Tenor Sans	/fonts/json/	338	656	sans-serif
599	Kranky	/fonts/json/	592	694	display
234	Love Ya Like A Sister	/fonts/json/	254	57	display
719	Montaga	/fonts/json/	725	819	serif
117	Lobster Two	/fonts/json/	117	463	display
639	Fascinate Inline	/fonts/json/	661	824	display
489	UnifrakturMaguntia	/fonts/json/	484	465	display
569	Katibeh	/fonts/json/	487	825	display
539	Mirza	/fonts/json/	466	837	display
254	Quantico	/fonts/json/	257	249	sans-serif
659	Paprika	/fonts/json/	655	289	display
771	Atomic Age	/fonts/json/	771	471	display
407	Buenard	/fonts/json/	401	71	serif
173	Contrail One	/fonts/json/	185	77	display
609	Dynalight	/fonts/json/	589	698	display
669	Flavors	/fonts/json/	685	103	display
519	Wallpoet	/fonts/json/	525	110	display
376	Yeseva One	/fonts/json/	367	133	display
579	Baloo Chettan	/fonts/json/	578	853	display
224	Paytone One	/fonts/json/	227	293	sans-serif
872	Poor Story	/fonts/json/	874	856	display
801	Suwannaphum	/fonts/json/	809	134	display
449	Oleo Script Swash Caps	/fonts/json/	454	146	display
740	Miltonian Tattoo	/fonts/json/	743	161	display
194	Playball	/fonts/json/	204	295	display
324	Anonymous Pro	/fonts/json/	335	707	monospace
263	Spinnaker	/fonts/json/	260	499	sans-serif
184	Signika Negative	/fonts/json/	177	304	sans-serif
679	IM Fell DW Pica SC	/fonts/json/	677	504	serif
386	Kurale	/fonts/json/	403	711	serif
549	Sansita	/fonts/json/	560	164	sans-serif
153	Nanum Myeongjo	/fonts/json/	163	188	serif
689	Timmana	/fonts/json/	682	313	sans-serif
509	Mukta Malar	/fonts/json/	471	24	sans-serif
273	Lateef	/fonts/json/	259	202	handwriting
729	Farsan	/fonts/json/	720	205	display
440	Vesper Libre	/fonts/json/	462	27	serif
862	Jua	/fonts/json/	857	31	sans-serif
559	Bungee Shade	/fonts/json/	561	314	display
356	Calligraffitti	/fonts/json/	356	331	handwriting
791	Nova Oval	/fonts/json/	789	715	display
481	Lily Script One	/fonts/json/	494	747	display
529	Prociono	/fonts/json/	541	339	serif
811	Bahiana	/fonts/json/	811	345	display
761	Smokum	/fonts/json/	772	523	display
751	Mrs Sheppards	/fonts/json/	754	347	handwriting
821	Bigelow Rules	/fonts/json/	819	525	display
699	MedievalSharp	/fonts/json/	689	749	display
140	Arapey	/fonts/json/	139	543	serif
499	Stardos Stencil	/fonts/json/	503	755	display
459	Megrim	/fonts/json/	469	362	display
303	Changa One	/fonts/json/	306	546	display
649	IM Fell French Canon	/fonts/json/	651	370	serif
396	Andada	/fonts/json/	386	784	serif
451	Holtwood One SC	/fonts/json/	459	302	serif
703	Lancelot	/fonts/json/	695	113	display
551	Coda Caption	/fonts/json/	535	811	sans-serif
875	Kirang Haerang	/fonts/json/	869	813	display
503	Cedarville Cursive	/fonts/json/	515	629	handwriting
683	Angkor	/fonts/json/	699	123	display
168	Luckiest Guy	/fonts/json/	170	830	display
834	Taprom	/fonts/json/	834	132	display
643	Asul	/fonts/json/	633	474	sans-serif
339	Alegreya SC	/fonts/json/	333	310	serif
483	Rubik Mono One	/fonts/json/	488	841	sans-serif
734	Arbutus	/fonts/json/	747	311	display
442	Rozha One	/fonts/json/	440	857	serif
513	Baloo Tamma	/fonts/json/	513	136	display
523	Kotta One	/fonts/json/	531	478	serif
754	Modern Antiqua	/fonts/json/	729	329	display
267	Just Another Hand	/fonts/json/	264	647	handwriting
713	Do Hyeon	/fonts/json/	581	2	sans-serif
561	Fenix	/fonts/json/	576	668	serif
621	Sarina	/fonts/json/	615	680	display
372	Judson	/fonts/json/	380	690	serif
824	Vollkorn SC	/fonts/json/	824	337	serif
246	Saira Condensed	/fonts/json/	247	492	sans-serif
298	Grand Hotel	/fonts/json/	303	506	handwriting
571	Flamenco	/fonts/json/	569	153	display
392	Fontdiner Swanky	/fonts/json/	398	338	display
472	Lemonada	/fonts/json/	412	359	display
601	IBM Plex Sans	/fonts/json/	591	12	sans-serif
217	Cinzel Decorative	/fonts/json/	223	28	display
611	Ruslan Display	/fonts/json/	626	527	display
581	Sura	/fonts/json/	593	32	serif
178	Khula	/fonts/json/	180	46	sans-serif
764	Almendra SC	/fonts/json/	781	534	serif
804	Asar	/fonts/json/	812	541	serif
494	Bowlby One	/fonts/json/	482	864	display
673	Diplomata	/fonts/json/	674	95	display
129	Khand	/fonts/json/	127	175	sans-serif
855	Libre Barcode 39 Extended Text	/fonts/json/	858	873	display
328	Aclonica	/fonts/json/	331	385	sans-serif
784	Odor Mean Chey	/fonts/json/	796	554	display
288	Kameron	/fonts/json/	281	696	serif
531	Cherry Cream Soda	/fonts/json/	538	187	display
236	Rambla	/fonts/json/	242	561	sans-serif
318	Fredericka the Great	/fonts/json/	318	577	display
227	Slabo 13px	/fonts/json/	225	101	serif
631	Antic Didone	/fonts/json/	613	716	serif
433	IM Fell English	/fonts/json/	434	396	serif
147	Cantarell	/fonts/json/	147	210	sans-serif
774	Galada	/fonts/json/	775	431	display
118	Kaushan Script	/fonts/json/	116	720	handwriting
401	Schoolbell	/fonts/json/	397	435	handwriting
541	Sniglet	/fonts/json/	534	729	display
591	Alike Angular	/fonts/json/	595	211	serif
693	Averia Gruesa Libre	/fonts/json/	692	731	display
724	Bigshot One	/fonts/json/	727	213	display
363	Fanwood Text	/fonts/json/	362	583	serif
865	Libre Barcode 128	/fonts/json/	865	104	display
207	Alegreya Sans SC	/fonts/json/	205	109	sans-serif
187	Antic Slab	/fonts/json/	184	590	serif
845	Hanalei	/fonts/json/	845	735	display
420	Qwigley	/fonts/json/	393	748	handwriting
308	Taviraj	/fonts/json/	310	594	serif
653	Kavoon	/fonts/json/	658	215	display
138	Sanchez	/fonts/json/	136	456	serif
278	Pinyon Script	/fonts/json/	275	612	handwriting
663	Miniver	/fonts/json/	652	467	display
383	Herr Von Muellerhoff	/fonts/json/	395	468	handwriting
256	Cousine	/fonts/json/	262	229	monospace
461	Expletus Sans	/fonts/json/	467	753	display
411	Chelsea Market	/fonts/json/	402	619	display
794	Miltonian	/fonts/json/	786	250	display
158	Shadows Into Light Two	/fonts/json/	155	273	handwriting
349	Metrophobic	/fonts/json/	346	280	sans-serif
814	GFS Neohellenic	/fonts/json/	813	762	sans-serif
744	Butcherman	/fonts/json/	742	808	display
197	Julius Sans One	/fonts/json/	201	470	sans-serif
186	Changa	/fonts/json/	115	180	sans-serif
229	Lusitana	/fonts/json/	228	183	serif
467	Cherry Swash	/fonts/json/	468	404	display
547	Headland One	/fonts/json/	551	691	serif
765	Molle	/fonts/json/	765	834	handwriting
635	Mandali	/fonts/json/	639	693	sans-serif
137	Quattrocento	/fonts/json/	137	714	serif
335	GFS Didot	/fonts/json/	326	194	serif
828	Supermercado One	/fonts/json/	831	723	display
715	Ruthie	/fonts/json/	713	582	handwriting
507	Iceland	/fonts/json/	512	730	display
219	Nothing You Could Do	/fonts/json/	224	212	handwriting
848	Preahvihear	/fonts/json/	848	854	display
367	Share Tech Mono	/fonts/json/	374	411	monospace
257	Gochi Hand	/fonts/json/	261	740	handwriting
857	Cute Font	/fonts/json/	856	9	display
674	Cormorant Unicase	/fonts/json/	625	11	serif
387	Gravitas One	/fonts/json/	396	218	display
818	IBM Plex Mono	/fonts/json/	797	15	monospace
305	Saira Semi Condensed	/fonts/json/	305	47	sans-serif
656	Overlock SC	/fonts/json/	650	858	display
146	Hind Vadodara	/fonts/json/	158	237	sans-serif
685	Swanky and Moo Moo	/fonts/json/	681	601	handwriting
156	Aldrich	/fonts/json/	160	56	sans-serif
166	Jura	/fonts/json/	167	742	sans-serif
238	Rock Salt	/fonts/json/	239	745	handwriting
425	Gafata	/fonts/json/	448	605	sans-serif
745	Chango	/fonts/json/	732	254	display
285	Marmelad	/fonts/json/	302	752	sans-serif
415	Alike	/fonts/json/	421	613	serif
596	Habibi	/fonts/json/	590	625	serif
806	Fascinate	/fonts/json/	804	267	display
357	Sue Ellen Francisco	/fonts/json/	349	277	handwriting
556	Share Tech	/fonts/json/	564	876	sans-serif
406	Balthazar	/fonts/json/	406	628	serif
796	Nova Script	/fonts/json/	801	299	display
457	Belgrano	/fonts/json/	473	631	serif
705	Snippet	/fonts/json/	700	307	sans-serif
176	Barlow Condensed	/fonts/json/	189	68	sans-serif
664	Port Lligat Sans	/fonts/json/	657	635	sans-serif
606	Almendra	/fonts/json/	608	74	serif
785	Jolly Lodger	/fonts/json/	783	419	display
487	Rye	/fonts/json/	499	754	display
616	Mrs Saint Delafield	/fonts/json/	629	436	handwriting
447	Baloo Bhaina	/fonts/json/	445	81	display
576	Pavanam	/fonts/json/	557	116	sans-serif
315	Mr Dafoe	/fonts/json/	319	445	handwriting
566	Chonburi	/fonts/json/	594	121	display
275	Saira	/fonts/json/	277	126	sans-serif
517	Cormorant Infant	/fonts/json/	543	447	serif
128	Playfair Display SC	/fonts/json/	126	644	serif
196	Sorts Mill Goudy	/fonts/json/	194	775	serif
537	Aguafina Script	/fonts/json/	548	645	handwriting
836	Dangrek	/fonts/json/	836	317	display
295	Days One	/fonts/json/	287	650	sans-serif
265	Marvel	/fonts/json/	270	651	sans-serif
585	Ramabhadra	/fonts/json/	612	812	sans-serif
437	Baloo Paaji	/fonts/json/	422	814	display
377	The Girl Next Door	/fonts/json/	377	658	handwriting
725	Ravi Prakash	/fonts/json/	731	473	display
346	Caudex	/fonts/json/	355	479	serif
497	Raleway Dots	/fonts/json/	437	128	display
325	Bowlby One SC	/fonts/json/	336	821	display
248	Michroma	/fonts/json/	251	319	sans-serif
208	Magra	/fonts/json/	202	481	sans-serif
527	NTR	/fonts/json/	521	497	sans-serif
868	Kumar One Outline	/fonts/json/	866	665	display
625	Mountains of Christmas	/fonts/json/	634	831	display
776	Astloch	/fonts/json/	766	519	display
646	Amita	/fonts/json/	643	336	handwriting
397	Zeyada	/fonts/json/	388	376	handwriting
756	Seymour One	/fonts/json/	750	676	sans-serif
735	Metal Mania	/fonts/json/	735	522	display
477	Amiko	/fonts/json/	465	538	sans-serif
694	Galindo	/fonts/json/	676	549	display
119	Quattrocento Sans	/fonts/json/	118	578	sans-serif
795	Geostar Fill	/fonts/json/	798	626	display
59	Cormorant Garamond	/fonts/json/	59	196	serif
271	Cormorant	/fonts/json/	272	206	serif
282	Carme	/fonts/json/	283	600	sans-serif
393	David Libre	/fonts/json/	523	138	serif
684	Redressed	/fonts/json/	688	532	handwriting
403	Artifika	/fonts/json/	400	82	serif
714	Gugi	/fonts/json/	721	5	display
292	Ceviche One	/fonts/json/	288	702	display
826	Londrina Sketch	/fonts/json/	823	776	display
554	Englebert	/fonts/json/	547	29	sans-serif
766	Chicle	/fonts/json/	762	862	display
839	Gorditas	/fonts/json/	838	703	display
73	Cairo	/fonts/json/	72	604	sans-serif
218	Forum	/fonts/json/	220	513	display
422	Belleza	/fonts/json/	411	649	sans-serif
54	Exo	/fonts/json/	56	44	sans-serif
312	Allerta	/fonts/json/	321	297	sans-serif
695	Akronim	/fonts/json/	698	383	display
373	Strait	/fonts/json/	399	58	sans-serif
604	Sancreek	/fonts/json/	609	721	display
81	PT Sans Caption	/fonts/json/	87	623	sans-serif
534	Voces	/fonts/json/	526	446	display
573	Cormorant SC	/fonts/json/	579	92	serif
169	Neucha	/fonts/json/	166	566	handwriting
726	Barrio	/fonts/json/	757	40	display
322	Martel Sans	/fonts/json/	315	570	sans-serif
502	Delius Swash Caps	/fonts/json/	501	732	handwriting
261	Squada One	/fonts/json/	265	84	display
432	Lekton	/fonts/json/	431	765	sans-serif
634	Hi Melody	/fonts/json/	659	51	handwriting
179	Architects Daughter	/fonts/json/	186	298	handwriting
382	Spectral	/fonts/json/	373	309	serif
120	Istok Web	/fonts/json/	123	261	sans-serif
139	Caveat	/fonts/json/	141	375	handwriting
33	Exo 2	/fonts/json/	34	98	sans-serif
130	Handlee	/fonts/json/	134	162	handwriting
7	Source Sans Pro	/fonts/json/	7	412	sans-serif
543	Medula One	/fonts/json/	542	380	display
61	Asap	/fonts/json/	61	332	sans-serif
228	Skranji	/fonts/json/	226	8	display
512	Dawning of a New Day	/fonts/json/	510	281	handwriting
189	PT Mono	/fonts/json/	197	557	monospace
704	Sree Krushnadevaraya	/fonts/json/	664	69	serif
24	PT Sans Narrow	/fonts/json/	24	192	sans-serif
844	Geostar	/fonts/json/	844	423	display
443	Averia Serif Libre	/fonts/json/	449	817	display
462	Short Stack	/fonts/json/	452	778	handwriting
593	Koulen	/fonts/json/	605	19	display
251	PT Serif Caption	/fonts/json/	249	787	serif
302	Zilla Slab	/fonts/json/	295	727	serif
854	Bungee Hairline	/fonts/json/	854	761	display
644	Baloo Bhai	/fonts/json/	637	320	display
755	Siemreap	/fonts/json/	760	25	display
623	Kite One	/fonts/json/	621	571	sans-serif
209	Share	/fonts/json/	192	231	display
746	Overpass Mono	/fonts/json/	767	521	monospace
614	Inika	/fonts/json/	673	832	serif
344	Bungee Inline	/fonts/json/	350	166	display
492	Patrick Hand SC	/fonts/json/	491	792	handwriting
55	Nunito Sans	/fonts/json/	54	248	sans-serif
354	Cutive	/fonts/json/	345	441	serif
666	Tajawal	/fonts/json/	669	4	sans-serif
6	Oswald	/fonts/json/	6	603	sans-serif
23	Muli	/fonts/json/	23	335	sans-serif
471	Maitree	/fonts/json/	493	769	serif
775	Margarine	/fonts/json/	745	158	display
69	Archivo Narrow	/fonts/json/	69	820	sans-serif
805	Combo	/fonts/json/	810	246	display
362	Petit Formal Script	/fonts/json/	365	284	handwriting
149	Tangerine	/fonts/json/	151	558	handwriting
159	Neuton	/fonts/json/	159	392	serif
736	Jomhuria	/fonts/json/	738	193	display
480	Metamorphous	/fonts/json/	478	53	display
817	Miss Fajardose	/fonts/json/	816	616	handwriting
85	Cuprum	/fonts/json/	88	444	sans-serif
654	Stint Ultra Condensed	/fonts/json/	647	344	display
239	Syncopate	/fonts/json/	243	197	sans-serif
453	Crafty Girls	/fonts/json/	453	157	handwriting
564	Stint Ultra Expanded	/fonts/json/	554	276	display
874	Song Myung	/fonts/json/	875	163	serif
864	BioRhyme Expanded	/fonts/json/	864	227	serif
199	Covered By Your Grace	/fonts/json/	199	351	handwriting
522	Krona One	/fonts/json/	518	847	sans-serif
675	Offside	/fonts/json/	678	622	display
413	Oregano	/fonts/json/	417	653	display
332	Tauri	/fonts/json/	328	454	sans-serif
584	Sail	/fonts/json/	582	285	display
786	Warnes	/fonts/json/	791	167	display
\.


--
-- Data for Name: font_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.font_history (history_id, font_id, rank, trending_rank, "time") FROM stdin;
1	1	1	\N	2018-04-30 09:05:26.131887
2	2	2	\N	2018-04-30 09:05:26.251894
3	3	3	\N	2018-04-30 09:05:26.254894
4	4	4	\N	2018-04-30 09:05:26.257894
5	5	5	\N	2018-04-30 09:05:26.260894
6	6	6	\N	2018-04-30 09:05:26.261894
7	7	7	\N	2018-04-30 09:05:26.261894
8	8	8	\N	2018-04-30 09:05:26.262894
9	9	9	\N	2018-04-30 09:05:26.262894
10	10	10	\N	2018-04-30 09:05:26.263894
11	11	11	\N	2018-04-30 09:05:26.268895
12	12	12	\N	2018-04-30 09:05:26.272895
13	13	13	\N	2018-04-30 09:05:26.273895
14	14	14	\N	2018-04-30 09:05:26.275895
15	16	16	\N	2018-04-30 09:05:26.277895
16	15	15	\N	2018-04-30 09:05:26.278895
17	18	17	\N	2018-04-30 09:05:26.279895
18	19	19	\N	2018-04-30 09:05:26.279895
19	20	20	\N	2018-04-30 09:05:26.282895
20	21	21	\N	2018-04-30 09:05:26.283895
21	17	18	\N	2018-04-30 09:05:26.284895
22	22	22	\N	2018-04-30 09:05:26.286896
23	23	23	\N	2018-04-30 09:05:26.286896
24	24	24	\N	2018-04-30 09:05:26.288896
25	25	25	\N	2018-04-30 09:05:26.288896
26	26	26	\N	2018-04-30 09:05:26.289896
27	27	27	\N	2018-04-30 09:05:26.290896
28	28	28	\N	2018-04-30 09:05:26.290896
29	34	30	\N	2018-04-30 09:05:26.291896
30	31	31	\N	2018-04-30 09:05:26.291896
31	29	29	\N	2018-04-30 09:05:26.292896
32	32	33	\N	2018-04-30 09:05:26.292896
33	30	32	\N	2018-04-30 09:05:26.294896
34	33	34	\N	2018-04-30 09:05:26.296896
35	36	36	\N	2018-04-30 09:05:26.296896
36	35	35	\N	2018-04-30 09:05:26.297896
37	37	37	\N	2018-04-30 09:05:26.297896
38	39	40	\N	2018-04-30 09:05:26.298896
39	40	39	\N	2018-04-30 09:05:26.298896
40	38	38	\N	2018-04-30 09:05:26.299896
41	42	41	\N	2018-04-30 09:05:26.300896
42	41	43	\N	2018-04-30 09:05:26.300896
43	43	42	\N	2018-04-30 09:05:26.301896
44	44	44	\N	2018-04-30 09:05:26.302896
45	48	47	\N	2018-04-30 09:05:26.302896
46	47	46	\N	2018-04-30 09:05:26.303897
47	45	45	\N	2018-04-30 09:05:26.303897
48	49	49	\N	2018-04-30 09:05:26.304897
49	46	48	\N	2018-04-30 09:05:26.304897
50	50	50	\N	2018-04-30 09:05:26.304897
51	52	52	\N	2018-04-30 09:05:26.305897
52	51	51	\N	2018-04-30 09:05:26.305897
53	53	53	\N	2018-04-30 09:05:26.306897
54	55	55	\N	2018-04-30 09:05:26.306897
55	56	56	\N	2018-04-30 09:05:26.307897
56	54	54	\N	2018-04-30 09:05:26.307897
57	58	57	\N	2018-04-30 09:05:26.308897
58	57	58	\N	2018-04-30 09:05:26.308897
59	59	59	\N	2018-04-30 09:05:26.308897
60	66	67	\N	2018-04-30 09:05:26.309897
61	61	61	\N	2018-04-30 09:05:26.309897
62	60	60	\N	2018-04-30 09:05:26.309897
63	62	62	\N	2018-04-30 09:05:26.310897
64	63	63	\N	2018-04-30 09:05:26.310897
65	64	64	\N	2018-04-30 09:05:26.312897
66	65	65	\N	2018-04-30 09:05:26.318897
67	68	66	\N	2018-04-30 09:05:26.318897
68	67	68	\N	2018-04-30 09:05:26.319897
69	69	69	\N	2018-04-30 09:05:26.322898
70	70	70	\N	2018-04-30 09:05:26.323898
71	71	71	\N	2018-04-30 09:05:26.324898
72	73	74	\N	2018-04-30 09:05:26.328898
73	78	78	\N	2018-04-30 09:05:26.328898
74	79	79	\N	2018-04-30 09:05:26.329898
75	77	77	\N	2018-04-30 09:05:26.330898
76	74	72	\N	2018-04-30 09:05:26.330898
77	76	76	\N	2018-04-30 09:05:26.331898
78	72	73	\N	2018-04-30 09:05:26.332898
79	75	75	\N	2018-04-30 09:05:26.332898
80	80	80	\N	2018-04-30 09:05:26.332898
81	82	82	\N	2018-04-30 09:05:26.332898
82	87	87	\N	2018-04-30 09:05:26.333898
83	84	84	\N	2018-04-30 09:05:26.333898
84	83	83	\N	2018-04-30 09:05:26.333898
85	86	86	\N	2018-04-30 09:05:26.334898
86	89	89	\N	2018-04-30 09:05:26.334898
87	81	81	\N	2018-04-30 09:05:26.336898
88	85	85	\N	2018-04-30 09:05:26.336898
89	90	90	\N	2018-04-30 09:05:26.336898
90	91	91	\N	2018-04-30 09:05:26.337898
91	92	92	\N	2018-04-30 09:05:26.337898
92	88	88	\N	2018-04-30 09:05:26.338899
93	94	94	\N	2018-04-30 09:05:26.338899
94	95	95	\N	2018-04-30 09:05:26.338899
95	98	98	\N	2018-04-30 09:05:26.339899
96	100	100	\N	2018-04-30 09:05:26.340899
97	104	104	\N	2018-04-30 09:05:26.340899
98	103	103	\N	2018-04-30 09:05:26.341899
99	97	97	\N	2018-04-30 09:05:26.341899
100	101	101	\N	2018-04-30 09:05:26.341899
101	93	93	\N	2018-04-30 09:05:26.342899
102	96	96	\N	2018-04-30 09:05:26.342899
103	102	102	\N	2018-04-30 09:05:26.343899
104	99	99	\N	2018-04-30 09:05:26.343899
105	106	106	\N	2018-04-30 09:05:26.343899
106	108	108	\N	2018-04-30 09:05:26.343899
107	112	112	\N	2018-04-30 09:05:26.344899
108	107	107	\N	2018-04-30 09:05:26.344899
109	113	113	\N	2018-04-30 09:05:26.344899
110	111	111	\N	2018-04-30 09:05:26.345899
111	109	109	\N	2018-04-30 09:05:26.345899
112	114	114	\N	2018-04-30 09:05:26.345899
113	115	115	\N	2018-04-30 09:05:26.346899
114	110	110	\N	2018-04-30 09:05:26.346899
115	186	186	\N	2018-04-30 09:05:26.346899
116	118	118	\N	2018-04-30 09:05:26.346899
117	117	117	\N	2018-04-30 09:05:26.348899
118	119	119	\N	2018-04-30 09:05:26.348899
119	124	124	\N	2018-04-30 09:05:26.348899
120	122	122	\N	2018-04-30 09:05:26.348899
121	116	116	\N	2018-04-30 09:05:26.349899
122	121	121	\N	2018-04-30 09:05:26.350899
123	120	120	\N	2018-04-30 09:05:26.351899
124	126	126	\N	2018-04-30 09:05:26.351899
125	105	105	\N	2018-04-30 09:05:26.351899
126	128	128	\N	2018-04-30 09:05:26.351899
127	129	129	\N	2018-04-30 09:05:26.352899
128	123	123	\N	2018-04-30 09:05:26.352899
129	125	125	\N	2018-04-30 09:05:26.352899
130	127	127	\N	2018-04-30 09:05:26.353899
131	131	131	\N	2018-04-30 09:05:26.353899
132	133	133	\N	2018-04-30 09:05:26.354899
133	134	134	\N	2018-04-30 09:05:26.354899
134	130	130	\N	2018-04-30 09:05:26.354899
135	132	132	\N	2018-04-30 09:05:26.354899
136	138	138	\N	2018-04-30 09:05:26.3559
137	137	137	\N	2018-04-30 09:05:26.3559
138	135	135	\N	2018-04-30 09:05:26.3579
139	140	140	\N	2018-04-30 09:05:26.3579
140	136	136	\N	2018-04-30 09:05:26.3579
141	139	139	\N	2018-04-30 09:05:26.3589
142	143	143	\N	2018-04-30 09:05:26.3589
143	142	142	\N	2018-04-30 09:05:26.3599
144	144	144	\N	2018-04-30 09:05:26.3599
145	155	155	\N	2018-04-30 09:05:26.3599
146	154	154	\N	2018-04-30 09:05:26.3609
147	147	147	\N	2018-04-30 09:05:26.3609
148	337	337	\N	2018-04-30 09:05:26.3619
149	141	141	\N	2018-04-30 09:05:26.3619
150	145	145	\N	2018-04-30 09:05:26.3619
151	149	149	\N	2018-04-30 09:05:26.3619
152	152	152	\N	2018-04-30 09:05:26.3639
153	150	150	\N	2018-04-30 09:05:26.3639
154	148	148	\N	2018-04-30 09:05:26.3639
155	158	158	\N	2018-04-30 09:05:26.3649
156	151	151	\N	2018-04-30 09:05:26.3649
157	164	164	\N	2018-04-30 09:05:26.3659
158	146	146	\N	2018-04-30 09:05:26.3659
169	170	170	\N	2018-04-30 09:05:26.3699
208	210	210	\N	2018-04-30 09:05:26.384901
218	213	213	\N	2018-04-30 09:05:26.388901
223	217	217	\N	2018-04-30 09:05:26.389901
233	233	233	\N	2018-04-30 09:05:26.392902
238	241	241	\N	2018-04-30 09:05:26.394902
243	239	239	\N	2018-04-30 09:05:26.395902
248	240	240	\N	2018-04-30 09:05:26.397902
283	282	282	\N	2018-04-30 09:05:26.407902
288	292	292	\N	2018-04-30 09:05:26.408903
293	279	279	\N	2018-04-30 09:05:26.410903
313	320	320	\N	2018-04-30 09:05:26.416903
318	318	318	\N	2018-04-30 09:05:26.417903
323	338	338	\N	2018-04-30 09:05:26.419903
328	332	332	\N	2018-04-30 09:05:26.420903
333	339	339	\N	2018-04-30 09:05:26.422903
338	345	345	\N	2018-04-30 09:05:26.423903
348	347	347	\N	2018-04-30 09:05:26.426904
353	353	353	\N	2018-04-30 09:05:26.428904
368	317	317	\N	2018-04-30 09:05:26.432904
379	375	375	\N	2018-04-30 09:05:26.435904
384	395	395	\N	2018-04-30 09:05:26.436904
389	391	391	\N	2018-04-30 09:05:26.438904
394	389	389	\N	2018-04-30 09:05:26.440904
399	373	373	\N	2018-04-30 09:05:26.441904
404	400	400	\N	2018-04-30 09:05:26.443905
409	390	390	\N	2018-04-30 09:05:26.444905
414	414	414	\N	2018-04-30 09:05:26.446905
439	441	441	\N	2018-04-30 09:05:26.455905
448	425	425	\N	2018-04-30 09:05:26.458905
457	470	470	\N	2018-04-30 09:05:26.460906
488	483	483	\N	2018-04-30 09:05:26.469906
503	499	499	\N	2018-04-30 09:05:26.474906
537	533	533	\N	2018-04-30 09:05:26.483907
548	537	537	\N	2018-04-30 09:05:26.486907
563	560	560	\N	2018-04-30 09:05:26.491907
573	574	574	\N	2018-04-30 09:05:26.494907
588	589	589	\N	2018-04-30 09:05:26.497908
601	617	617	\N	2018-04-30 09:05:26.501908
611	626	626	\N	2018-04-30 09:05:26.504908
621	623	623	\N	2018-04-30 09:05:26.507908
631	637	637	\N	2018-04-30 09:05:26.510908
641	640	640	\N	2018-04-30 09:05:26.512909
651	649	649	\N	2018-04-30 09:05:26.515909
661	639	639	\N	2018-04-30 09:05:26.517909
671	647	647	\N	2018-04-30 09:05:26.520909
681	685	685	\N	2018-04-30 09:05:26.523909
695	703	703	\N	2018-04-30 09:05:26.527909
705	692	692	\N	2018-04-30 09:05:26.53091
710	706	706	\N	2018-04-30 09:05:26.53191
727	724	724	\N	2018-04-30 09:05:26.53691
748	747	747	\N	2018-04-30 09:05:26.54291
777	768	768	\N	2018-04-30 09:05:26.551911
790	779	779	\N	2018-04-30 09:05:26.555911
800	800	800	\N	2018-04-30 09:05:26.558911
810	805	805	\N	2018-04-30 09:05:26.560911
820	822	822	\N	2018-04-30 09:05:26.563911
841	841	841	\N	2018-04-30 09:05:26.568912
846	846	846	\N	2018-04-30 09:05:26.570912
857	862	862	\N	2018-04-30 09:05:26.573912
877	877	877	\N	2018-04-30 09:05:26.578912
159	159	159	\N	2018-04-30 09:05:26.3659
164	157	157	\N	2018-04-30 09:05:26.3679
174	180	180	\N	2018-04-30 09:05:26.3719
179	167	167	\N	2018-04-30 09:05:26.3729
184	187	187	\N	2018-04-30 09:05:26.374901
189	176	176	\N	2018-04-30 09:05:26.375901
194	196	196	\N	2018-04-30 09:05:26.377901
199	199	199	\N	2018-04-30 09:05:26.380901
204	194	194	\N	2018-04-30 09:05:26.382901
390	410	410	\N	2018-04-30 09:05:26.439904
395	383	383	\N	2018-04-30 09:05:26.440904
400	403	403	\N	2018-04-30 09:05:26.442904
405	409	409	\N	2018-04-30 09:05:26.443905
410	419	419	\N	2018-04-30 09:05:26.445905
415	378	378	\N	2018-04-30 09:05:26.446905
420	423	423	\N	2018-04-30 09:05:26.448905
425	427	427	\N	2018-04-30 09:05:26.449905
430	446	446	\N	2018-04-30 09:05:26.451905
677	679	679	\N	2018-04-30 09:05:26.522909
687	676	676	\N	2018-04-30 09:05:26.525909
702	720	720	\N	2018-04-30 09:05:26.529909
712	708	708	\N	2018-04-30 09:05:26.53191
726	721	721	\N	2018-04-30 09:05:26.53691
731	725	725	\N	2018-04-30 09:05:26.53891
747	734	734	\N	2018-04-30 09:05:26.54291
751	759	759	\N	2018-04-30 09:05:26.54391
766	776	776	\N	2018-04-30 09:05:26.548911
771	771	771	\N	2018-04-30 09:05:26.549911
776	782	782	\N	2018-04-30 09:05:26.550911
781	764	764	\N	2018-04-30 09:05:26.552911
786	794	794	\N	2018-04-30 09:05:26.553911
792	797	797	\N	2018-04-30 09:05:26.555911
803	819	819	\N	2018-04-30 09:05:26.558911
808	810	810	\N	2018-04-30 09:05:26.559911
817	812	812	\N	2018-04-30 09:05:26.562911
827	825	825	\N	2018-04-30 09:05:26.564911
831	828	828	\N	2018-04-30 09:05:26.566912
842	838	838	\N	2018-04-30 09:05:26.568912
851	853	853	\N	2018-04-30 09:05:26.571912
861	863	863	\N	2018-04-30 09:05:26.574912
876	876	876	\N	2018-04-30 09:05:26.578912
160	156	156	\N	2018-04-30 09:05:26.3659
165	177	177	\N	2018-04-30 09:05:26.3679
330	327	327	\N	2018-04-30 09:05:26.421903
335	324	324	\N	2018-04-30 09:05:26.423903
340	333	333	\N	2018-04-30 09:05:26.424903
345	354	354	\N	2018-04-30 09:05:26.426904
362	363	363	\N	2018-04-30 09:05:26.430904
367	376	376	\N	2018-04-30 09:05:26.432904
378	370	370	\N	2018-04-30 09:05:26.435904
388	397	397	\N	2018-04-30 09:05:26.438904
393	420	420	\N	2018-04-30 09:05:26.440904
398	392	392	\N	2018-04-30 09:05:26.441904
403	386	386	\N	2018-04-30 09:05:26.442904
408	412	412	\N	2018-04-30 09:05:26.444905
419	404	404	\N	2018-04-30 09:05:26.447905
424	398	398	\N	2018-04-30 09:05:26.449905
429	436	436	\N	2018-04-30 09:05:26.450905
434	433	433	\N	2018-04-30 09:05:26.453905
444	424	424	\N	2018-04-30 09:05:26.456905
449	443	443	\N	2018-04-30 09:05:26.458905
454	449	449	\N	2018-04-30 09:05:26.460906
459	451	451	\N	2018-04-30 09:05:26.461906
464	468	468	\N	2018-04-30 09:05:26.462906
469	459	459	\N	2018-04-30 09:05:26.464906
474	476	476	\N	2018-04-30 09:05:26.466906
479	485	485	\N	2018-04-30 09:05:26.467906
484	489	489	\N	2018-04-30 09:05:26.468906
489	464	464	\N	2018-04-30 09:05:26.470906
494	481	481	\N	2018-04-30 09:05:26.471906
499	487	487	\N	2018-04-30 09:05:26.473906
504	504	504	\N	2018-04-30 09:05:26.474906
509	544	544	\N	2018-04-30 09:05:26.475906
514	510	510	\N	2018-04-30 09:05:26.477906
519	516	516	\N	2018-04-30 09:05:26.478907
524	520	520	\N	2018-04-30 09:05:26.480907
529	524	524	\N	2018-04-30 09:05:26.481907
534	541	541	\N	2018-04-30 09:05:26.482907
539	532	532	\N	2018-04-30 09:05:26.484907
544	521	521	\N	2018-04-30 09:05:26.485907
549	548	548	\N	2018-04-30 09:05:26.486907
554	564	564	\N	2018-04-30 09:05:26.488907
559	538	538	\N	2018-04-30 09:05:26.489907
560	549	549	\N	2018-04-30 09:05:26.490907
565	565	565	\N	2018-04-30 09:05:26.492907
576	561	561	\N	2018-04-30 09:05:26.494907
586	602	602	\N	2018-04-30 09:05:26.497908
591	601	601	\N	2018-04-30 09:05:26.498908
607	608	608	\N	2018-04-30 09:05:26.503908
617	615	615	\N	2018-04-30 09:05:26.506908
622	624	624	\N	2018-04-30 09:05:26.507908
628	622	622	\N	2018-04-30 09:05:26.509908
647	654	654	\N	2018-04-30 09:05:26.514909
668	667	667	\N	2018-04-30 09:05:26.519909
673	614	614	\N	2018-04-30 09:05:26.520909
765	765	765	\N	2018-04-30 09:05:26.547911
770	757	757	\N	2018-04-30 09:05:26.549911
775	774	774	\N	2018-04-30 09:05:26.550911
793	783	783	\N	2018-04-30 09:05:26.556911
798	795	795	\N	2018-04-30 09:05:26.557911
809	801	801	\N	2018-04-30 09:05:26.560911
819	821	821	\N	2018-04-30 09:05:26.562911
824	824	824	\N	2018-04-30 09:05:26.563911
829	829	829	\N	2018-04-30 09:05:26.565912
834	834	834	\N	2018-04-30 09:05:26.566912
839	840	840	\N	2018-04-30 09:05:26.568912
844	844	844	\N	2018-04-30 09:05:26.569912
849	852	852	\N	2018-04-30 09:05:26.570912
161	162	162	\N	2018-04-30 09:05:26.3669
166	169	169	\N	2018-04-30 09:05:26.3689
171	171	171	\N	2018-04-30 09:05:26.3709
176	175	175	\N	2018-04-30 09:05:26.3719
181	188	188	\N	2018-04-30 09:05:26.373901
186	179	179	\N	2018-04-30 09:05:26.374901
191	192	192	\N	2018-04-30 09:05:26.376901
196	206	206	\N	2018-04-30 09:05:26.377901
201	197	197	\N	2018-04-30 09:05:26.380901
206	201	201	\N	2018-04-30 09:05:26.383901
211	225	225	\N	2018-04-30 09:05:26.385901
217	223	223	\N	2018-04-30 09:05:26.387901
222	200	200	\N	2018-04-30 09:05:26.389901
227	224	224	\N	2018-04-30 09:05:26.390902
247	246	246	\N	2018-04-30 09:05:26.397902
252	250	250	\N	2018-04-30 09:05:26.398902
257	254	254	\N	2018-04-30 09:05:26.399902
262	256	256	\N	2018-04-30 09:05:26.401902
267	268	268	\N	2018-04-30 09:05:26.402902
277	275	275	\N	2018-04-30 09:05:26.405902
282	290	290	\N	2018-04-30 09:05:26.407902
287	295	295	\N	2018-04-30 09:05:26.408903
292	289	289	\N	2018-04-30 09:05:26.410903
297	277	277	\N	2018-04-30 09:05:26.411903
302	285	285	\N	2018-04-30 09:05:26.413903
307	297	297	\N	2018-04-30 09:05:26.414903
312	316	316	\N	2018-04-30 09:05:26.415903
317	329	329	\N	2018-04-30 09:05:26.417903
341	343	343	\N	2018-04-30 09:05:26.424903
346	349	349	\N	2018-04-30 09:05:26.426904
351	355	355	\N	2018-04-30 09:05:26.427904
356	356	356	\N	2018-04-30 09:05:26.429904
365	362	362	\N	2018-04-30 09:05:26.431904
375	379	379	\N	2018-04-30 09:05:26.434904
380	372	372	\N	2018-04-30 09:05:26.435904
385	388	388	\N	2018-04-30 09:05:26.437904
391	399	399	\N	2018-04-30 09:05:26.439904
401	407	407	\N	2018-04-30 09:05:26.442904
411	422	422	\N	2018-04-30 09:05:26.445905
421	415	415	\N	2018-04-30 09:05:26.448905
437	497	497	\N	2018-04-30 09:05:26.454905
442	444	444	\N	2018-04-30 09:05:26.456905
447	438	438	\N	2018-04-30 09:05:26.457905
451	439	439	\N	2018-04-30 09:05:26.459905
462	440	440	\N	2018-04-30 09:05:26.462906
473	457	457	\N	2018-04-30 09:05:26.465906
483	473	473	\N	2018-04-30 09:05:26.468906
497	482	482	\N	2018-04-30 09:05:26.472906
506	495	495	\N	2018-04-30 09:05:26.475906
511	511	511	\N	2018-04-30 09:05:26.476906
522	514	514	\N	2018-04-30 09:05:26.479907
532	508	508	\N	2018-04-30 09:05:26.482907
547	554	554	\N	2018-04-30 09:05:26.486907
557	576	576	\N	2018-04-30 09:05:26.489907
570	570	570	\N	2018-04-30 09:05:26.493907
575	575	575	\N	2018-04-30 09:05:26.494907
585	619	619	\N	2018-04-30 09:05:26.497908
595	591	591	\N	2018-04-30 09:05:26.499908
606	598	598	\N	2018-04-30 09:05:26.502908
616	592	592	\N	2018-04-30 09:05:26.505908
626	611	611	\N	2018-04-30 09:05:26.508908
636	645	645	\N	2018-04-30 09:05:26.511908
646	648	648	\N	2018-04-30 09:05:26.513909
656	651	651	\N	2018-04-30 09:05:26.516909
666	652	652	\N	2018-04-30 09:05:26.519909
688	684	684	\N	2018-04-30 09:05:26.525909
703	712	712	\N	2018-04-30 09:05:26.529909
713	715	715	\N	2018-04-30 09:05:26.53191
718	717	717	\N	2018-04-30 09:05:26.53491
736	731	731	\N	2018-04-30 09:05:26.53991
746	752	752	\N	2018-04-30 09:05:26.54291
757	726	726	\N	2018-04-30 09:05:26.54591
761	758	758	\N	2018-04-30 09:05:26.54691
767	746	746	\N	2018-04-30 09:05:26.548911
772	761	761	\N	2018-04-30 09:05:26.549911
797	818	818	\N	2018-04-30 09:05:26.557911
802	799	799	\N	2018-04-30 09:05:26.558911
807	815	815	\N	2018-04-30 09:05:26.559911
811	811	811	\N	2018-04-30 09:05:26.560911
821	813	813	\N	2018-04-30 09:05:26.563911
836	836	836	\N	2018-04-30 09:05:26.567912
850	850	850	\N	2018-04-30 09:05:26.571912
855	849	849	\N	2018-04-30 09:05:26.572912
860	861	861	\N	2018-04-30 09:05:26.574912
865	865	865	\N	2018-04-30 09:05:26.575912
870	870	870	\N	2018-04-30 09:05:26.576912
875	874	874	\N	2018-04-30 09:05:26.578912
162	161	161	\N	2018-04-30 09:05:26.3669
167	166	166	\N	2018-04-30 09:05:26.3699
172	163	163	\N	2018-04-30 09:05:26.3709
177	184	184	\N	2018-04-30 09:05:26.3729
182	193	193	\N	2018-04-30 09:05:26.373901
187	174	174	\N	2018-04-30 09:05:26.375901
192	209	209	\N	2018-04-30 09:05:26.376901
197	189	189	\N	2018-04-30 09:05:26.379901
202	208	208	\N	2018-04-30 09:05:26.382901
207	195	195	\N	2018-04-30 09:05:26.384901
212	205	205	\N	2018-04-30 09:05:26.386901
337	334	334	\N	2018-04-30 09:05:26.423903
350	344	344	\N	2018-04-30 09:05:26.427904
355	346	346	\N	2018-04-30 09:05:26.429904
360	360	360	\N	2018-04-30 09:05:26.430904
370	385	385	\N	2018-04-30 09:05:26.433904
381	374	374	\N	2018-04-30 09:05:26.436904
392	405	405	\N	2018-04-30 09:05:26.439904
407	394	394	\N	2018-04-30 09:05:26.444905
412	472	472	\N	2018-04-30 09:05:26.445905
417	413	413	\N	2018-04-30 09:05:26.447905
422	437	437	\N	2018-04-30 09:05:26.448905
435	429	429	\N	2018-04-30 09:05:26.454905
440	442	442	\N	2018-04-30 09:05:26.455905
446	445	445	\N	2018-04-30 09:05:26.457905
456	455	455	\N	2018-04-30 09:05:26.460906
461	479	479	\N	2018-04-30 09:05:26.462906
466	539	539	\N	2018-04-30 09:05:26.463906
471	509	509	\N	2018-04-30 09:05:26.465906
476	484	484	\N	2018-04-30 09:05:26.466906
481	540	540	\N	2018-04-30 09:05:26.468906
492	478	478	\N	2018-04-30 09:05:26.471906
502	505	505	\N	2018-04-30 09:05:26.474906
507	460	460	\N	2018-04-30 09:05:26.475906
512	507	507	\N	2018-04-30 09:05:26.476906
517	555	555	\N	2018-04-30 09:05:26.478907
527	526	526	\N	2018-04-30 09:05:26.481907
538	531	531	\N	2018-04-30 09:05:26.484907
561	559	559	\N	2018-04-30 09:05:26.490907
578	579	579	\N	2018-04-30 09:05:26.495908
583	586	586	\N	2018-04-30 09:05:26.496908
593	581	581	\N	2018-04-30 09:05:26.499908
604	618	618	\N	2018-04-30 09:05:26.502908
609	604	604	\N	2018-04-30 09:05:26.503908
614	620	620	\N	2018-04-30 09:05:26.505908
619	613	613	\N	2018-04-30 09:05:26.506908
624	632	632	\N	2018-04-30 09:05:26.508908
629	616	616	\N	2018-04-30 09:05:26.509908
634	625	625	\N	2018-04-30 09:05:26.510908
639	635	635	\N	2018-04-30 09:05:26.511908
644	627	627	\N	2018-04-30 09:05:26.513909
649	680	680	\N	2018-04-30 09:05:26.514909
654	486	486	\N	2018-04-30 09:05:26.515909
659	634	634	\N	2018-04-30 09:05:26.517909
664	704	704	\N	2018-04-30 09:05:26.518909
669	666	666	\N	2018-04-30 09:05:26.519909
674	673	673	\N	2018-04-30 09:05:26.521909
675	677	677	\N	2018-04-30 09:05:26.521909
680	660	660	\N	2018-04-30 09:05:26.523909
691	709	709	\N	2018-04-30 09:05:26.526909
707	696	696	\N	2018-04-30 09:05:26.53091
723	718	718	\N	2018-04-30 09:05:26.53591
799	787	787	\N	2018-04-30 09:05:26.557911
804	806	806	\N	2018-04-30 09:05:26.558911
814	802	802	\N	2018-04-30 09:05:26.561911
853	856	856	\N	2018-04-30 09:05:26.572912
858	855	855	\N	2018-04-30 09:05:26.573912
863	860	860	\N	2018-04-30 09:05:26.574912
868	869	869	\N	2018-04-30 09:05:26.576912
873	873	873	\N	2018-04-30 09:05:26.577912
163	153	153	\N	2018-04-30 09:05:26.3679
168	160	160	\N	2018-04-30 09:05:26.3699
173	191	191	\N	2018-04-30 09:05:26.3709
188	165	165	\N	2018-04-30 09:05:26.375901
198	198	198	\N	2018-04-30 09:05:26.379901
209	204	204	\N	2018-04-30 09:05:26.384901
214	214	214	\N	2018-04-30 09:05:26.386901
219	220	220	\N	2018-04-30 09:05:26.388901
224	219	219	\N	2018-04-30 09:05:26.390902
229	226	226	\N	2018-04-30 09:05:26.391902
234	235	235	\N	2018-04-30 09:05:26.392902
239	238	238	\N	2018-04-30 09:05:26.394902
244	242	242	\N	2018-04-30 09:05:26.396902
249	251	251	\N	2018-04-30 09:05:26.397902
254	234	234	\N	2018-04-30 09:05:26.399902
259	273	273	\N	2018-04-30 09:05:26.400902
264	267	267	\N	2018-04-30 09:05:26.401902
269	259	259	\N	2018-04-30 09:05:26.403902
274	287	287	\N	2018-04-30 09:05:26.404902
279	264	264	\N	2018-04-30 09:05:26.406902
284	284	284	\N	2018-04-30 09:05:26.407902
289	300	300	\N	2018-04-30 09:05:26.409903
294	286	286	\N	2018-04-30 09:05:26.410903
299	326	326	\N	2018-04-30 09:05:26.412903
304	299	299	\N	2018-04-30 09:05:26.413903
309	310	310	\N	2018-04-30 09:05:26.415903
314	309	309	\N	2018-04-30 09:05:26.416903
319	315	315	\N	2018-04-30 09:05:26.417903
324	336	336	\N	2018-04-30 09:05:26.419903
329	365	365	\N	2018-04-30 09:05:26.420903
349	357	357	\N	2018-04-30 09:05:26.426904
354	266	266	\N	2018-04-30 09:05:26.428904
372	364	364	\N	2018-04-30 09:05:26.433904
382	434	434	\N	2018-04-30 09:05:26.436904
397	401	401	\N	2018-04-30 09:05:26.441904
402	411	411	\N	2018-04-30 09:05:26.442904
427	426	426	\N	2018-04-30 09:05:26.450905
441	498	498	\N	2018-04-30 09:05:26.456905
445	447	447	\N	2018-04-30 09:05:26.457905
450	452	452	\N	2018-04-30 09:05:26.458905
567	572	572	\N	2018-04-30 09:05:26.492907
572	578	578	\N	2018-04-30 09:05:26.493907
577	577	577	\N	2018-04-30 09:05:26.495908
587	595	595	\N	2018-04-30 09:05:26.497908
592	599	599	\N	2018-04-30 09:05:26.499908
597	600	600	\N	2018-04-30 09:05:26.500908
602	594	594	\N	2018-04-30 09:05:26.501908
612	585	585	\N	2018-04-30 09:05:26.504908
623	603	603	\N	2018-04-30 09:05:26.507908
627	642	642	\N	2018-04-30 09:05:26.508908
632	633	633	\N	2018-04-30 09:05:26.510908
642	580	580	\N	2018-04-30 09:05:26.512909
652	663	663	\N	2018-04-30 09:05:26.515909
662	662	662	\N	2018-04-30 09:05:26.518909
672	672	672	\N	2018-04-30 09:05:26.520909
685	669	669	\N	2018-04-30 09:05:26.524909
690	690	690	\N	2018-04-30 09:05:26.526909
700	705	705	\N	2018-04-30 09:05:26.528909
711	678	678	\N	2018-04-30 09:05:26.53191
716	681	681	\N	2018-04-30 09:05:26.53391
721	714	714	\N	2018-04-30 09:05:26.53591
730	739	739	\N	2018-04-30 09:05:26.53791
735	735	735	\N	2018-04-30 09:05:26.53991
740	733	733	\N	2018-04-30 09:05:26.54091
745	775	775	\N	2018-04-30 09:05:26.54291
750	756	756	\N	2018-04-30 09:05:26.54391
755	750	750	\N	2018-04-30 09:05:26.54491
760	755	755	\N	2018-04-30 09:05:26.54691
780	772	772	\N	2018-04-30 09:05:26.552911
785	807	807	\N	2018-04-30 09:05:26.553911
796	784	784	\N	2018-04-30 09:05:26.556911
806	793	793	\N	2018-04-30 09:05:26.559911
816	817	817	\N	2018-04-30 09:05:26.562911
826	823	823	\N	2018-04-30 09:05:26.564911
832	835	835	\N	2018-04-30 09:05:26.566912
854	854	854	\N	2018-04-30 09:05:26.572912
859	859	859	\N	2018-04-30 09:05:26.573912
864	864	864	\N	2018-04-30 09:05:26.575912
869	875	875	\N	2018-04-30 09:05:26.576912
874	872	872	\N	2018-04-30 09:05:26.577912
170	168	168	\N	2018-04-30 09:05:26.3699
175	172	172	\N	2018-04-30 09:05:26.3719
180	178	178	\N	2018-04-30 09:05:26.373901
185	173	173	\N	2018-04-30 09:05:26.374901
190	183	183	\N	2018-04-30 09:05:26.375901
195	185	185	\N	2018-04-30 09:05:26.377901
200	203	203	\N	2018-04-30 09:05:26.380901
205	207	207	\N	2018-04-30 09:05:26.383901
210	211	211	\N	2018-04-30 09:05:26.384901
215	215	215	\N	2018-04-30 09:05:26.387901
220	218	218	\N	2018-04-30 09:05:26.388901
225	227	227	\N	2018-04-30 09:05:26.390902
230	230	230	\N	2018-04-30 09:05:26.391902
235	222	222	\N	2018-04-30 09:05:26.393902
240	243	243	\N	2018-04-30 09:05:26.394902
245	247	247	\N	2018-04-30 09:05:26.396902
250	245	245	\N	2018-04-30 09:05:26.397902
255	249	249	\N	2018-04-30 09:05:26.399902
260	263	263	\N	2018-04-30 09:05:26.400902
265	261	261	\N	2018-04-30 09:05:26.402902
270	265	265	\N	2018-04-30 09:05:26.403902
275	278	278	\N	2018-04-30 09:05:26.405902
280	276	276	\N	2018-04-30 09:05:26.406902
285	293	293	\N	2018-04-30 09:05:26.408903
290	291	291	\N	2018-04-30 09:05:26.409903
295	302	302	\N	2018-04-30 09:05:26.410903
300	311	311	\N	2018-04-30 09:05:26.412903
305	305	305	\N	2018-04-30 09:05:26.413903
310	308	308	\N	2018-04-30 09:05:26.415903
315	322	322	\N	2018-04-30 09:05:26.416903
320	313	313	\N	2018-04-30 09:05:26.418903
325	321	321	\N	2018-04-30 09:05:26.419903
336	325	325	\N	2018-04-30 09:05:26.423903
361	366	366	\N	2018-04-30 09:05:26.430904
371	369	369	\N	2018-04-30 09:05:26.433904
376	380	380	\N	2018-04-30 09:05:26.434904
386	396	396	\N	2018-04-30 09:05:26.437904
406	406	406	\N	2018-04-30 09:05:26.444905
432	430	430	\N	2018-04-30 09:05:26.451905
453	453	453	\N	2018-04-30 09:05:26.459905
458	458	458	\N	2018-04-30 09:05:26.461906
467	461	461	\N	2018-04-30 09:05:26.464906
477	475	475	\N	2018-04-30 09:05:26.466906
482	494	494	\N	2018-04-30 09:05:26.468906
487	569	569	\N	2018-04-30 09:05:26.469906
513	513	513	\N	2018-04-30 09:05:26.477906
518	522	522	\N	2018-04-30 09:05:26.478907
528	530	530	\N	2018-04-30 09:05:26.481907
533	500	500	\N	2018-04-30 09:05:26.482907
542	543	543	\N	2018-04-30 09:05:26.485907
552	552	552	\N	2018-04-30 09:05:26.487907
566	563	563	\N	2018-04-30 09:05:26.492907
571	567	567	\N	2018-04-30 09:05:26.493907
581	713	713	\N	2018-04-30 09:05:26.496908
598	628	628	\N	2018-04-30 09:05:26.500908
603	605	605	\N	2018-04-30 09:05:26.502908
608	606	606	\N	2018-04-30 09:05:26.503908
613	631	631	\N	2018-04-30 09:05:26.504908
618	568	568	\N	2018-04-30 09:05:26.506908
633	643	643	\N	2018-04-30 09:05:26.510908
638	655	655	\N	2018-04-30 09:05:26.511908
643	646	646	\N	2018-04-30 09:05:26.512909
648	665	665	\N	2018-04-30 09:05:26.514909
653	760	760	\N	2018-04-30 09:05:26.515909
658	653	653	\N	2018-04-30 09:05:26.516909
663	641	641	\N	2018-04-30 09:05:26.518909
679	686	686	\N	2018-04-30 09:05:26.522909
684	687	687	\N	2018-04-30 09:05:26.524909
689	699	699	\N	2018-04-30 09:05:26.525909
694	701	701	\N	2018-04-30 09:05:26.526909
699	683	683	\N	2018-04-30 09:05:26.528909
704	722	722	\N	2018-04-30 09:05:26.529909
709	671	671	\N	2018-04-30 09:05:26.53091
714	710	710	\N	2018-04-30 09:05:26.53291
719	741	741	\N	2018-04-30 09:05:26.53491
724	727	727	\N	2018-04-30 09:05:26.53591
729	754	754	\N	2018-04-30 09:05:26.53791
732	745	745	\N	2018-04-30 09:05:26.53891
738	736	736	\N	2018-04-30 09:05:26.53991
743	740	740	\N	2018-04-30 09:05:26.54191
753	749	749	\N	2018-04-30 09:05:26.54491
758	763	763	\N	2018-04-30 09:05:26.54591
763	781	781	\N	2018-04-30 09:05:26.547911
768	762	762	\N	2018-04-30 09:05:26.548911
773	808	808	\N	2018-04-30 09:05:26.549911
778	770	770	\N	2018-04-30 09:05:26.551911
783	785	785	\N	2018-04-30 09:05:26.552911
788	789	789	\N	2018-04-30 09:05:26.554911
794	798	798	\N	2018-04-30 09:05:26.556911
813	814	814	\N	2018-04-30 09:05:26.561911
818	820	820	\N	2018-04-30 09:05:26.562911
823	826	826	\N	2018-04-30 09:05:26.563911
828	833	833	\N	2018-04-30 09:05:26.565912
833	832	832	\N	2018-04-30 09:05:26.566912
838	839	839	\N	2018-04-30 09:05:26.567912
843	842	842	\N	2018-04-30 09:05:26.569912
848	848	848	\N	2018-04-30 09:05:26.570912
178	181	181	\N	2018-04-30 09:05:26.3729
183	182	182	\N	2018-04-30 09:05:26.373901
193	190	190	\N	2018-04-30 09:05:26.376901
203	202	202	\N	2018-04-30 09:05:26.382901
232	237	237	\N	2018-04-30 09:05:26.392902
237	244	244	\N	2018-04-30 09:05:26.393902
242	236	236	\N	2018-04-30 09:05:26.395902
272	271	271	\N	2018-04-30 09:05:26.404902
322	314	314	\N	2018-04-30 09:05:26.418903
327	319	319	\N	2018-04-30 09:05:26.420903
332	330	330	\N	2018-04-30 09:05:26.422903
343	331	331	\N	2018-04-30 09:05:26.425904
352	350	350	\N	2018-04-30 09:05:26.428904
357	352	352	\N	2018-04-30 09:05:26.429904
366	368	368	\N	2018-04-30 09:05:26.431904
377	377	377	\N	2018-04-30 09:05:26.434904
396	387	387	\N	2018-04-30 09:05:26.441904
416	408	408	\N	2018-04-30 09:05:26.446905
426	431	431	\N	2018-04-30 09:05:26.449905
431	432	432	\N	2018-04-30 09:05:26.451905
436	416	416	\N	2018-04-30 09:05:26.454905
452	462	462	\N	2018-04-30 09:05:26.459905
463	463	463	\N	2018-04-30 09:05:26.462906
468	467	467	\N	2018-04-30 09:05:26.464906
478	480	480	\N	2018-04-30 09:05:26.467906
493	471	471	\N	2018-04-30 09:05:26.471906
498	490	490	\N	2018-04-30 09:05:26.472906
508	590	590	\N	2018-04-30 09:05:26.475906
523	393	393	\N	2018-04-30 09:05:26.479907
543	517	517	\N	2018-04-30 09:05:26.485907
553	582	582	\N	2018-04-30 09:05:26.488907
558	562	562	\N	2018-04-30 09:05:26.489907
568	535	535	\N	2018-04-30 09:05:26.492907
582	584	584	\N	2018-04-30 09:05:26.496908
596	583	583	\N	2018-04-30 09:05:26.500908
637	644	644	\N	2018-04-30 09:05:26.511908
657	664	664	\N	2018-04-30 09:05:26.516909
667	661	661	\N	2018-04-30 09:05:26.519909
682	689	689	\N	2018-04-30 09:05:26.523909
692	693	693	\N	2018-04-30 09:05:26.526909
698	695	695	\N	2018-04-30 09:05:26.527909
708	668	668	\N	2018-04-30 09:05:26.53091
728	732	732	\N	2018-04-30 09:05:26.53791
734	707	707	\N	2018-04-30 09:05:26.53891
739	730	730	\N	2018-04-30 09:05:26.54091
744	742	742	\N	2018-04-30 09:05:26.54191
749	748	748	\N	2018-04-30 09:05:26.54291
754	751	751	\N	2018-04-30 09:05:26.54491
759	767	767	\N	2018-04-30 09:05:26.54591
764	773	773	\N	2018-04-30 09:05:26.547911
769	777	777	\N	2018-04-30 09:05:26.548911
774	769	769	\N	2018-04-30 09:05:26.550911
779	780	780	\N	2018-04-30 09:05:26.551911
784	790	790	\N	2018-04-30 09:05:26.552911
789	791	791	\N	2018-04-30 09:05:26.554911
791	786	786	\N	2018-04-30 09:05:26.555911
801	796	796	\N	2018-04-30 09:05:26.558911
812	804	804	\N	2018-04-30 09:05:26.560911
822	809	809	\N	2018-04-30 09:05:26.563911
837	837	837	\N	2018-04-30 09:05:26.567912
847	847	847	\N	2018-04-30 09:05:26.570912
856	857	857	\N	2018-04-30 09:05:26.573912
866	868	868	\N	2018-04-30 09:05:26.575912
872	871	871	\N	2018-04-30 09:05:26.577912
213	216	216	\N	2018-04-30 09:05:26.386901
228	229	229	\N	2018-04-30 09:05:26.391902
253	252	252	\N	2018-04-30 09:05:26.398902
258	258	258	\N	2018-04-30 09:05:26.400902
263	272	272	\N	2018-04-30 09:05:26.401902
268	270	270	\N	2018-04-30 09:05:26.403902
273	281	281	\N	2018-04-30 09:05:26.404902
278	274	274	\N	2018-04-30 09:05:26.406902
298	294	294	\N	2018-04-30 09:05:26.411903
303	298	298	\N	2018-04-30 09:05:26.413903
308	306	306	\N	2018-04-30 09:05:26.414903
334	342	342	\N	2018-04-30 09:05:26.422903
339	341	341	\N	2018-04-30 09:05:26.424903
344	348	348	\N	2018-04-30 09:05:26.425904
359	340	340	\N	2018-04-30 09:05:26.429904
364	371	371	\N	2018-04-30 09:05:26.431904
369	402	402	\N	2018-04-30 09:05:26.432904
374	367	367	\N	2018-04-30 09:05:26.434904
383	384	384	\N	2018-04-30 09:05:26.436904
413	417	417	\N	2018-04-30 09:05:26.446905
418	418	418	\N	2018-04-30 09:05:26.447905
423	421	421	\N	2018-04-30 09:05:26.448905
428	456	456	\N	2018-04-30 09:05:26.450905
433	428	428	\N	2018-04-30 09:05:26.453905
438	448	448	\N	2018-04-30 09:05:26.455905
443	435	435	\N	2018-04-30 09:05:26.456905
472	466	466	\N	2018-04-30 09:05:26.465906
486	496	496	\N	2018-04-30 09:05:26.469906
491	492	492	\N	2018-04-30 09:05:26.470906
496	491	491	\N	2018-04-30 09:05:26.472906
501	502	502	\N	2018-04-30 09:05:26.473906
516	515	515	\N	2018-04-30 09:05:26.478907
521	527	527	\N	2018-04-30 09:05:26.479907
526	534	534	\N	2018-04-30 09:05:26.480907
531	523	523	\N	2018-04-30 09:05:26.482907
536	528	528	\N	2018-04-30 09:05:26.483907
541	529	529	\N	2018-04-30 09:05:26.484907
546	550	550	\N	2018-04-30 09:05:26.486907
551	547	547	\N	2018-04-30 09:05:26.487907
556	545	545	\N	2018-04-30 09:05:26.489907
562	557	557	\N	2018-04-30 09:05:26.491907
580	610	610	\N	2018-04-30 09:05:26.496908
590	596	596	\N	2018-04-30 09:05:26.498908
600	597	597	\N	2018-04-30 09:05:26.501908
605	593	593	\N	2018-04-30 09:05:26.502908
610	630	630	\N	2018-04-30 09:05:26.504908
615	621	621	\N	2018-04-30 09:05:26.505908
620	612	612	\N	2018-04-30 09:05:26.507908
625	674	674	\N	2018-04-30 09:05:26.508908
630	629	629	\N	2018-04-30 09:05:26.509908
635	638	638	\N	2018-04-30 09:05:26.511908
640	636	636	\N	2018-04-30 09:05:26.512909
645	650	650	\N	2018-04-30 09:05:26.513909
650	656	656	\N	2018-04-30 09:05:26.514909
655	659	659	\N	2018-04-30 09:05:26.516909
660	657	657	\N	2018-04-30 09:05:26.517909
665	658	658	\N	2018-04-30 09:05:26.518909
670	670	670	\N	2018-04-30 09:05:26.520909
676	694	694	\N	2018-04-30 09:05:26.522909
686	688	688	\N	2018-04-30 09:05:26.524909
696	697	697	\N	2018-04-30 09:05:26.527909
701	700	700	\N	2018-04-30 09:05:26.528909
706	691	691	\N	2018-04-30 09:05:26.53091
717	716	716	\N	2018-04-30 09:05:26.53491
722	711	711	\N	2018-04-30 09:05:26.53591
733	738	738	\N	2018-04-30 09:05:26.53891
737	737	737	\N	2018-04-30 09:05:26.53991
742	744	744	\N	2018-04-30 09:05:26.54191
752	753	753	\N	2018-04-30 09:05:26.54391
762	766	766	\N	2018-04-30 09:05:26.54691
782	778	778	\N	2018-04-30 09:05:26.552911
787	788	788	\N	2018-04-30 09:05:26.553911
795	792	792	\N	2018-04-30 09:05:26.556911
805	803	803	\N	2018-04-30 09:05:26.559911
815	816	816	\N	2018-04-30 09:05:26.561911
825	827	827	\N	2018-04-30 09:05:26.564911
830	830	830	\N	2018-04-30 09:05:26.565912
835	831	831	\N	2018-04-30 09:05:26.567912
840	843	843	\N	2018-04-30 09:05:26.568912
845	845	845	\N	2018-04-30 09:05:26.569912
852	851	851	\N	2018-04-30 09:05:26.571912
862	858	858	\N	2018-04-30 09:05:26.574912
867	866	866	\N	2018-04-30 09:05:26.575912
871	867	867	\N	2018-04-30 09:05:26.577912
216	212	212	\N	2018-04-30 09:05:26.387901
221	221	221	\N	2018-04-30 09:05:26.389901
226	228	228	\N	2018-04-30 09:05:26.390902
231	231	231	\N	2018-04-30 09:05:26.392902
236	232	232	\N	2018-04-30 09:05:26.393902
241	253	253	\N	2018-04-30 09:05:26.395902
246	260	260	\N	2018-04-30 09:05:26.396902
251	248	248	\N	2018-04-30 09:05:26.398902
256	262	262	\N	2018-04-30 09:05:26.399902
261	257	257	\N	2018-04-30 09:05:26.401902
266	255	255	\N	2018-04-30 09:05:26.402902
271	269	269	\N	2018-04-30 09:05:26.404902
276	280	280	\N	2018-04-30 09:05:26.405902
281	288	288	\N	2018-04-30 09:05:26.407902
286	304	304	\N	2018-04-30 09:05:26.408903
291	296	296	\N	2018-04-30 09:05:26.409903
296	283	283	\N	2018-04-30 09:05:26.411903
301	301	301	\N	2018-04-30 09:05:26.412903
306	303	303	\N	2018-04-30 09:05:26.414903
311	307	307	\N	2018-04-30 09:05:26.415903
316	323	323	\N	2018-04-30 09:05:26.417903
321	312	312	\N	2018-04-30 09:05:26.418903
326	335	335	\N	2018-04-30 09:05:26.420903
331	328	328	\N	2018-04-30 09:05:26.421903
342	361	361	\N	2018-04-30 09:05:26.425904
347	358	358	\N	2018-04-30 09:05:26.426904
358	351	351	\N	2018-04-30 09:05:26.429904
363	359	359	\N	2018-04-30 09:05:26.431904
373	382	382	\N	2018-04-30 09:05:26.433904
387	381	381	\N	2018-04-30 09:05:26.437904
455	454	454	\N	2018-04-30 09:05:26.460906
460	465	465	\N	2018-04-30 09:05:26.461906
465	477	477	\N	2018-04-30 09:05:26.463906
470	450	450	\N	2018-04-30 09:05:26.465906
475	469	469	\N	2018-04-30 09:05:26.466906
480	474	474	\N	2018-04-30 09:05:26.467906
485	501	501	\N	2018-04-30 09:05:26.469906
490	488	488	\N	2018-04-30 09:05:26.470906
495	493	493	\N	2018-04-30 09:05:26.472906
500	518	518	\N	2018-04-30 09:05:26.473906
505	506	506	\N	2018-04-30 09:05:26.474906
510	512	512	\N	2018-04-30 09:05:26.476906
515	503	503	\N	2018-04-30 09:05:26.477906
520	525	525	\N	2018-04-30 09:05:26.479907
525	519	519	\N	2018-04-30 09:05:26.480907
530	536	536	\N	2018-04-30 09:05:26.481907
535	551	551	\N	2018-04-30 09:05:26.483907
540	558	558	\N	2018-04-30 09:05:26.484907
545	542	542	\N	2018-04-30 09:05:26.486907
550	546	546	\N	2018-04-30 09:05:26.487907
555	553	553	\N	2018-04-30 09:05:26.488907
564	556	556	\N	2018-04-30 09:05:26.491907
569	571	571	\N	2018-04-30 09:05:26.492907
574	587	587	\N	2018-04-30 09:05:26.494907
579	573	573	\N	2018-04-30 09:05:26.495908
584	588	588	\N	2018-04-30 09:05:26.496908
589	609	609	\N	2018-04-30 09:05:26.498908
594	566	566	\N	2018-04-30 09:05:26.499908
599	607	607	\N	2018-04-30 09:05:26.500908
678	675	675	\N	2018-04-30 09:05:26.522909
683	682	682	\N	2018-04-30 09:05:26.523909
693	698	698	\N	2018-04-30 09:05:26.526909
697	702	702	\N	2018-04-30 09:05:26.527909
715	723	723	\N	2018-04-30 09:05:26.53391
720	729	729	\N	2018-04-30 09:05:26.53591
725	719	719	\N	2018-04-30 09:05:26.53691
741	728	728	\N	2018-04-30 09:05:26.54091
756	743	743	\N	2018-04-30 09:05:26.54591
\.


--
-- Name: font_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.font_id_seq', 877, true);


--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_id_seq', 877, true);


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rating (rating_id, user_id, font_id, comment_id, rating) FROM stdin;
1	2	\N	2	1
2	2	\N	2	1
3	2	\N	2	1
4	2	\N	2	1
5	2	\N	1	0
6	2	1	\N	4
7	2	1	\N	5
8	2	179	\N	4
9	2	496	\N	5
\.


--
-- Name: rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rating_id_seq', 9, true);


--
-- Data for Name: sample_text; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sample_text (sample_id, font_id, sample_text) FROM stdin;
\.


--
-- Name: sampletxt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sampletxt_id_seq', 1, false);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (user_id, username, first_name, last_name, password, salt, email) FROM stdin;
1	new	\N	\N	$2a$10$sZPNamlJkm9KRi2fqr9ftuz7etM3ASsY1QqLXl9J/ix5No65/YCkS	\N	me@you.com
2	memrie	erika	tobais	$2a$10$MON0caCQbcLsneEBsCLOTOpHuFubM5WXR2mEqjavd9cA2M8PH1agi	$2a$10$MON0caCQbcLsneEBsCLOTO	et5392@rit.edu
\.


--
-- Data for Name: user_font; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_font (user_font_id, user_user_id, font_font_id, rank) FROM stdin;
13	2	1	\N
14	2	496	\N
15	2	179	\N
\.


--
-- Name: user_font_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_font_id_seq', 15, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 4, true);


--
-- Name: comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- Name: font_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.font_history
    ADD CONSTRAINT font_history_pkey PRIMARY KEY (history_id);


--
-- Name: font_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.font
    ADD CONSTRAINT font_pkey PRIMARY KEY (font_id);


--
-- Name: rating_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (rating_id);


--
-- Name: sample_text_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sample_text
    ADD CONSTRAINT sample_text_pkey PRIMARY KEY (sample_id);


--
-- Name: user_font_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_font
    ADD CONSTRAINT user_font_pkey PRIMARY KEY (user_font_id);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);


--
-- Name: comment_font_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_font_id_fkey FOREIGN KEY (font_id) REFERENCES public.font(font_id);


--
-- Name: comment_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: font_history_font_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.font_history
    ADD CONSTRAINT font_history_font_id_fkey FOREIGN KEY (font_id) REFERENCES public.font(font_id);


--
-- Name: rating_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comment(comment_id);


--
-- Name: rating_font_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_font_id_fkey FOREIGN KEY (font_id) REFERENCES public.font(font_id);


--
-- Name: rating_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(user_id);


--
-- Name: sample_text_font_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sample_text
    ADD CONSTRAINT sample_text_font_id_fkey FOREIGN KEY (font_id) REFERENCES public.font(font_id);


--
-- Name: user_font_font_font_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_font
    ADD CONSTRAINT user_font_font_font_id_fkey FOREIGN KEY (font_font_id) REFERENCES public.font(font_id);


--
-- Name: user_font_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_font
    ADD CONSTRAINT user_font_user_user_id_fkey FOREIGN KEY (user_user_id) REFERENCES public."user"(user_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

