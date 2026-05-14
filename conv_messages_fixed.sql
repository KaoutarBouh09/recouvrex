--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: conversation_message; Type: TABLE DATA; Schema: public; Owner: root
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.conversation_message DISABLE TRIGGER ALL;

COPY public.conversation_message (id, message, sender, "timestamp", session_id) FROM stdin;
1	quel est ma situation	CLIENT	2026-04-27 22:59:57.191899	2
2	Bonjour Monsieur Petrov,\n\nJe suis votre agent virtuel de Recouvrex et je vous remercie de me contacter.\n\nConcernant votre situation, nous souhaitons discuter d'un solde impayé que nous avons enregistré à votre nom. Le montant total de cette dette s'élève à **22 070,00 MAD**.\n\nMon rôle est de vous accompagner pour trouver une solution de remboursement qui vous convienne, en toute discrétion et avec bienveillance. N'hésitez pas si vous avez des questions sur l'origine de cette dette ou si vous souhaitez en discuter plus en détail.	AI	2026-04-27 23:00:02.311947	2
3	quel sont les solutions possible ?	CLIENT	2026-04-27 23:01:23.339038	2
4	Monsieur Petrov,\n\nJe comprends tout à fait votre question et je suis là pour vous présenter les différentes options que nous pouvons explorer ensemble pour régulariser cette situation. Notre objectif est de trouver une solution qui soit réaliste et gérable pour vous.\n\nVoici les principales solutions que nous pouvons envisager :\n\n1.  **Remboursement en une seule fois :** Si votre situation le permet, le règlement intégral du montant de 22 070,00 MAD en une seule fois est bien sûr l'option la plus simple.\n\n2.  **Plan de paiement échelonné :** C'est l'option la plus courante et souvent la plus adaptée. Nous pouvons mettre en place un plan de remboursement sur plusieurs mois, avec des mensualités fixes.\n    *   Nous discuterions ensemble de la durée du plan et du montant des mensualités qui correspondraient le mieux à vos capacités financières actuelles. Par exemple, nous pourrions envisager des paiements sur 6, 12, 18 ou même 24 mois, voire plus si nécessaire, pour rendre les mensualités plus abordables.\n    *   L'idée est de définir un montant mensuel que vous seriez à l'aise de payer sans que cela n'impacte trop votre budget.\n\n3.  **Discussion personnalisée :** Si aucune de ces options ne vous semble immédiatement réalisable, je suis à votre écoute pour comprendre plus en détail votre situation financière. Parfois, une solution sur mesure peut être élaborée après avoir discuté	AI	2026-04-27 23:01:27.012814	2
5	donner moi par exemple un plan de paiment	CLIENT	2026-04-27 23:02:51.846186	2
6	Absolument, Monsieur Petrov. Pour vous donner une idée concrète, voici quelques exemples de plans de paiement échelonné que nous pourrions envisager, basés sur le montant de votre dette de **22 070,00 MAD** :\n\n*   **Sur 6 mois :** Vos mensualités s'élèveraient à environ **3 678,33 MAD** par mois.\n*   **Sur 12 mois :** Vos mensualités s'élèveraient à environ **1 839,17 MAD** par mois.\n*   **Sur 18 mois :** Vos mensualités s'élèveraient à environ **1 226,11 MAD** par mois.\n*   **Sur 24 mois :** Vos mensualités s'élèveraient à environ **919,58 MAD** par	AI	2026-04-27 23:02:54.988365	2
7	bonjour	CLIENT	2026-04-27 23:15:52.249602	2
8	Bonjour Monsieur Petrov,\n\nJe vous souhaite également une bonne journée.\n\nNous étions en train d'explorer les différentes options de remboursement pour le solde de 22 070,00 MAD, et je vous avais proposé quelques exemples de plans de paiement échelonné.\n\nSouhaiteriez-vous que nous reprenions la discussion à ce sujet, ou avez-vous d'autres questions ou préoccupations que vous aimeriez aborder ? Je suis là pour vous écouter et vous accompagner.	AI	2026-04-27 23:15:55.275918	2
9	de 6 mois est bien	CLIENT	2026-04-27 23:16:31.035357	2
10	C'est une excellente nouvelle, Monsieur Petrov ! Je suis ravi que cette option puisse vous convenir.\n\nSi le plan de 6 mois, avec des mensualités d'environ **3 678,33 MAD**, vous semble le plus approprié, nous pouvons tout à fait le mettre en place.\n\nPourriez-vous me confirmer que ce plan est bien celui que vous souhaitez retenir ? Une fois votre confirmation reçue, je pourrai vous expliquer les prochaines étapes pour formaliser cet accord et démarrer les remboursements.\n\nAvez-vous des questions sur la mise en place de ce plan ou sur les modalités de paiement ?	AI	2026-04-27 23:16:33.208414	2
11	d'accord	CLIENT	2026-04-28 13:35:37.05342	2
12	Excellent, Monsieur Petrov ! Je prends note de votre confirmation.\n\nNous allons donc procéder à la mise en place du plan de remboursement sur **6 mois**, avec des mensualités d'environ **3 678,33 MAD**.\n\nVoici les prochaines étapes pour formaliser cet accord :\n\n1.  **Confirmation écrite :** Nous vous enverrons un récapitulatif écrit de ce plan de paiement par email (ou par courrier si vous préférez), détaillant les montants, les dates d'échéance des mensualités, et le montant total remboursé. Cela servira de document officiel pour notre accord.\n2.  **Modalités de paiement :** Pour les paiements, nous proposons généralement le prélèvement automatique, ce qui est le plus simple et le plus sûr pour éviter tout oubli. Nous pouvons aussi envisager des virements bancaires mensuels si cela vous arrange mieux.\n3.  **Première échéance :** Nous définirons ensemble la date de la première mensualité.\n\nPourriez-vous me confirmer l'adresse email à laquelle nous pouvons vous envoyer le récapitulatif ? Et avez-vous une préférence concernant le mode de paiement (prélèvement automatique ou virement bancaire) ?\n\nJe suis à votre disposition si vous avez la moindre question sur ces étapes.	AI	2026-04-28 13:35:40.047975	2
13	Merci monsieur pour votre comprehension	AGENT	2026-04-28 13:38:29.395572	2
14	bonjour	CLIENT	2026-04-28 13:39:06.033851	2
15	Bonjour Monsieur Petrov,\n\nJe vous souhaite également une excellente journée.\n\nNous étions en train de finaliser les détails pour la mise en place de votre plan de remboursement sur 6 mois.\n\nPourriez-vous me confirmer l'adresse email à laquelle nous pouvons vous envoyer le récapitulatif de cet accord ? Et avez-vous une préférence concernant le mode de paiement (prélèvement automatique ou virement bancaire) ?\n\nJe reste à votre écoute pour toute question.	AI	2026-04-28 13:39:07.593753	2
16	c'est bien	AGENT	2026-04-28 13:39:35.897902	2
17	voici mon email \tmhonma398@gmail.com	CLIENT	2026-04-28 13:40:38.942462	2
18	Merci beaucoup, Monsieur Petrov, pour votre adresse email : **mhonma398@gmail.com**.\n\nNous allons préparer le récapitulatif de votre plan de remboursement sur 6 mois (avec des mensualités d'environ 3 678,33 MAD) et vous l'enverrons à cette adresse très prochainement.\n\nAvant cela, pourriez-vous me préciser votre préférence concernant le mode de paiement des mensualités ? Souhaitez-vous opter pour :\n\n*   Le **prélèvement automatique** (ce qui est souvent le plus pratique) ?\n*   Ou des **virements bancaires mensuels** de votre part ?\n\nVotre choix nous aidera à finaliser les dernières informations pour le document que nous vous enverrons.	AI	2026-04-28 13:40:40.887094	2
19	bonjour	AGENT	2026-04-29 23:10:13.917132	2
\.


ALTER TABLE public.conversation_message ENABLE TRIGGER ALL;

--
-- Name: conversation_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.conversation_message_id_seq', 19, true);


--
-- PostgreSQL database dump complete
--


