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
100	Pathway Gothic One	/fonts/json/	100	66	sans-serif
75	Rajdhani	/fonts/json/	75	93	sans-serif
109	Monda	/fonts/json/	109	104	sans-serif
17	Roboto Mono	/fonts/json/	18	110	monospace
93	Shrikhand	/fonts/json/	93	113	display
105	Alfa Slab One	/fonts/json/	105	128	display
78	Rokkitt	/fonts/json/	78	142	serif
99	Philosopher	/fonts/json/	99	156	sans-serif
77	Hind Siliguri	/fonts/json/	77	158	sans-serif
101	Yantramanav	/fonts/json/	101	163	sans-serif
18	Poppins	/fonts/json/	17	165	sans-serif
95	Heebo	/fonts/json/	95	178	sans-serif
96	Teko	/fonts/json/	96	184	sans-serif
64	Questrial	/fonts/json/	64	193	sans-serif
84	Source Code Pro	/fonts/json/	84	203	monospace
68	Amatic SC	/fonts/json/	66	204	handwriting
83	Ropa Sans	/fonts/json/	83	217	sans-serif
103	Russo One	/fonts/json/	103	222	sans-serif
66	Source Serif Pro	/fonts/json/	67	230	serif
25	Noto Serif	/fonts/json/	25	233	serif
28	Indie Flower	/fonts/json/	28	234	handwriting
20	Titillium Web	/fonts/json/	20	255	sans-serif
89	Righteous	/fonts/json/	89	256	display
16	Playfair Display	/fonts/json/	16	258	serif
13	Open Sans Condensed	/fonts/json/	13	265	sans-serif
90	Cinzel	/fonts/json/	90	266	serif
65	Play	/fonts/json/	65	286	sans-serif
49	Karla	/fonts/json/	49	290	sans-serif
29	Anton	/fonts/json/	29	292	sans-serif
58	Varela Round	/fonts/json/	57	297	sans-serif
88	Berkshire Swash	/fonts/json/	88	301	handwriting
27	Fira Sans	/fonts/json/	27	305	sans-serif
4	Montserrat	/fonts/json/	4	309	sans-serif
106	ABeeZee	/fonts/json/	106	313	sans-serif
14	Ubuntu	/fonts/json/	14	316	sans-serif
30	Nanum Gothic	/fonts/json/	32	319	sans-serif
63	Gloria Hallelujah	/fonts/json/	63	333	handwriting
35	Inconsolata	/fonts/json/	35	347	monospace
52	Ubuntu Condensed	/fonts/json/	52	354	sans-serif
102	Noticia Text	/fonts/json/	102	365	serif
3	Lato	/fonts/json/	3	373	sans-serif
38	Fjalla One	/fonts/json/	38	379	sans-serif
9	Raleway	/fonts/json/	9	384	sans-serif
32	Bitter	/fonts/json/	33	392	serif
94	Permanent Marker	/fonts/json/	94	398	handwriting
26	Nunito	/fonts/json/	26	402	sans-serif
47	Abel	/fonts/json/	46	409	sans-serif
62	Dancing Script	/fonts/json/	62	413	handwriting
11	Roboto Slab	/fonts/json/	11	417	serif
37	Cabin	/fonts/json/	37	421	sans-serif
46	Rubik	/fonts/json/	48	423	sans-serif
40	Work Sans	/fonts/json/	39	426	sans-serif
12	Merriweather	/fonts/json/	12	431	serif
51	Abril Fatface	/fonts/json/	51	437	display
86	Vollkorn	/fonts/json/	86	445	serif
56	Merriweather Sans	/fonts/json/	56	452	sans-serif
19	Lora	/fonts/json/	19	457	serif
60	Bree Serif	/fonts/json/	60	461	serif
39	Libre Baskerville	/fonts/json/	40	470	serif
98	Poiret One	/fonts/json/	98	476	display
80	Comfortaa	/fonts/json/	80	477	display
87	Catamaran	/fonts/json/	87	484	sans-serif
22	Arimo	/fonts/json/	22	498	sans-serif
5	Roboto Condensed	/fonts/json/	5	503	sans-serif
72	EB Garamond	/fonts/json/	73	506	serif
70	Kanit	/fonts/json/	70	526	sans-serif
2	Open Sans	/fonts/json/	2	535	sans-serif
15	Noto Sans	/fonts/json/	15	543	sans-serif
42	Quicksand	/fonts/json/	41	552	sans-serif
36	Oxygen	/fonts/json/	36	555	sans-serif
10	PT Sans	/fonts/json/	10	567	sans-serif
74	Maven Pro	/fonts/json/	72	584	sans-serif
107	Cookie	/fonts/json/	107	597	handwriting
110	Orbitron	/fonts/json/	110	604	sans-serif
31	Crimson Text	/fonts/json/	31	606	serif
21	PT Serif	/fonts/json/	21	608	serif
1	Roboto	/fonts/json/	1	620	sans-serif
41	Arvo	/fonts/json/	43	624	serif
50	Pacifico	/fonts/json/	50	631	handwriting
34	Dosis	/fonts/json/	30	635	sans-serif
91	Passion One	/fonts/json/	91	637	display
76	Francois One	/fonts/json/	76	660	sans-serif
43	Josefin Sans	/fonts/json/	42	675	sans-serif
71	Acme	/fonts/json/	71	681	sans-serif
82	Crete Round	/fonts/json/	82	685	serif
92	Alegreya	/fonts/json/	92	693	serif
79	Patua One	/fonts/json/	79	696	display
57	Shadows Into Light	/fonts/json/	58	705	handwriting
108	Courgette	/fonts/json/	108	716	handwriting
53	Libre Franklin	/fonts/json/	53	724	sans-serif
8	Slabo 27px	/fonts/json/	8	740	serif
44	Hind	/fonts/json/	44	750	sans-serif
45	Yanone Kaffeesatz	/fonts/json/	45	767	sans-serif
67	Signika	/fonts/json/	68	780	sans-serif
97	Old Standard TT	/fonts/json/	97	787	serif
104	Great Vibes	/fonts/json/	104	806	handwriting
48	Lobster	/fonts/json/	47	810	display
309	IM Fell DW Pica	/fonts/json/	309	14	serif
808	Libre Barcode 39 Text	/fonts/json/	808	24	display
380	Cambay	/fonts/json/	380	39	sans-serif
518	Suez One	/fonts/json/	518	42	serif
718	Kantumruy	/fonts/json/	718	43	sans-serif
408	Oxygen Mono	/fonts/json/	408	53	monospace
340	VT323	/fonts/json/	340	57	monospace
170	Hind Madurai	/fonts/json/	170	64	sans-serif
279	Goudy Bookletter 1911	/fonts/json/	279	73	serif
668	Cormorant Upright	/fonts/json/	668	86	serif
728	Diplomata SC	/fonts/json/	728	95	display
428	Proza Libre	/fonts/json/	428	122	sans-serif
598	Donegal One	/fonts/json/	598	126	serif
648	Nova Round	/fonts/json/	648	137	display
815	Almendra Display	/fonts/json/	815	145	display
250	Black Ops One	/fonts/json/	250	154	display
150	Boogaloo	/fonts/json/	150	172	display
398	Convergence	/fonts/json/	398	185	sans-serif
210	Martel	/fonts/json/	210	198	serif
299	Halant	/fonts/json/	299	201	serif
418	Cambo	/fonts/json/	418	213	serif
240	Ubuntu Mono	/fonts/json/	240	237	monospace
350	Jaldi	/fonts/json/	350	244	sans-serif
190	Basic	/fonts/json/	190	259	sans-serif
738	Smythe	/fonts/json/	738	264	display
142	Marck Script	/fonts/json/	142	272	handwriting
478	Orienta	/fonts/json/	478	287	sans-serif
798	Felipa	/fonts/json/	798	294	handwriting
448	Mate	/fonts/json/	448	349	serif
329	Archivo	/fonts/json/	329	356	sans-serif
618	Averia Libre	/fonts/json/	618	364	display
220	Actor	/fonts/json/	220	377	sans-serif
588	Amarante	/fonts/json/	588	385	display
180	Cabin Sketch	/fonts/json/	180	386	display
856	Fasthand	/fonts/json/	856	387	serif
200	Scada	/fonts/json/	200	400	sans-serif
825	Fruktur	/fonts/json/	825	406	display
548	Nova Mono	/fonts/json/	548	412	monospace
658	Text Me One	/fonts/json/	658	416	sans-serif
289	Voltaire	/fonts/json/	289	467	sans-serif
835	Sofadi One	/fonts/json/	835	468	display
778	Sirin Stencil	/fonts/json/	778	472	display
678	Jim Nightshade	/fonts/json/	678	489	handwriting
508	Gurajada	/fonts/json/	508	492	serif
230	Arsenal	/fonts/json/	230	515	sans-serif
768	Rum Raisin	/fonts/json/	768	522	sans-serif
319	Londrina Solid	/fonts/json/	319	523	display
458	Poly	/fonts/json/	458	529	serif
558	Mallanna	/fonts/json/	558	530	sans-serif
758	Lakki Reddy	/fonts/json/	758	546	handwriting
438	Baumans	/fonts/json/	438	550	display
360	Lilita One	/fonts/json/	360	554	display
876	Dokdo	/fonts/json/	876	562	handwriting
131	Amiri	/fonts/json/	131	581	serif
370	Abhaya Libre	/fonts/json/	370	583	serif
578	Delius Unicase	/fonts/json/	578	616	handwriting
528	Italiana	/fonts/json/	528	647	serif
708	Coiny	/fonts/json/	708	651	display
468	Waiting for the Sunrise	/fonts/json/	468	655	handwriting
698	Julee	/fonts/json/	698	663	handwriting
688	Griffy	/fonts/json/	688	667	display
638	Numans	/fonts/json/	638	697	sans-serif
488	Bilbo Swash Caps	/fonts/json/	488	698	handwriting
628	League Script	/fonts/json/	628	731	handwriting
846	Chela One	/fonts/json/	846	739	display
160	Pragati Narrow	/fonts/json/	160	747	sans-serif
111	Concert One	/fonts/json/	111	756	display
388	Merienda One	/fonts/json/	388	769	handwriting
538	Tulpen One	/fonts/json/	538	770	display
498	Harmattan	/fonts/json/	498	771	sans-serif
608	Germania One	/fonts/json/	608	777	display
121	Josefin Slab	/fonts/json/	121	788	serif
748	Sahitya	/fonts/json/	748	793	serif
568	Wendy One	/fonts/json/	568	818	sans-serif
269	Ovo	/fonts/json/	269	850	serif
259	Itim	/fonts/json/	259	858	handwriting
788	Risque	/fonts/json/	788	864	display
866	Libre Barcode 39	/fonts/json/	866	869	display
859	Gaegu	/fonts/json/	859	9	handwriting
352	Spirax	/fonts/json/	352	17	display
869	Black And White Picture	/fonts/json/	869	26	sans-serif
641	BioRhyme	/fonts/json/	641	33	serif
266	Antic	/fonts/json/	266	52	sans-serif
510	Creepster	/fonts/json/	510	55	display
347	Faster One	/fonts/json/	347	67	display
466	Laila	/fonts/json/	466	72	serif
741	Bayon	/fonts/json/	741	88	display
830	Butterfly Kids	/fonts/json/	830	101	handwriting
681	Ramaraja	/fonts/json/	681	141	serif
701	Atma	/fonts/json/	701	146	display
416	Hanuman	/fonts/json/	416	147	serif
840	Federant	/fonts/json/	840	177	display
540	Sumana	/fonts/json/	540	214	serif
446	Emilys Candy	/fonts/json/	446	215	display
385	Allan	/fonts/json/	385	226	display
630	Stoke	/fonts/json/	630	238	serif
799	Freehand	/fonts/json/	799	242	display
233	Sarala	/fonts/json/	233	269	sans-serif
213	Advent Pro	/fonts/json/	213	271	sans-serif
580	Princess Sofia	/fonts/json/	580	276	handwriting
779	Galdeano	/fonts/json/	779	296	sans-serif
132	Fira Sans Condensed	/fonts/json/	132	302	sans-serif
276	Coming Soon	/fonts/json/	276	306	handwriting
500	Shojumaru	/fonts/json/	500	328	display
316	Carrois Gothic	/fonts/json/	316	342	sans-serif
520	Tienne	/fonts/json/	520	346	serif
143	Kalam	/fonts/json/	143	362	handwriting
731	Snowburst One	/fonts/json/	731	371	display
490	Port Lligat Slab	/fonts/json/	490	374	serif
476	Meddon	/fonts/json/	476	375	handwriting
560	Nova Square	/fonts/json/	560	378	display
456	Stalemate	/fonts/json/	456	382	handwriting
286	Oranienbaum	/fonts/json/	286	419	serif
182	Yrsa	/fonts/json/	182	439	serif
570	Slackey	/fonts/json/	570	463	display
436	Walter Turncoat	/fonts/json/	436	473	handwriting
161	Armata	/fonts/json/	161	479	sans-serif
711	IM Fell Double Pica SC	/fonts/json/	711	487	serif
426	Capriola	/fonts/json/	426	488	sans-serif
306	Rochester	/fonts/json/	306	496	handwriting
650	Ruluko	/fonts/json/	650	501	sans-serif
395	Delius	/fonts/json/	395	504	handwriting
122	News Cycle	/fonts/json/	122	505	sans-serif
113	Alegreya Sans	/fonts/json/	113	510	sans-serif
365	Scheherazade	/fonts/json/	365	528	serif
223	Damion	/fonts/json/	223	537	handwriting
202	Alice	/fonts/json/	202	559	serif
721	Underdog	/fonts/json/	721	575	display
296	Freckle Face	/fonts/json/	296	580	display
243	Oleo Script	/fonts/json/	243	591	display
759	Trykker	/fonts/json/	759	603	serif
485	Clicker Script	/fonts/json/	485	607	handwriting
245	Coda	/fonts/json/	245	621	display
375	Six Caps	/fonts/json/	375	628	sans-serif
810	Passero One	/fonts/json/	810	634	display
819	Sedgwick Ave Display	/fonts/json/	819	652	handwriting
600	Rosarivo	/fonts/json/	600	661	serif
550	Over the Rainbow	/fonts/json/	550	662	handwriting
530	Euphoria Script	/fonts/json/	530	677	handwriting
769	Modak	/fonts/json/	769	679	display
171	Unica One	/fonts/json/	171	690	display
151	Volkhov	/fonts/json/	151	715	serif
660	Joti One	/fonts/json/	660	725	display
405	Andika	/fonts/json/	405	755	sans-serif
850	Hanalei Fill	/fonts/json/	850	759	display
620	Encode Sans Semi Condensed	/fonts/json/	620	764	sans-serif
671	Mina	/fonts/json/	671	773	sans-serif
336	Annie Use Your Telescope	/fonts/json/	336	800	handwriting
326	El Messiri	/fonts/json/	326	807	sans-serif
790	Romanesco	/fonts/json/	790	814	handwriting
691	Plaster	/fonts/json/	691	822	display
610	Aref Ruqaa	/fonts/json/	610	835	serif
255	Coustard	/fonts/json/	255	839	serif
192	Vidaloka	/fonts/json/	192	842	serif
590	Rakkas	/fonts/json/	590	849	display
750	Meie Script	/fonts/json/	750	868	handwriting
114	Titan One	/fonts/json/	114	3	display
802	Black Han Sans	/fonts/json/	802	6	sans-serif
651	Ranchers	/fonts/json/	651	38	display
851	Unlock	/fonts/json/	851	56	display
732	Oldenburg	/fonts/json/	732	70	display
861	Suravaram	/fonts/json/	861	74	serif
772	Eater	/fonts/json/	772	75	display
565	Denk One	/fonts/json/	565	82	sans-serif
752	Faustina	/fonts/json/	752	103	serif
258	Carter One	/fonts/json/	258	120	display
831	Tenali Ramakrishna	/fonts/json/	831	125	sans-serif
640	Scope One	/fonts/json/	640	127	serif
692	Spicy Rice	/fonts/json/	692	132	display
317	Saira Extra Condensed	/fonts/json/	317	180	sans-serif
575	Sriracha	/fonts/json/	575	239	handwriting
123	Tinos	/fonts/json/	123	245	serif
145	Ruda	/fonts/json/	145	248	sans-serif
515	Encode Sans	/fonts/json/	515	260	sans-serif
355	Kelly Slab	/fonts/json/	355	268	display
400	Happy Monkey	/fonts/json/	400	273	display
682	Encode Sans Expanded	/fonts/json/	682	277	sans-serif
822	Chathura	/fonts/json/	822	312	sans-serif
225	Overpass	/fonts/json/	225	323	sans-serif
235	Alex Brush	/fonts/json/	235	326	handwriting
215	Homemade Apple	/fonts/json/	215	334	handwriting
133	Pontano Sans	/fonts/json/	133	339	sans-serif
722	Purple Purse	/fonts/json/	722	350	display
409	Trocchi	/fonts/json/	409	361	serif
361	Poller One	/fonts/json/	361	370	display
441	Fondamento	/fonts/json/	441	380	handwriting
381	Average Sans	/fonts/json/	381	390	sans-serif
155	Bangers	/fonts/json/	155	427	display
525	Asap Condensed	/fonts/json/	525	432	sans-serif
343	Palanquin	/fonts/json/	343	434	sans-serif
613	Condiment	/fonts/json/	613	435	handwriting
762	Dr Sugiyama	/fonts/json/	762	444	handwriting
782	IM Fell Great Primer SC	/fonts/json/	782	446	serif
812	Trochut	/fonts/json/	812	448	display
662	Sonsie One	/fonts/json/	662	462	display
504	Amethysta	/fonts/json/	504	494	serif
185	Glegoo	/fonts/json/	185	499	serif
841	Erica One	/fonts/json/	841	518	display
463	Rouge Script	/fonts/json/	463	531	handwriting
247	Electrolize	/fonts/json/	247	536	sans-serif
493	Brawler	/fonts/json/	493	548	serif
268	Marcellus SC	/fonts/json/	268	551	serif
536	Finger Paint	/fonts/json/	536	564	display
430	Vast Shadow	/fonts/json/	430	571	display
287	Leckerli One	/fonts/json/	287	622	handwriting
327	Bubblegum Sans	/fonts/json/	327	639	display
633	Rationale	/fonts/json/	633	649	sans-serif
390	Rasa	/fonts/json/	390	653	serif
870	East Sea Dokdo	/fonts/json/	870	686	handwriting
712	Eagle Lake	/fonts/json/	712	691	handwriting
595	Mate SC	/fonts/json/	595	702	serif
605	Simonetta	/fonts/json/	605	746	display
792	Londrina Shadow	/fonts/json/	792	753	display
482	Imprima	/fonts/json/	482	757	sans-serif
473	Podkova	/fonts/json/	473	763	serif
702	Della Respira	/fonts/json/	702	766	serif
672	Linden Hill	/fonts/json/	672	772	serif
624	Ribeye	/fonts/json/	624	782	display
277	Jockey One	/fonts/json/	277	784	sans-serif
742	Caesar Dressing	/fonts/json/	742	817	display
307	Limelight	/fonts/json/	307	819	display
165	Merienda	/fonts/json/	165	820	handwriting
555	Vibur	/fonts/json/	555	821	handwriting
371	Graduate	/fonts/json/	371	823	display
195	Rufina	/fonts/json/	195	828	serif
545	Shanti	/fonts/json/	545	834	sans-serif
586	Mystery Quest	/fonts/json/	586	840	display
337	Lalezar	/fonts/json/	337	844	display
297	Baloo	/fonts/json/	297	847	display
419	Cutive Mono	/fonts/json/	419	860	monospace
452	Pangolin	/fonts/json/	452	861	handwriting
175	Amaranth	/fonts/json/	175	870	sans-serif
205	Press Start 2P	/fonts/json/	205	874	display
572	Gothic A1	/fonts/json/	572	1	sans-serif
823	Gamja Flower	/fonts/json/	823	7	handwriting
421	Fjord One	/fonts/json/	421	40	serif
410	Gruppo	/fonts/json/	410	47	display
389	Mukta Vaani	/fonts/json/	389	49	sans-serif
707	Nokora	/fonts/json/	707	69	serif
612	Rhodium Libre	/fonts/json/	612	78	serif
333	Norican	/fonts/json/	333	83	handwriting
753	Elsie Swash Caps	/fonts/json/	753	87	display
863	Dhurjati	/fonts/json/	863	92	sans-serif
469	Sarpanch	/fonts/json/	469	94	sans-serif
783	Bokor	/fonts/json/	783	124	display
212	Barlow Semi Condensed	/fonts/json/	212	130	sans-serif
479	Secular One	/fonts/json/	479	131	sans-serif
632	Milonga	/fonts/json/	632	133	display
450	Pattaya	/fonts/json/	450	160	sans-serif
378	La Belle Aurore	/fonts/json/	378	162	handwriting
687	Wellfleet	/fonts/json/	687	169	display
242	Viga	/fonts/json/	242	186	sans-serif
763	Piedra	/fonts/json/	763	188	display
532	Cantora One	/fonts/json/	532	189	sans-serif
803	Devonshire	/fonts/json/	803	192	handwriting
183	Bevan	/fonts/json/	183	197	display
221	Barlow	/fonts/json/	221	205	sans-serif
283	Karma	/fonts/json/	283	207	serif
264	Candal	/fonts/json/	264	216	sans-serif
793	Metal	/fonts/json/	793	221	display
304	Alef	/fonts/json/	304	228	sans-serif
542	Suranna	/fonts/json/	542	236	serif
697	Sunshiney	/fonts/json/	697	240	handwriting
124	Assistant	/fonts/json/	124	251	sans-serif
645	Peralta	/fonts/json/	645	254	display
338	Space Mono	/fonts/json/	338	257	monospace
743	Ewert	/fonts/json/	743	275	display
460	Just Me Again Down Here	/fonts/json/	460	278	handwriting
141	Cabin Condensed	/fonts/json/	141	283	sans-serif
813	Moul	/fonts/json/	813	284	display
511	Bentham	/fonts/json/	511	289	serif
501	Unkempt	/fonts/json/	501	315	display
203	Patrick Hand	/fonts/json/	203	327	handwriting
521	Ledger	/fonts/json/	521	331	serif
853	Gidugu	/fonts/json/	853	359	sans-serif
232	Rancho	/fonts/json/	232	360	handwriting
193	Gentium Book Basic	/fonts/json/	193	372	serif
112	Satisfy	/fonts/json/	112	389	handwriting
552	Engagement	/fonts/json/	552	393	handwriting
429	Kristi	/fonts/json/	429	451	handwriting
873	Yeon Sung	/fonts/json/	873	464	display
294	Radley	/fonts/json/	294	480	serif
313	Puritan	/fonts/json/	313	482	sans-serif
368	Rosario	/fonts/json/	368	493	sans-serif
162	Audiowide	/fonts/json/	162	500	display
592	Montserrat Subrayada	/fonts/json/	592	507	sans-serif
667	Monsieur La Doulaise	/fonts/json/	667	508	handwriting
655	Croissant One	/fonts/json/	655	519	display
152	Hammersmith One	/fonts/json/	152	525	sans-serif
399	Give You Glory	/fonts/json/	399	541	handwriting
274	Marcellus	/fonts/json/	274	587	serif
843	Baloo Tammudu	/fonts/json/	843	589	display
358	Doppio One	/fonts/json/	358	593	sans-serif
323	Yesteryear	/fonts/json/	323	609	handwriting
833	Sevillana	/fonts/json/	833	636	display
562	Codystar	/fonts/json/	562	654	display
439	Gabriela	/fonts/json/	439	657	serif
134	Sacramento	/fonts/json/	134	682	handwriting
602	Maiden Orange	/fonts/json/	602	695	display
773	Ribeye Marrow	/fonts/json/	773	743	display
172	Arima Madurai	/fonts/json/	172	748	display
253	Caveat Brush	/fonts/json/	253	779	handwriting
717	Uncial Antiqua	/fonts/json/	717	803	display
723	Autour One	/fonts/json/	723	811	display
622	Cagliostro	/fonts/json/	622	825	sans-serif
677	Baloo Bhaijaan	/fonts/json/	677	827	display
582	Bilbo	/fonts/json/	582	833	handwriting
348	Aladin	/fonts/json/	348	845	handwriting
733	Macondo	/fonts/json/	733	862	display
491	Arya	/fonts/json/	491	873	sans-serif
809	Encode Sans Semi Expanded	/fonts/json/	809	13	sans-serif
486	Manuale	/fonts/json/	486	15	serif
252	Eczar	/fonts/json/	252	21	serif
535	Battambang	/fonts/json/	535	29	display
557	Khmer	/fonts/json/	557	45	display
867	Libre Barcode 128 Text	/fonts/json/	867	60	display
125	Prompt	/fonts/json/	125	77	sans-serif
465	Carrois Gothic SC	/fonts/json/	465	79	sans-serif
374	Mada	/fonts/json/	374	96	sans-serif
435	Federo	/fonts/json/	435	114	sans-serif
445	Athiti	/fonts/json/	445	115	sans-serif
858	Moulpali	/fonts/json/	858	129	display
516	Lemon	/fonts/json/	516	139	display
770	Meera Inimai	/fonts/json/	770	148	sans-serif
301	Italianno	/fonts/json/	301	149	handwriting
241	Allura	/fonts/json/	241	153	handwriting
760	Kavivanar	/fonts/json/	760	175	handwriting
262	Overlock	/fonts/json/	262	190	display
135	Fredoka One	/fonts/json/	135	199	display
353	Biryani	/fonts/json/	353	206	sans-serif
642	Bubbler One	/fonts/json/	642	210	sans-serif
749	Keania One	/fonts/json/	749	229	display
181	Enriqueta	/fonts/json/	181	235	serif
115	Domine	/fonts/json/	115	253	serif
174	Gentium Basic	/fonts/json/	174	261	serif
680	Revalia	/fonts/json/	680	285	display
394	Trirong	/fonts/json/	394	291	serif
607	McLaren	/fonts/json/	607	314	display
730	Goblin One	/fonts/json/	730	317	display
617	Dekko	/fonts/json/	617	330	handwriting
637	Junge	/fonts/json/	637	332	serif
597	Londrina Outline	/fonts/json/	597	336	display
690	Asset	/fonts/json/	690	345	display
837	Emblema One	/fonts/json/	837	355	display
364	Pompiere	/fonts/json/	364	358	display
577	Dorsa	/fonts/json/	577	363	sans-serif
164	Economica	/fonts/json/	164	383	sans-serif
847	Chenla	/fonts/json/	847	401	display
780	Jacques Francois	/fonts/json/	780	411	serif
412	Arizonia	/fonts/json/	412	415	handwriting
627	Buda	/fonts/json/	627	458	display
546	Vampiro One	/fonts/json/	546	460	display
455	Duru Sans	/fonts/json/	455	486	sans-serif
495	Fira Mono	/fonts/json/	495	517	monospace
423	Mako	/fonts/json/	423	527	sans-serif
272	Pridi	/fonts/json/	272	532	serif
661	IM Fell Great Primer	/fonts/json/	661	534	serif
506	Knewave	/fonts/json/	506	542	display
526	Salsa	/fonts/json/	526	576	display
201	Yellowtail	/fonts/json/	201	585	handwriting
820	Nova Cut	/fonts/json/	820	588	display
211	Bad Script	/fonts/json/	211	594	handwriting
154	Fira Sans Extra Condensed	/fonts/json/	154	598	sans-serif
191	Prata	/fonts/json/	191	605	serif
331	Nanum Gothic Coding	/fonts/json/	331	617	monospace
144	Monoton	/fonts/json/	144	619	display
291	Nobile	/fonts/json/	291	627	sans-serif
567	Averia Sans Libre	/fonts/json/	567	643	display
231	Chewy	/fonts/json/	231	665	display
720	Petrona	/fonts/json/	720	668	serif
281	Molengo	/fonts/json/	281	672	sans-serif
342	Homenaje	/fonts/json/	342	694	sans-serif
587	Quintessential	/fonts/json/	587	720	handwriting
652	Baloo Thambi	/fonts/json/	652	723	display
700	Glass Antiqua	/fonts/json/	700	729	display
311	Reem Kufi	/fonts/json/	311	749	sans-serif
222	Fugaz One	/fonts/json/	222	754	display
404	IM Fell English SC	/fonts/json/	404	761	serif
670	Fresca	/fonts/json/	670	768	sans-serif
800	Bonbon	/fonts/json/	800	801	handwriting
384	Quando	/fonts/json/	384	802	serif
739	Original Surfer	/fonts/json/	739	808	display
475	Frijole	/fonts/json/	475	816	display
829	Kumar One	/fonts/json/	829	829	display
321	Mitr	/fonts/json/	321	856	sans-serif
710	Henny Penny	/fonts/json/	710	865	display
877	Sunflower	/fonts/json/	877	866	sans-serif
789	Ranga	/fonts/json/	789	876	display
807	Kdam Thmor	/fonts/json/	807	18	display
706	IBM Plex Serif	/fonts/json/	706	20	serif
290	Unna	/fonts/json/	290	23	serif
484	Padauk	/fonts/json/	484	50	sans-serif
594	Mukta Mahee	/fonts/json/	594	51	sans-serif
647	IBM Plex Sans Condensed	/fonts/json/	647	61	sans-serif
544	Lovers Quarrel	/fonts/json/	544	62	handwriting
369	Mukta	/fonts/json/	369	63	sans-serif
777	IM Fell French Canon SC	/fonts/json/	777	80	serif
157	Prosto One	/fonts/json/	157	84	display
260	Hind Guntur	/fonts/json/	260	99	sans-serif
379	Gilda Display	/fonts/json/	379	102	serif
454	Anaheim	/fonts/json/	454	105	sans-serif
391	Encode Sans Condensed	/fonts/json/	391	117	sans-serif
727	Monofett	/fonts/json/	727	136	display
188	Sigmar One	/fonts/json/	188	152	display
444	Palanquin Dark	/fonts/json/	444	161	sans-serif
871	Stylish	/fonts/json/	871	167	sans-serif
686	Sedgwick Ave	/fonts/json/	686	200	handwriting
496	Crushed	/fonts/json/	496	211	display
816	Stalinist One	/fonts/json/	816	218	display
300	Fauna One	/fonts/json/	300	246	serif
514	Corben	/fonts/json/	514	250	display
167	Ultra	/fonts/json/	167	281	serif
553	Nova Slim	/fonts/json/	553	300	display
860	Libre Barcode 39 Extended	/fonts/json/	860	318	display
838	Bungee Outline	/fonts/json/	838	320	display
320	Copse	/fonts/json/	320	322	serif
330	Allerta Stencil	/fonts/json/	330	325	sans-serif
533	Life Savers	/fonts/json/	533	337	display
310	Nixie One	/fonts/json/	310	397	display
636	Trade Winds	/fonts/json/	636	405	display
716	Inknut Antiqua	/fonts/json/	716	425	serif
626	Spectral SC	/fonts/json/	626	433	serif
676	Content	/fonts/json/	676	440	display
226	Varela	/fonts/json/	226	441	sans-serif
341	Racing Sans One	/fonts/json/	341	455	display
696	Marko One	/fonts/json/	696	465	serif
849	Peddana	/fonts/json/	849	478	serif
148	BenchNine	/fonts/json/	148	483	sans-serif
737	Irish Grover	/fonts/json/	737	533	display
351	Nanum Pen Script	/fonts/json/	351	538	handwriting
136	Didact Gothic	/fonts/json/	136	556	sans-serif
767	Kenia	/fonts/json/	767	565	display
583	Mogra	/fonts/json/	583	573	display
787	Tillana	/fonts/json/	787	578	handwriting
402	IM Fell Double Pica	/fonts/json/	402	614	serif
206	Kreon	/fonts/json/	206	626	serif
198	Adamina	/fonts/json/	198	648	serif
615	Kadwa	/fonts/json/	615	658	serif
747	Iceberg	/fonts/json/	747	659	display
603	Esteban	/fonts/json/	603	664	serif
505	Loved by the King	/fonts/json/	505	666	handwriting
249	Cantata One	/fonts/json/	249	674	serif
524	Sofia	/fonts/json/	524	676	handwriting
414	Montez	/fonts/json/	414	680	handwriting
657	UnifrakturCook	/fonts/json/	657	709	display
177	Frank Ruhl Libre	/fonts/json/	177	714	serif
280	Average	/fonts/json/	280	727	serif
757	Jacques Francois Shadow	/fonts/json/	757	734	display
270	Lustria	/fonts/json/	270	760	serif
563	Geo	/fonts/json/	563	762	sans-serif
126	Cardo	/fonts/json/	126	785	serif
237	Montserrat Alternates	/fonts/json/	237	791	sans-serif
116	Archivo Black	/fonts/json/	116	792	sans-serif
359	Nanum Brush Script	/fonts/json/	359	796	handwriting
434	Seaweed Script	/fonts/json/	434	799	display
797	Ruge Boogie	/fonts/json/	797	831	handwriting
827	Macondo Swash Caps	/fonts/json/	827	836	display
574	Nosifer	/fonts/json/	574	837	display
424	Yatra One	/fonts/json/	424	852	display
216	Special Elite	/fonts/json/	216	853	display
665	Nova Flat	/fonts/json/	665	863	display
464	Chau Philomene One	/fonts/json/	464	872	sans-serif
474	Rammetto One	/fonts/json/	474	877	display
862	Jua	/fonts/json/	862	22	sans-serif
509	Mukta Malar	/fonts/json/	509	25	sans-serif
440	Vesper Libre	/fonts/json/	440	28	serif
163	Chivo	/fonts/json/	163	35	sans-serif
709	New Rocker	/fonts/json/	709	36	display
314	Bungee	/fonts/json/	314	37	display
234	Love Ya Like A Sister	/fonts/json/	234	59	display
669	Flavors	/fonts/json/	669	85	display
407	Buenard	/fonts/json/	407	90	serif
519	Wallpoet	/fonts/json/	519	100	display
173	Contrail One	/fonts/json/	173	106	display
470	Miriam Libre	/fonts/json/	470	123	sans-serif
801	Suwannaphum	/fonts/json/	801	140	display
549	Sansita	/fonts/json/	549	143	sans-serif
376	Yeseva One	/fonts/json/	376	144	display
449	Oleo Script Swash Caps	/fonts/json/	449	150	display
153	Nanum Myeongjo	/fonts/json/	153	155	serif
729	Farsan	/fonts/json/	729	173	display
740	Miltonian Tattoo	/fonts/json/	740	183	display
459	Megrim	/fonts/json/	459	231	display
589	Elsie	/fonts/json/	589	232	display
629	Pirata One	/fonts/json/	629	243	display
659	Paprika	/fonts/json/	659	252	display
559	Bungee Shade	/fonts/json/	559	279	display
689	Timmana	/fonts/json/	689	298	sans-serif
649	IM Fell French Canon	/fonts/json/	649	304	serif
852	Mr Bedfort	/fonts/json/	852	307	handwriting
356	Calligraffitti	/fonts/json/	356	321	handwriting
224	Paytone One	/fonts/json/	224	340	sans-serif
273	Lateef	/fonts/json/	273	351	handwriting
529	Prociono	/fonts/json/	529	353	serif
194	Playball	/fonts/json/	194	366	display
254	Quantico	/fonts/json/	254	367	sans-serif
679	IM Fell DW Pica SC	/fonts/json/	679	399	serif
184	Signika Negative	/fonts/json/	184	408	sans-serif
489	UnifrakturMaguntia	/fonts/json/	489	410	display
263	Spinnaker	/fonts/json/	263	414	sans-serif
431	Mouse Memoirs	/fonts/json/	431	449	sans-serif
293	Reenie Beanie	/fonts/json/	293	456	handwriting
771	Atomic Age	/fonts/json/	771	459	display
284	Parisienne	/fonts/json/	284	475	handwriting
811	Bahiana	/fonts/json/	811	481	display
842	Aubrey	/fonts/json/	842	485	display
761	Smokum	/fonts/json/	761	516	display
204	Sintony	/fonts/json/	204	520	sans-serif
117	Lobster Two	/fonts/json/	117	540	display
303	Changa One	/fonts/json/	303	558	display
214	Arbutus Slab	/fonts/json/	214	570	serif
417	Mr De Haviland	/fonts/json/	417	574	handwriting
821	Bigelow Rules	/fonts/json/	821	577	display
781	Zilla Slab Highlight	/fonts/json/	781	595	display
366	Inder	/fonts/json/	366	599	sans-serif
751	Mrs Sheppards	/fonts/json/	751	600	handwriting
386	Kurale	/fonts/json/	386	629	serif
244	Niconne	/fonts/json/	244	632	handwriting
609	Dynalight	/fonts/json/	609	633	display
427	Wire One	/fonts/json/	427	640	sans-serif
324	Anonymous Pro	/fonts/json/	324	644	monospace
345	Tenor Sans	/fonts/json/	345	671	sans-serif
140	Arapey	/fonts/json/	140	673	serif
127	Gudea	/fonts/json/	127	692	sans-serif
599	Kranky	/fonts/json/	599	699	display
791	Nova Oval	/fonts/json/	791	710	display
499	Stardos Stencil	/fonts/json/	499	721	display
481	Lily Script One	/fonts/json/	481	758	display
396	Andada	/fonts/json/	396	776	serif
334	Telex	/fonts/json/	334	783	sans-serif
699	MedievalSharp	/fonts/json/	699	790	display
639	Fascinate Inline	/fonts/json/	639	795	display
832	Baloo Da	/fonts/json/	832	797	display
872	Poor Story	/fonts/json/	872	798	display
719	Montaga	/fonts/json/	719	805	serif
619	Bellefair	/fonts/json/	619	809	serif
569	Katibeh	/fonts/json/	569	841	display
539	Mirza	/fonts/json/	539	843	display
579	Baloo Chettan	/fonts/json/	579	851	display
713	Do Hyeon	/fonts/json/	713	2	sans-serif
601	IBM Plex Sans	/fonts/json/	601	11	sans-serif
581	Sura	/fonts/json/	581	27	serif
217	Cinzel Decorative	/fonts/json/	217	32	display
178	Khula	/fonts/json/	178	48	sans-serif
865	Libre Barcode 128	/fonts/json/	865	108	display
227	Slabo 13px	/fonts/json/	227	109	serif
834	Taprom	/fonts/json/	834	111	display
703	Lancelot	/fonts/json/	703	116	display
683	Angkor	/fonts/json/	683	119	display
673	Diplomata	/fonts/json/	673	121	display
571	Flamenco	/fonts/json/	571	138	display
513	Baloo Tamma	/fonts/json/	513	151	display
734	Arbutus	/fonts/json/	734	174	display
653	Kavoon	/fonts/json/	653	176	display
256	Cousine	/fonts/json/	256	187	monospace
531	Cherry Cream Soda	/fonts/json/	531	208	display
207	Alegreya Sans SC	/fonts/json/	207	212	sans-serif
724	Bigshot One	/fonts/json/	724	219	display
794	Miltonian	/fonts/json/	794	224	display
147	Cantarell	/fonts/json/	147	249	sans-serif
349	Metrophobic	/fonts/json/	349	267	sans-serif
158	Shadows Into Light Two	/fonts/json/	158	270	handwriting
663	Miniver	/fonts/json/	663	274	display
591	Alike Angular	/fonts/json/	591	280	serif
339	Alegreya SC	/fonts/json/	339	295	serif
824	Vollkorn SC	/fonts/json/	824	344	serif
401	Schoolbell	/fonts/json/	401	348	handwriting
392	Fontdiner Swanky	/fonts/json/	392	369	display
383	Herr Von Muellerhoff	/fonts/json/	383	391	handwriting
754	Modern Antiqua	/fonts/json/	754	395	display
764	Almendra SC	/fonts/json/	764	396	serif
328	Aclonica	/fonts/json/	328	404	sans-serif
804	Asar	/fonts/json/	804	424	serif
784	Odor Mean Chey	/fonts/json/	784	429	display
138	Sanchez	/fonts/json/	138	454	serif
129	Khand	/fonts/json/	129	466	sans-serif
433	IM Fell English	/fonts/json/	433	469	serif
774	Galada	/fonts/json/	774	474	display
451	Holtwood One SC	/fonts/json/	451	491	serif
643	Asul	/fonts/json/	643	497	sans-serif
236	Rambla	/fonts/json/	236	509	sans-serif
363	Fanwood Text	/fonts/json/	363	511	serif
318	Fredericka the Great	/fonts/json/	318	539	display
197	Julius Sans One	/fonts/json/	197	544	sans-serif
503	Cedarville Cursive	/fonts/json/	503	545	handwriting
187	Antic Slab	/fonts/json/	187	553	serif
611	Ruslan Display	/fonts/json/	611	560	display
523	Kotta One	/fonts/json/	523	568	serif
372	Judson	/fonts/json/	372	590	serif
814	GFS Neohellenic	/fonts/json/	814	601	sans-serif
246	Saira Condensed	/fonts/json/	246	610	sans-serif
267	Just Another Hand	/fonts/json/	267	625	handwriting
621	Sarina	/fonts/json/	621	641	display
298	Grand Hotel	/fonts/json/	298	645	handwriting
278	Pinyon Script	/fonts/json/	278	646	handwriting
411	Chelsea Market	/fonts/json/	411	650	display
561	Fenix	/fonts/json/	561	669	serif
308	Taviraj	/fonts/json/	308	678	serif
288	Kameron	/fonts/json/	288	683	serif
472	Lemonada	/fonts/json/	472	700	display
631	Antic Didone	/fonts/json/	631	711	serif
845	Hanalei	/fonts/json/	845	722	display
541	Sniglet	/fonts/json/	541	741	display
420	Qwigley	/fonts/json/	420	742	handwriting
875	Kirang Haerang	/fonts/json/	875	744	display
118	Kaushan Script	/fonts/json/	118	752	handwriting
693	Averia Gruesa Libre	/fonts/json/	693	775	display
461	Expletus Sans	/fonts/json/	461	789	display
744	Butcherman	/fonts/json/	744	794	display
168	Luckiest Guy	/fonts/json/	168	832	display
483	Rubik Mono One	/fonts/json/	483	838	sans-serif
551	Coda Caption	/fonts/json/	551	846	sans-serif
442	Rozha One	/fonts/json/	442	855	serif
494	Bowlby One	/fonts/json/	494	867	display
855	Libre Barcode 39 Extended Text	/fonts/json/	855	871	display
857	Cute Font	/fonts/json/	857	10	display
818	IBM Plex Mono	/fonts/json/	818	12	monospace
674	Cormorant Unicase	/fonts/json/	674	16	serif
305	Saira Semi Condensed	/fonts/json/	305	44	sans-serif
156	Aldrich	/fonts/json/	156	58	sans-serif
176	Barlow Condensed	/fonts/json/	176	68	sans-serif
606	Almendra	/fonts/json/	606	91	serif
447	Baloo Bhaina	/fonts/json/	447	107	display
275	Saira	/fonts/json/	275	118	sans-serif
576	Pavanam	/fonts/json/	576	159	sans-serif
785	Jolly Lodger	/fonts/json/	785	166	display
229	Lusitana	/fonts/json/	229	168	serif
387	Gravitas One	/fonts/json/	387	179	display
566	Chonburi	/fonts/json/	566	181	display
219	Nothing You Could Do	/fonts/json/	219	202	handwriting
806	Fascinate	/fonts/json/	806	209	display
836	Dangrek	/fonts/json/	836	223	display
315	Mr Dafoe	/fonts/json/	315	247	handwriting
745	Chango	/fonts/json/	745	262	display
796	Nova Script	/fonts/json/	796	299	display
146	Hind Vadodara	/fonts/json/	146	303	sans-serif
335	GFS Didot	/fonts/json/	335	308	serif
616	Mrs Saint Delafield	/fonts/json/	616	324	handwriting
705	Snippet	/fonts/json/	705	329	sans-serif
367	Share Tech Mono	/fonts/json/	367	338	monospace
664	Port Lligat Sans	/fonts/json/	664	343	sans-serif
497	Raleway Dots	/fonts/json/	497	352	display
357	Sue Ellen Francisco	/fonts/json/	357	357	handwriting
248	Michroma	/fonts/json/	248	388	sans-serif
646	Amita	/fonts/json/	646	407	handwriting
517	Cormorant Infant	/fonts/json/	517	420	serif
397	Zeyada	/fonts/json/	397	422	handwriting
685	Swanky and Moo Moo	/fonts/json/	685	443	handwriting
467	Cherry Swash	/fonts/json/	467	453	display
527	NTR	/fonts/json/	527	490	sans-serif
457	Belgrano	/fonts/json/	457	502	serif
596	Habibi	/fonts/json/	596	512	serif
425	Gafata	/fonts/json/	425	521	sans-serif
119	Quattrocento Sans	/fonts/json/	119	524	sans-serif
635	Mandali	/fonts/json/	635	547	sans-serif
735	Metal Mania	/fonts/json/	735	549	display
477	Amiko	/fonts/json/	477	557	sans-serif
725	Ravi Prakash	/fonts/json/	725	561	display
208	Magra	/fonts/json/	208	566	sans-serif
537	Aguafina Script	/fonts/json/	537	572	handwriting
265	Marvel	/fonts/json/	265	592	sans-serif
694	Galindo	/fonts/json/	694	596	display
415	Alike	/fonts/json/	415	611	serif
715	Ruthie	/fonts/json/	715	615	handwriting
776	Astloch	/fonts/json/	776	630	display
547	Headland One	/fonts/json/	547	638	serif
406	Balthazar	/fonts/json/	406	642	serif
828	Supermercado One	/fonts/json/	828	656	display
238	Rock Salt	/fonts/json/	238	670	handwriting
257	Gochi Hand	/fonts/json/	257	684	handwriting
756	Seymour One	/fonts/json/	756	687	sans-serif
137	Quattrocento	/fonts/json/	137	688	serif
295	Days One	/fonts/json/	295	703	sans-serif
377	The Girl Next Door	/fonts/json/	377	704	handwriting
507	Iceland	/fonts/json/	507	706	display
285	Marmelad	/fonts/json/	285	712	sans-serif
868	Kumar One Outline	/fonts/json/	868	726	display
186	Changa	/fonts/json/	186	735	sans-serif
128	Playfair Display SC	/fonts/json/	128	736	serif
346	Caudex	/fonts/json/	346	737	serif
166	Jura	/fonts/json/	166	745	sans-serif
487	Rye	/fonts/json/	487	751	display
196	Sorts Mill Goudy	/fonts/json/	196	774	serif
585	Ramabhadra	/fonts/json/	585	804	sans-serif
625	Mountains of Christmas	/fonts/json/	625	812	display
765	Molle	/fonts/json/	765	824	handwriting
325	Bowlby One SC	/fonts/json/	325	826	display
437	Baloo Paaji	/fonts/json/	437	830	display
848	Preahvihear	/fonts/json/	848	848	display
656	Overlock SC	/fonts/json/	656	857	display
556	Share Tech	/fonts/json/	556	875	sans-serif
666	Tajawal	/fonts/json/	666	4	sans-serif
714	Gugi	/fonts/json/	714	5	display
228	Skranji	/fonts/json/	228	8	display
593	Koulen	/fonts/json/	593	19	display
554	Englebert	/fonts/json/	554	30	sans-serif
755	Siemreap	/fonts/json/	755	31	display
634	Hi Melody	/fonts/json/	634	34	handwriting
726	Barrio	/fonts/json/	726	41	display
874	Song Myung	/fonts/json/	874	46	serif
54	Exo	/fonts/json/	54	54	sans-serif
373	Strait	/fonts/json/	373	65	sans-serif
480	Metamorphous	/fonts/json/	480	71	display
573	Cormorant SC	/fonts/json/	573	76	serif
704	Sree Krushnadevaraya	/fonts/json/	704	81	serif
403	Artifika	/fonts/json/	403	89	serif
261	Squada One	/fonts/json/	261	97	display
393	David Libre	/fonts/json/	393	98	serif
33	Exo 2	/fonts/json/	34	112	sans-serif
786	Warnes	/fonts/json/	786	134	display
775	Margarine	/fonts/json/	775	135	display
59	Cormorant Garamond	/fonts/json/	59	157	serif
344	Bungee Inline	/fonts/json/	344	164	display
130	Handlee	/fonts/json/	130	170	handwriting
453	Crafty Girls	/fonts/json/	453	171	handwriting
271	Cormorant	/fonts/json/	271	182	serif
805	Combo	/fonts/json/	805	191	display
312	Allerta	/fonts/json/	312	194	sans-serif
55	Nunito Sans	/fonts/json/	55	195	sans-serif
24	PT Sans Narrow	/fonts/json/	24	196	sans-serif
239	Syncopate	/fonts/json/	239	220	sans-serif
179	Architects Daughter	/fonts/json/	179	225	handwriting
736	Jomhuria	/fonts/json/	736	227	display
120	Istok Web	/fonts/json/	120	241	sans-serif
584	Sail	/fonts/json/	584	263	display
382	Spectral	/fonts/json/	382	282	serif
512	Dawning of a New Day	/fonts/json/	512	288	handwriting
844	Geostar	/fonts/json/	844	293	display
61	Asap	/fonts/json/	61	310	sans-serif
534	Voces	/fonts/json/	534	311	display
564	Stint Ultra Expanded	/fonts/json/	564	335	display
159	Neuton	/fonts/json/	159	341	serif
746	Overpass Mono	/fonts/json/	746	368	monospace
644	Baloo Bhai	/fonts/json/	644	376	display
362	Petit Formal Script	/fonts/json/	362	381	handwriting
7	Source Sans Pro	/fonts/json/	7	394	sans-serif
695	Akronim	/fonts/json/	695	403	display
23	Muli	/fonts/json/	23	418	sans-serif
139	Caveat	/fonts/json/	139	428	handwriting
209	Share	/fonts/json/	209	430	display
354	Cutive	/fonts/json/	354	436	serif
654	Stint Ultra Condensed	/fonts/json/	654	438	display
543	Medula One	/fonts/json/	543	442	display
199	Covered By Your Grace	/fonts/json/	199	447	handwriting
623	Kite One	/fonts/json/	623	450	sans-serif
85	Cuprum	/fonts/json/	85	471	sans-serif
332	Tauri	/fonts/json/	332	495	sans-serif
684	Redressed	/fonts/json/	684	513	handwriting
218	Forum	/fonts/json/	218	514	display
422	Belleza	/fonts/json/	422	563	sans-serif
189	PT Mono	/fonts/json/	189	569	monospace
795	Geostar Fill	/fonts/json/	795	579	display
817	Miss Fajardose	/fonts/json/	817	582	handwriting
282	Carme	/fonts/json/	282	586	sans-serif
81	PT Sans Caption	/fonts/json/	81	602	sans-serif
322	Martel Sans	/fonts/json/	322	612	sans-serif
675	Offside	/fonts/json/	675	613	display
149	Tangerine	/fonts/json/	149	618	handwriting
6	Oswald	/fonts/json/	6	623	sans-serif
839	Gorditas	/fonts/json/	839	689	display
302	Zilla Slab	/fonts/json/	302	701	serif
413	Oregano	/fonts/json/	413	707	display
854	Bungee Hairline	/fonts/json/	854	708	display
432	Lekton	/fonts/json/	432	713	sans-serif
73	Cairo	/fonts/json/	74	717	sans-serif
169	Neucha	/fonts/json/	169	718	handwriting
826	Londrina Sketch	/fonts/json/	826	719	display
864	BioRhyme Expanded	/fonts/json/	864	728	serif
292	Ceviche One	/fonts/json/	292	730	display
604	Sancreek	/fonts/json/	604	732	display
471	Maitree	/fonts/json/	471	733	serif
502	Delius Swash Caps	/fonts/json/	502	738	handwriting
462	Short Stack	/fonts/json/	462	765	handwriting
251	PT Serif Caption	/fonts/json/	251	778	serif
492	Patrick Hand SC	/fonts/json/	492	781	handwriting
614	Inika	/fonts/json/	614	786	serif
443	Averia Serif Libre	/fonts/json/	443	813	display
69	Archivo Narrow	/fonts/json/	69	815	sans-serif
522	Krona One	/fonts/json/	522	854	sans-serif
766	Chicle	/fonts/json/	766	859	display
\.


--
-- Data for Name: font_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.font_history (history_id, font_id, rank, trending_rank, "time") FROM stdin;
\.


--
-- Name: font_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.font_id_seq', 877, true);


--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.history_id_seq', 1, false);


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

