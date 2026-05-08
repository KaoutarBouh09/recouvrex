-- status
INSERT INTO public.status (id, status) VALUES 
    (1, 'Predouteux'),
    (2, 'Douteux'),
    (3, 'compromis'),
    (4, 'contentieux'),
    (5, 'Deces'),
    (6, 'Invalidite'),
    (7, 'Termine'),
    (8, 'Radie');

-- procedure
INSERT INTO public.procedure (id, procedure_label) VALUES 
    (1, 'Relance'),
    (2, 'Promesse de paiement'),
    (3, 'Phoning amiable'),
    (4, 'Refus de paiement'),
    (5, 'Difficulté de paiement'),
    (6, 'Difficulté d’entreprise/projet'),
    (7, 'Injoignable provisoirement'),
    (8, 'Injoignable définitivement'),
    (9, 'Injonction pour payer'),
    (10, 'Saisie sur fond de commerce'),
    (11, 'Saisie sur les biens mobiliers'),
    (12, 'Saisie sur les biens immobiliers'),
    (13, 'Saisie arrêt sur comptes bancaires'),
    (14, 'Action au fond'),
    (15, 'Saisie conservatoire sur les parts sociales'),
    (16, 'Procédure de négociation'),
    (17, 'Procédure de gestion Sinistre');

-- profile
--this tables should be created exactly like this so it can be compatibele with the frontend
INSERT INTO public.profile (profile) VALUES 
    (1,'Administrateur'),
    (2,'Responsable Region'),
    (3,'Agent de recouvrement');

    select * from status;
    select * from procedure;
    select * from profile;
------------------------------------------
-- recouvrex_user
INSERT INTO recouvrex_user (first_name, identification_number, last_name, user_name, profile_id) 
VALUES 
    ('Ayoub', 'AB1234567', 'ELOUAIZI', 'Ayoub ELOUAIZI', 1),
    ('John', 'XY9876543', 'Doe', 'John Doe', 1),
    ('Jane', 'ZW4567890', 'Smith', 'Jane Smith', 2);

																																																													
INSERT INTO public.recouvrex_user(
	id, email, first_name, identification_number, last_name, photo, user_name, manager_id, profile_id, status)
VALUES
	(1, 'elmahdi-admin@recouvrex.com', 'ELMAHDI', 'ID001', 'ADMRATI', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717427205/recouvrex_photos/horr9q8akil0dve3w79p.png', 'elmahdi-admin', NULL, 1, 'active'),
	(2, 'elmahdi-responsable@recouvrex.com', 'ELMAHDI', 'ID002', 'AMARJANE', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717427912/recouvrex_photos/mej1yxj9fatnd1pknety.png', 'elmahdi-responsable', 1, 2, 'active'),
	(3, 'elmahdi-agent@recouvrex.com', 'ELMAHDI', 'ID003', 'MOJAHIDE', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717428235/recouvrex_photos/bcpzehp4msjjhs53wk3r.png', 'elmahdi-agent-recouvrement', 2, 3, 'active'),
	(4, 'ayoub-salimi20@recouvrex.com', 'AYOUB', 'ID004', 'Salimi', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717249702/recouvrex_photos/ijwukxzmoxxrfxae17b5.png', 'ayoub-agent-recouvrement', 2, 3, 'active'),
	(5, 'ayoub-responsable@recouvrex.com', 'Ayoub', 'ID005', 'Razini', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717252304/recouvrex_photos/zqtyw6gqbwgzkkrjc0ad.png', 'ayoub-responsable', 1, 2, 'active'),
	(6, 'ayoubelouaizi@gmail.com', 'Ayoub', 'ID006', 'ELOUAIZI', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717590307/recouvrex_photos/if0chysrum7ecb4vey0w.png', 'ayoubelouaizi@gmail.com', NULL, 1, 'active'),
	(7, 'ayoub-admin@recouvrex.com', 'Ayoub', 'ID007', 'Damyani', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717327956/recouvrex_photos/fm3krogogpg9orscksy2.png', 'ayoub-admin', NULL, 1, 'active');



-- this is the correct code I will use																																																														
INSERT INTO public.recouvrex_user(
	id, email, first_name, identification_number, last_name, photo, user_name, manager_id, profile_id, status)
VALUES
	(1, 'ayoubelouaizi@gmail.com', 'Ayoub', 'ID001', 'ELOUAIZI', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717590307/recouvrex_photos/if0chysrum7ecb4vey0w.png', 'ayoubelouaizi@gmail.com', NULL, 1, 'ACTIVE'),
	(2, 'elmahdi-responsable@recouvrex.com', 'ELMAHDI', 'ID002', 'AMARJANE', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717427912/recouvrex_photos/mej1yxj9fatnd1pknety.png', 'elmahdi-responsable', 1, 2, 'active'),
	(3, 'elmahdi-agent@recouvrex.com', 'ELMAHDI', 'ID003', 'MOJAHIDE', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717428235/recouvrex_photos/bcpzehp4msjjhs53wk3r.png', 'elmahdi-agent-recouvrement', 2, 3, 'ACTIVE'),
	(4, 'ayoub-agent0@recouvrex.com', 'AYOUB', 'ID004', 'Salimi', 'http://res.cloudinary.com/dm9udoven/image/upload/v1717249702/recouvrex_photos/ijwukxzmoxxrfxae17b5.png', 'ayoub-agent-recouvrement', 2, 3, 'ACTIVE'),







    select * from recouvrex_user;
--------------------------------------------------------
-- thirdparty
INSERT INTO public.thirdparty (
    
    birth_date, 
    business_email, 
    business_phone, 
    business_sector, 
    commercial_register, 
    company_name, 
    country_of_residence, 
    fax_number, 
    first_name, 
    land_line_phone, 
    last_name, 
    legal_form, 
    marital_status, 
    nationality, 
    occupation, 
    personal_email, 
    private_phone, 
    supporting_document_expiration_date, 
    supporting_document_number, 
    supporting_document_type, 
    tiers_type, 
    title
) VALUES (
    
    '1980-01-01', -- birth_date example
    'john.doe@example.com', -- business_email example
    '123-456-7890', -- business_phone example
    'Technology', -- business_sector example
    'ABC123456789', -- commercial_register example
    'Doe Enterprises', -- company_name example
    'France', -- country_of_residence example
    '123-456-7891', -- fax_number example
    'John', -- first_name example
    '123-456-7892', -- land_line_phone example
    'Doe', -- last_name example
    'SARL', -- legal_form example
    'Single', -- marital_status example
    'French', -- nationality example
    'Software Developer', -- occupation example
    'john.private@example.com', -- personal_email example
    '098-765-4321', -- private_phone example
    '2025-01-01', -- supporting_document_expiration_date example
    'XD1234567', -- supporting_document_number example
    'PASSPORT', -- supporting_document_type example (must comply with the check constraint)
    'CUSTOMER_PP', -- tiers_type example (must comply with the check constraint)
    'Mr.' -- title example
);

INSERT INTO public.thirdparty (
  birth_date, 
  business_email, 
  business_phone, 
  business_sector, 
  commercial_register, 
  company_name, 
  country_of_residence, 
  fax_number, 
  first_name, 
  land_line_phone, 
  last_name, 
  legal_form, 
  marital_status, 
  nationality, 
  occupation, 
  personal_email, 
  private_phone, 
  supporting_document_expiration_date, 
  supporting_document_number, 
  supporting_document_type, 
  tiers_type, 
  title
) VALUES 
( '1980-02-02', 'email2@example.com', '234-567-8901', 'Retail', 'REG234567', 'Company Two', 'Germany', '234-567-8902', 'Anna', '234-567-8903', 'Smith', 'GmbH', 'Married', 'German', 'Manager', 'anna.smith@example.com', '987-654-3210', '2026-02-02', 'AB2345678', 'CIN', 'CUSTOMER_PM', 'Mrs.'),
( '1980-03-03', 'email3@example.com', '345-678-9012', 'Finance', 'REG345678', 'Company Three', 'Italy', '345-678-9013', 'Marco', '345-678-9014', 'Rossi', 'S.p.A.', 'Single', 'Italian', 'Accountant', 'marco.rossi@example.com', '876-543-2109', '2027-03-03', 'BC3456789', 'PASSPORT', 'CUSTOMER_PP', 'Mr.'),
( '1980-04-04', 'email4@example.com', '456-789-0123', 'IT Services', 'REG456789', 'Company Four', 'Canada', '456-789-0124', 'Susan', '456-789-0125', 'Johnson', 'Inc.', 'Divorced', 'Canadian', 'Engineer', 'susan.johnson@example.com', '765-432-1098', '2028-04-04', 'CD4567890', 'RESIDENCE_CARD', 'CUSTOMER_PP', 'Ms.'),
( '1980-05-05', 'email5@example.com', '567-890-1234', 'Healthcare', 'REG567890', 'Company Five', 'Japan', '567-890-1235', 'Yuto', '567-890-1236', 'Takahashi', 'KK', 'Married', 'Japanese', 'Doctor', 'yuto.takahashi@example.com', '654-321-0987', '2029-05-05', 'DE5678901', 'CIN', 'CUSTOMER_PP', 'Dr.'),
( '1980-06-06', 'email6@example.com', '678-901-2345', 'Education', 'REG678901', 'Company Six', 'Australia', '678-901-2346', 'Olivia', '678-901-2347', 'Brown', 'Pty Ltd', 'Single', 'Australian', 'Teacher', 'olivia.brown@example.com', '543-210-9876', '2030-06-06', 'EF6789012', 'PASSPORT', 'CUSTOMER_PM', 'Ms.'),
( '1980-07-07', 'email7@example.com', '789-012-3456', 'Manufacturing', 'REG789012', 'Company Seven', 'Brazil', '789-012-3457', 'Lucas', '789-012-3458', 'Silva', 'Ltda', 'Married', 'Brazilian', 'Engineer', 'lucas.silva@example.com', '432-109-8765', '2031-07-07', 'FG7890123', 'RESIDENCE_CARD', 'CUSTOMER_PP', 'Mr.'),
( '1980-08-08', 'email8@example.com', '890-123-4567', 'Automotive', 'REG890123', 'Company Eight', 'Russia', '890-123-4568', 'Ivan', '890-123-4570', 'Petrov', 'OOO', 'Widowed', 'Russian', 'Mechanical Engineer', 'ivan.petrov@example.com', '432-098-7654', '2032-08-08', 'GH8901234', 'CIN', 'CUSTOMER_PM', 'Mr.'),
( '1980-09-09', 'email9@example.com', '901-234-5678', 'Agriculture', 'REG901234', 'Company Nine', 'India', '901-234-5679', 'Priya', '901-234-5680', 'Kumar', 'Pvt Ltd', 'Married', 'Indian', 'Farmer', 'priya.kumar@example.com', '321-987-6543', '2033-09-09', 'HI9012345', 'PASSPORT', 'CUSTOMER_PP', 'Mrs.'),
( '1980-10-10', 'email10@example.com', '012-345-6789', 'Real Estate', 'REG012345', 'Company Ten', 'Spain', '012-345-6790', 'Carlos', '012-345-6791', 'Garcia', 'S.L.', 'Single', 'Spanish', 'Real Estate Agent', 'carlos.garcia@example.com', '210-876-5432', '2034-10-10', 'IJ0123456', 'RESIDENCE_CARD', 'CUSTOMER_PM', 'Mr.'),
( '1980-11-11', 'email11@example.com', '123-456-7890', 'Entertainment', 'REG123456', 'Company Eleven', 'United States', '123-456-7891', 'Emily', '123-456-7892', 'Davis', 'LLC', 'Divorced', 'American', 'Actor', 'emily.davis@example.com', '109-765-4321', '2035-11-11', 'JK1234567', 'CIN', 'CUSTOMER_PP', 'Ms.');
-- 1. Client entreprise - SARL Horizon
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1978-05-12',
    'contact@horizon.ma',
    '+212-600-123456',
    'Commerce de détail',
    'RC789654',
    'SARL Horizon',
    'Maroc',
    '+212-522-111222',
    'Youssef',
    '+212-522-333444',
    'El Amrani',
    'SARL',
    'Married',
    'Moroccan',
    'Directeur Général',
    'youssef.elamrani@gmail.com',
    '+212-661-555666',
    '2030-12-31',
    'MA1234567',
    'CIN',
    'CUSTOMER_PP',
    'M.'
);

-- 2. Cliente individuelle
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1990-03-25',
    'samira.benali@fournisseur.ma',
    '+212-601-223344',
    'Services',
    'RC456123',
    'Auto-entrepreneur Samira',
    'Maroc',
    '+212-522-222333',
    'Samira',
    '+212-522-444555',
    'Benali',
    'Auto-entrepreneur',
    'Single',
    'Moroccan',
    'Consultante',
    'samira.benali@gmail.com',
    '+212-662-777888',
    '2028-07-15',
    'MA7654321',
    'CIN',
    'CUSTOMER_PP',
    'Mme'
);

-- 3. Société industrielle
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1982-09-10',
    'info@atlasindustrie.ma',
    '+212-602-334455',
    'Industrie',
    'RC654321',
    'Atlas Industrie',
    'Maroc',
    '+212-522-666777',
    'Karim',
    '+212-522-888999',
    'Fassi',
    'SA',
    'Married',
    'Moroccan',
    'Ingénieur',
    'karim.fassi@gmail.com',
    '+212-663-999000',
    '2029-05-20',
    'MA3456789',
    'CIN',
    'CUSTOMER_PP',
    'M.'
);

-- 4. Cliente professionnelle libérale
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1988-11-02',
    'nadia.karrouch@avocat.ma',
    '+212-603-445566',
    'Droit',
    'RC987654',
    'Cabinet Karrouch',
    'Maroc',
    '+212-522-101010',
    'Nadia',
    '+212-522-202020',
    'Karrouch',
    'SARL',
    'Divorced',
    'Moroccan',
    'Avocate',
    'nadia.karrouch@gmail.com',
    '+212-664-111222',
    '2031-09-01',
    'MA9988776',
    'CIN',
    'CUSTOMER_PP',
    'Mme'
);

-- 5. Société import/export
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1975-07-19',
    'contact@maghreb-trading.ma',
    '+212-604-556677',
    'Import/Export',
    'RC112233',
    'Maghreb Trading SARL',
    'Maroc',
    '+212-522-303030',
    'Abdelkader',
    '+212-522-404040',
    'Ouazzani',
    'SARL',
    'Married',
    'Moroccan',
    'Commerçant',
    'abdelkader.ouazzani@gmail.com',
    '+212-665-333444',
    '2027-03-12',
    'MA5544332',
    'CIN',
    'CUSTOMER_PP',
    'M.'
);
-- 6. Société de BTP
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1983-04-07',
    'contact@casabtp.ma',
    '+212-605-667788',
    'BTP',
    'RC445566',
    'Casa BTP SARL',
    'Maroc',
    '+212-522-505050',
    'Rachid',
    '+212-522-606060',
    'Mansouri',
    'SARL',
    'Married',
    'Moroccan',
    'Ingénieur en génie civil',
    'rachid.mansouri@gmail.com',
    '+212-666-111333',
    '2029-08-22',
    'MA2233445',
    'CIN',
    'CUSTOMER_PP',
    'M.'
);

-- 7. Profession libérale (médecin)
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1979-12-18',
    'dr.houda.elalami@medecin.ma',
    '+212-606-778899',
    'Santé',
    'RC778899',
    'Cabinet Médical El Alami',
    'Maroc',
    '+212-522-707070',
    'Houda',
    '+212-522-808080',
    'El Alami',
    'Profession libérale',
    'Married',
    'Moroccan',
    'Médecin généraliste',
    'houda.elalami@gmail.com',
    '+212-667-222555',
    '2032-04-05',
    'MA6677889',
    'CIN',
    'CUSTOMER_PP',
    'Dr.'
);

-- 8. Société d’informatique
INSERT INTO public.thirdparty (
    birth_date, business_email, business_phone, business_sector, commercial_register, company_name,
    country_of_residence, fax_number, first_name, land_line_phone, last_name, legal_form, marital_status,
    nationality, occupation, personal_email, private_phone, supporting_document_expiration_date,
    supporting_document_number, supporting_document_type, tiers_type, title
) VALUES (
    '1992-02-14',
    'info@digitalmaroc.ma',
    '+212-607-889900',
    'Technologies de l’information',
    'RC991122',
    'Digital Maroc Solutions',
    'Maroc',
    '+212-522-909090',
    'Omar',
    '+212-522-111000',
    'Boukhriss',
    'SARL',
    'Single',
    'Moroccan',
    'Développeur Full Stack',
    'omar.boukhriss@gmail.com',
    '+212-668-444777',
    '2028-11-11',
    'MA8899001',
    'CIN',
    'CUSTOMER_PP',
    'M.'
);

select * from thirdparty;



-- cases
select * from collect_case;

INSERT INTO public.collect_case (
    case_id,
    commission_amount,
    interest_amount,
    penalty_amount,
    principal_amount,
    start_date,
    total_amount,
    user_id,
    procedure_id,
    status_id,
    thirdparty_id
) VALUES 
    ('CASE1002', 1600.00, 110.00, 60.00, 11000.00, '2024-01-02', 12030.00, 5, 2, 4, 5),
    ('CASE1003', 1700.00, 120.00, 70.00, 12000.00, '2024-01-03', 13160.00, 5, 3, 5, 6),
    ('CASE1004', 1800.00, 130.00, 80.00, 13000.00, '2024-01-04', 15290.00, 5, 4, 6, 7),
    ('CASE1005', 1900.00, 140.00, 90.00, 14000.00, '2024-01-05', 16420.00, 5, 5, 7, 8),
    ('CASE1006', 2000.00, 150.00, 100.00, 15000.00, '2024-01-06', 17550.00, 5, 6, 8,8),
    ('CASE1007', 2100.00, 160.00, 110.00, 16000.00, '2024-01-07', 18680.00, 5, 7, 8, 8),
    ('CASE1008', 2200.00, 170.00, 120.00, 17000.00, '2024-01-08', 19810.00, 5, 8, 1, 8),
    ('CASE1009', 2300.00, 180.00, 130.00, 18000.00, '2024-01-09', 20940.00, 5, 9, 1, 8),
    ('CASE1010', 2400.00, 190.00, 140.00, 19000.00, '2024-01-10', 22070.00, 5, 1, 2, 8),
    ('CASE1011', 2500.00, 200.00, 150.00, 20000.00, '2024-01-11', 23200.00, 5, 1, 3, 8),
    ('CASE1012', 2600.00, 210.00, 160.00, 21000.00, '2024-01-12', 24330.00, 5, 2, 4, 8),
    ('CASE1013', 2700.00, 220.00, 170.00, 22000.00, '2024-01-13', 25460.00, 5, 3, 5, 8),
    ('CASE1014', 2800.00, 230.00, 180.00, 23000.00, '2024-01-14', 26590.00, 5, 4, 6, 8),
    ('CASE1015', 2900.00, 240.00, 190.00, 24000.00, '2024-01-15', 27720.00, 5, 5, 7, 8),
    ('CASE1016', 3000.00, 250.00, 200.00, 25000.00, '2024-01-16', 28850.00, 5, 6, 8, 8),
    ('CASE1017', 3100.00, 260.00, 210.00, 26000.00, '2024-01-17', 29980.00, 5, 7, 2, 8),
    ('CASE1041', 2400.00, 150.00, 100.00, 13000.00, '2024-01-21', 15550.00, 5, 5, 3, 4),
    ('CASE1042', 6600.00, 150.00, 100.00, 13000.00, '2024-01-22', 15550.00, 5, 6, 4, 5),
    ('CASE1043', 2700.00, 150.00, 100.00, 13000.00, '2024-01-23', 15550.00, 5, 7, 5, 6),
    ('CASE1044', 5500.00, 150.00, 100.00, 13000.00, '2024-01-24', 15550.00, 5, 8, 6, 7),
    ('CASE1046', 5600.00, 150.00, 100.00, 13000.00, '2024-01-26', 15550.00, 5, 5, 8, 9),
    ('CASE1047', 21900.00, 150.00, 100.00, 13000.00, '2024-01-27', 15550.00,5, 8, 2, 10),
    ('CASE1048', 9900.00, 150.00, 100.00, 13000.00, '2024-01-28', 15550.00, 5, 4, 5, 11),
    ('CASE1049', 1100.00, 150.00, 100.00, 13000.00, '2024-01-29', 15550.00, 5, 5, 1, 2),
    ('CASE1050', 3100.00, 150.00, 100.00, 13000.00, '2024-01-10', 15550.00, 5, 2, 2, 3),
    ('CASE1051', 2100.00, 160.00, 110.00, 13000.00, '2024-02-10', 15690.00, 5, 2, 3, 4),
    ('CASE1052', 2200.00, 170.00, 120.00, 13000.00, '2024-02-11', 15830.00, 5, 3, 4, 5),
    ('CASE1053', 2300.00, 180.00, 130.00, 13000.00, '2024-02-12', 15970.00, 5, 4, 5, 6),
    ('CASE1054', 2400.00, 190.00, 140.00, 13000.00, '2024-02-13', 16110.00, 5, 5, 6, 7),
    ('CASE1055', 2500.00, 200.00, 150.00, 13000.00, '2024-02-14', 16250.00, 5, 6, 7, 8),
    ('CASE1056', 2600.00, 210.00, 160.00, 13000.00, '2024-02-15', 16390.00, 5, 7, 8, 9),
    ('CASE1057', 2700.00, 220.00, 170.00, 13000.00, '2024-02-16', 16530.00, 5, 8, 2, 10),
    ('CASE1058', 2800.00, 230.00, 180.00, 13000.00, '2024-02-17', 16670.00, 5, 9, 5, 1),
    ('CASE1059', 2900.00, 240.00, 190.00, 13000.00, '2024-02-18', 16810.00, 5, 2, 1, 2),
    ('CASE1060', 3000.00, 250.00, 200.00, 13000.00, '2024-02-19', 16950.00, 5, 1, 2, 11);
INSERT INTO public.collect_case (
    case_id,
    commission_amount,
    interest_amount,
    penalty_amount,
    principal_amount,
    start_date,
    total_amount,
    user_id,
    procedure_id,
    status_id,
    thirdparty_id
) VALUES 
    ('CASE1001', 1500.00, 100.00, 50.00, 10000.00, '2024-01-01', 11650.00, 1, 1, 1, 1),
    ('CASE1002', 1600.00, 110.00, 60.00, 11000.00, '2024-01-02', 12030.00, 2, 2, 2, 2),
    ('CASE1003', 1700.00, 120.00, 70.00, 12000.00, '2024-01-03', 13160.00, 3, 3, 3, 3),
    ('CASE1004', 1800.00, 130.00, 80.00, 13000.00, '2024-01-04', 14290.00, 4, 4, 4, 4),
    ('CASE1005', 1900.00, 140.00, 90.00, 14000.00, '2024-01-05', 15430.00, 2, 5, 5, 5),
    ('CASE1006', 2000.00, 150.00, 100.00, 15000.00, '2024-01-06', 16550.00, 2, 6, 6, 6),
    ('CASE1007', 2100.00, 160.00, 110.00, 16000.00, '2024-01-07', 17670.00, 2, 7, 7, 7),
    ('CASE1008', 2200.00, 170.00, 120.00, 17000.00, '2024-01-08', 18790.00, 2, 8, 8, 8);


select * from collect_case;


-- contract
INSERT INTO public.contract (contract_id, created_on, thirdparty_id)
VALUES 
('CON123', '2024-05-02 10:00:00', 1),
('CON789', '2024-06-01 13:00:00', 2),
('CON456', '2024-04-01 09:00:00', 3),
('CON111', '2024-07-15 11:30:00', 4),
('CON222', '2024-01-15 10:30:00', 5),
('CON333', '2024-02-10 09:00:00', 6),
('CON444', '2024-03-05 15:00:00', 7),
('CON555', '2024-04-01 09:30:00', 8);


-- credit 
INSERT INTO public.credit (id, agency, constant_installment_amount, credit_id, credit_status, credit_type, cumulative_disbursement, cumulative_redemption_amount, deferred_type, first_installment_date, installment_count, insurance_amount, last_redemption_date, last_status_date, manager, modification_date, nominal_amount, nominal_rate, opening_date, rate_nature, restructured, restructuring_count, setup_date, triggered_installment_number, unpaid_amount, contract_id, thirdparty_id)
VALUES 
(1,'Example Agency', 1000.00, 'ABC123', 'Active', 'Personal Loan', 50000.00, 0.00, 'Deferred', '2024-05-01', 12, 50.00, NULL, '2024-05-01', 'John Doe', '2024-05-02', 50000.00, 5.5, '2024-04-01', 'Fixed', FALSE, 0, '2024-04-01', 1, 5000.00, 1, 1);
(2, 'BMCE Casablanca', 1200.00, 'CRD001', 'Active', 'Personal Loan',
  50000.00, 10000.00, 'Deferred', '2024-05-01',
  24, 200.00, '2024-08-01', '2024-08-01', 'John Doe',
  '2024-08-02', 50000.00, 5.5, '2024-04-01', 'Fixed',
  FALSE, 0, '2024-04-01', 5,
  4000.00, 1, 1),

(3, 'Attijari Rabat', 800.00, 'CRD002', 'Active', 'Car Loan',
  30000.00, 5000.00, 'Deferred', '2024-07-01',
  36, 150.00, '2024-08-15', '2024-08-15', 'Sarah Benali',
  '2024-08-16', 30000.00, 6.0, '2024-06-01', 'Variable',
  FALSE, 0, '2024-06-01', 2,
  2000.00, 2, 2),

(4, 'CIH Marrakech', 2000.00, 'CRD003', 'Overdue', 'Mortgage',
  200000.00, 50000.00, 'None', '2024-08-01',
  120, 500.00, '2024-08-10', '2024-08-10', 'Karim Lahlou',
  '2024-08-11', 200000.00, 4.8, '2024-07-15', 'Fixed',
  TRUE, 1, '2024-07-15', 1,
  15000.00, 3, 3),
(5, 'AG001', 1200.00, 'CRD001', 'ACTIVE', 'PERSONAL', 20000.00, 4800.00, 'NONE', '2024-01-15',
 24, 150.00, NULL, '2024-02-15', 'MNG001', '2024-02-16', 20000.00, 5.5, '2024-01-01', 'FIXED',
 FALSE, 0, '2024-01-10', 2, 1200.00, 1001, 501),

(6, 'AG002', 1500.00, 'CRD002', 'ACTIVE', 'MORTGAGE', 50000.00, 7500.00, 'NONE', '2024-02-10',
 36, 200.00, NULL, '2024-03-10', 'MNG002', '2024-03-12', 50000.00, 4.0, '2024-02-01', 'VARIABLE',
 FALSE, 0, '2024-02-05', 1, 1500.00, 1002, 502),

(7, 'AG003', 800.00, 'CRD003', 'LATE', 'AUTO', 10000.00, 1600.00, 'NONE', '2024-03-05',
 12, 100.00, NULL, '2024-04-05', 'MNG003', '2024-04-06', 10000.00, 6.2, '2024-03-01', 'FIXED',
 FALSE, 0, '2024-03-02', 2, 1600.00, 1003, 503),

(8, 'AG004', 2000.00, 'CRD004', 'ACTIVE', 'BUSINESS', 100000.00, 6000.00, 'NONE', '2024-04-01',
 48, 500.00, NULL, '2024-05-01', 'MNG004', '2024-05-02', 100000.00, 3.8, '2024-04-01', 'FIXED',
 FALSE, 0, '2024-04-01', 1, 2000.00, 1004, 504);
 INSERT INTO public.credit (
    id, agency, constant_installment_amount, credit_id, credit_status, credit_type, 
    cumulative_disbursement, cumulative_redemption_amount, deferred_type, first_installment_date, 
    installment_count, insurance_amount, last_redemption_date, last_status_date, manager, 
    modification_date, nominal_amount, nominal_rate, opening_date, rate_nature, restructured, 
    restructuring_count, setup_date, triggered_installment_number, unpaid_amount, contract_id, thirdparty_id
) VALUES
(1, 'Casablanca', 1200.00, 'CREDIT1001', 'Active', 'Personal', 10000.00, 0.00, 'None', '2024-02-01', 10, 150.00, NULL, '2024-01-01', 'Ahmed El Idrissi', '2024-01-01', 10000.00, 5.5, '2024-01-01', 'Fixed', FALSE, 0, '2024-01-01', 0, 10000.00, 'CONTRACT1001', 1),
(2, 'Rabat', 1300.00, 'CREDIT1002', 'Active', 'Personal', 11000.00, 0.00, 'None', '2024-02-02', 10, 160.00, NULL, '2024-01-02', 'Fatima Zahra', '2024-01-02', 11000.00, 5.5, '2024-01-02', 'Fixed', FALSE, 0, '2024-01-02', 0, 11000.00, 'CONTRACT1002', 2),
(3, 'Casablanca', 1400.00, 'CREDIT1003', 'Active', 'Business', 12000.00, 0.00, 'None', '2024-02-03', 12, 170.00, NULL, '2024-01-03', 'Karim Fassi', '2024-01-03', 12000.00, 6.0, '2024-01-03', 'Fixed', FALSE, 0, '2024-01-03', 0, 12000.00, 'CONTRACT1003', 3),
(4, 'Marrakech', 1500.00, 'CREDIT1004', 'Active', 'Business', 13000.00, 0.00, 'None', '2024-02-04', 12, 180.00, NULL, '2024-01-04', 'Nadia Karrouch', '2024-01-04', 13000.00, 6.0, '2024-01-04', 'Fixed', FALSE, 0, '2024-01-04', 0, 13000.00, 'CONTRACT1004', 4),
(5, 'Fes', 1600.00, 'CREDIT1005', 'Active', 'Personal', 14000.00, 0.00, 'None', '2024-02-05', 10, 190.00, NULL, '2024-01-05', 'Abdelkader Ouazzani', '2024-01-05', 14000.00, 5.5, '2024-01-05', 'Fixed', FALSE, 0, '2024-01-05', 0, 14000.00, 'CONTRACT1005', 5),
(6, 'Tangier', 1700.00, 'CREDIT1006', 'Active', 'Business', 15000.00, 0.00, 'None', '2024-02-06', 12, 200.00, NULL, '2024-01-06', 'Rachid Mansouri', '2024-01-06', 15000.00, 6.0, '2024-01-06', 'Fixed', FALSE, 0, '2024-01-06', 0, 15000.00, 'CONTRACT1006', 6),
(7, 'Agadir', 1800.00, 'CREDIT1007', 'Active', 'Personal', 16000.00, 0.00, 'None', '2024-02-07', 10, 210.00, NULL, '2024-01-07', 'Houda El Alami', '2024-01-07', 16000.00, 5.5, '2024-01-07', 'Fixed', FALSE, 0, '2024-01-07', 0, 16000.00, 'CONTRACT1007', 7),
(8, 'Casablanca', 1900.00, 'CREDIT1008', 'Active', 'Business', 17000.00, 0.00, 'None', '2024-02-08', 12, 220.00, NULL, '2024-01-08', 'Omar Boukhriss', '2024-01-08', 17000.00, 6.0, '2024-01-08', 'Fixed', FALSE, 0, '2024-01-08', 0, 17000.00, 'CONTRACT1008', 8);

-- guarantees code that creates tow guarantees for each type

INSERT INTO public.real_estate_guarantee (
    area,
    construction_description,
    land_registry_name,
    land_title_name,
    land_title_number,
    loan_amount,
    owner_address,
    owner_first_name,
    owner_last_name,
    owner_nationalid,
    property_name,
    purchase_deed,
    rank,
    registration_date,
    type,
    credit_id
) VALUES 
(
    250.75,  -- Area
    'Single-family home with backyard and pool',  -- Construction description
    'Metropolitan Land Registry',  -- Land registry name
    'Sunny Acres',  -- Land title name
    'LTN123456789',  -- Land title number
    350000.00,  -- Loan amount
    '123 Main Street, Pleasantville',  -- Owner address
    'Alice',  -- Owner first name
    'Smith',  -- Owner last name
    'ABC123XYZ',  -- Owner national ID
    'Sunnyvale Villa',  -- Property name
    'Deed of Sale',  -- Purchase deed
    'First',  -- Rank
    '2023-08-15',  -- Registration date
    'RealEstate',  -- Type
    1  -- Credit ID
),
(
    180.25,  -- Area
    'Modern apartment with city view',  -- Construction description
    'Urban Land Registry',  -- Land registry name
    'City Heights',  -- Land title name
    'LTN987654321',  -- Land title number
    200000.00,  -- Loan amount
    '456 Elm Street, Metro City',  -- Owner address
    'Bob',  -- Owner first name
    'Johnson',  -- Owner last name
    'DEF456UVW',  -- Owner national ID
    'Cityview Condos',  -- Property name
    'Sales Agreement',  -- Purchase deed
    'Second',  -- Rank
    '2023-10-20',  -- Registration date
    'RealEstate',  -- Type
    1  -- Credit ID
);

----------
INSERT INTO public.mortgage_guarantee (
    constructions_description,
    land_registry_office_name,
    land_title_name,
    land_title_number,
    mortgage_loan_amount,
    mortgage_rank,
    mortgage_status,
    mortgaged_property_area,
    mortgaged_property_name,
    nationalidcard_number,
    owner_address,
    owner_full_name,
    registration_date,
    type,
    credit_id
) VALUES 
(
    'Detached house with backyard',
    'Metropolitan Land Registry',
    'Sunny Acres',
    'LTN123456789',
    300000.00,
    'First',
    'Active',
    350.50,
    'Sunnyvale Villa',
    'ABC123XYZ',
    '123 Main Street, Pleasantville',
    'Alice Smith',
    '2023-09-10',
    'Mortgage',
    1
),
(
    'City apartment with view',
    'Urban Land Registry',
    'City Heights',
    'LTN987654321',
    200000.00,
    'Second',
    'Active',
    180.75,
    'Cityview Condos',
    'DEF456UVW',
    '456 Elm Street, Metro City',
    'Bob Johnson',
    '2023-10-15',
    'Mortgage',
    1
);


------
INSERT INTO public.personal_guarantee (
    activity_seniority,
    guarantor_activity,
    guarantor_employer,
    guarantor_first_name,
    guarantoridexpiration_date,
    guarantor_last_name,
    guarantor_monthly_income,
    guarantor_nationalid,
    guarantor_phone_number,
    guarantor_professional_address,
    guarantor_residence_address,
    guarantor_residual_income,
    relationship_with_client,
    total_outstanding_installments,
    type,
    credit_id
) VALUES 
(
    5,
    'Consultant',
    'XYZ Corporation',
    'John',
    '2025-05-31',
    'Doe',
    5000.00,
    'ABC123XYZ',
    '1234567890',
    '456 Elm Street, Metro City',
    '123 Main Street, Pleasantville',
    2500.00,
    'Client',
    2000.00,
    'Personal',
    1
),
(
    3,
    'Engineer',
    'ABC Ltd',
    'Jane',
    '2026-03-15',
    'Smith',
    6000.00,
    'DEF456ABC',
    '9876543210',
    '789 Oak Street, Tech Town',
    '456 Pine Street, Serene City',
    3000.00,
    'Customer',
    1500.00,
    'Personal',
    1
);


------------
INSERT INTO public.business_fund_guarantee (
    commerce_registry_city,
    commerce_registry_number,
    corporate_name,
    manager_full_name,
    manager_nationalidcard,
    owner_full_name,
    pledge_expiration_date,
    pledge_rank,
    pledge_realization_date,
    social_capital,
    trade_name,
    type,
    credit_id
) VALUES 
(
    'New York',
    '123-456-789',
    'ABC Inc.',
    'John Smith',
    'A123456789',
    'Jane Doe',
    '2025-12-31',
    'First Rank',
    '2022-05-01',
    1000000.00,
    'ABC Trade',
    'BusinessFund',
    1
),
(
    'Los Angeles',
    '987-654-321',
    'XYZ Corporation',
    'Alice Johnson',
    'B987654321',
    'Bob Smith',
    '2026-10-15',
    'Second Rank',
    '2023-01-01',
    1500000.00,
    'XYZ Trade',
    'BusinessFund',
    1
);

-----------------
INSERT INTO public.vehicle_guarantee (
    fiscal_horsepower,
    fuel_type,
    model_year,
    registration_number,
    vehicle_brand,
    type,
    credit_id
) VALUES 
(
    150,
    'Gasoline',
    2019,
    'ABC123',
    'Toyota',
    'Car',
    1
),
(
    120,
    'Diesel',
    2018,
    'XYZ456',
    'Ford',
    'Truck',
    1
);

