CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(256) NOT NULL UNIQUE,
	username VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(256),
	role ENUM('teacher', 'student', 'admin') NOT NULL
);

INSERT INTO users (email, username, password, role) VALUES ('admin@admin.com', 'admin', '$2a$10$PDqvE.fw2mZtKtACR4MEh.LsYLX1vIHxghDspVYrJxUoY2p.iV5OK', 'admin');
INSERT INTO users (email, username, password, role) VALUES ('beekaysbr@gmail.com', 'beekaysbr', '$2a$04$xQWh79OsOFVgpnkfD.rQQuC5dhp3GpV.kQ3DHpKGBjkSr9q65KGRS', 'student');
INSERT INTO users (email, username, password, role) VALUES ('teacher@webmd.com', 'teacher', '$2a$04$XY59uXAqVRJmzLLYB.TwCe4yZDEPEAoiBHgYAOBGsi4BEYC3cGI7m', 'teacher');
INSERT INTO users (email, username, password, role) VALUES ('lskalls2@arstechnica.com', 'slockey2', '$2a$04$2GT2frF0kHKaXGhuwY2a8.hKSc0BhIYDaidpofnPDtdeijVuN6v5e', 'student');
INSERT INTO users (email, username, password, role) VALUES ('ldeex3@globo.com', 'gmcglynn3', '$2a$04$OdCFx4XHqcThX5Wfn9r8veCoUs9ckdjpoTPCyvO5CfiEnFcLc7sAe', 'teacher');
INSERT INTO users (email, username, password, role) VALUES ('kcollelton4@bluehost.com', 'jfenby4', '$2a$04$VnwytisH9J35lnO1dCnx0OhP.mfYP9vEXCjcX74Qe.D8vBZyWMqLW', 'teacher');
INSERT INTO users (email, username, password, role) VALUES ('sparkhouse5@deviantart.com', 'bdonaghie5', '$2a$04$QbbZ0FEgcsObJp4WTkjGpu0qXTEIQoi4Jbt/P5ybEugKZgCi5rFdu', 'student');
INSERT INTO users (email, username, password, role) VALUES ('rkimber6@aol.com', 'tpoplee6', '$2a$04$aOyew/CSwRutlHfbGV3iA.8qU52Vb6EdyMYLMhSkSNnru9sb1D.D2', 'student');
INSERT INTO users (email, username, password, role) VALUES ('obampforth8@forbes.com', 'jleffek8', '$2a$04$Oj.aI8wzvWL78kCHpydxTeSatyYeFM/xrVWLi4aAoZJn3KFqWZ5va', 'teacher');
INSERT INTO users (email, username, password, role) VALUES ('cverick9@istockphoto.com', 'eborrowman9', '$2a$04$dcL6SHmaXt19eEbQq/v80uFcotvXRAyO444V64spYdn7ZwwixE9xG', 'student');
INSERT INTO users (email, username, password, role) VALUES ('bfidoea@irs.gov', 'eofihilliea', '$2a$04$eB0f28nCuOlM8P74oCKUa.jP1On.oiYZAY.YdrSjDvkMoKLces/IS', 'student');
INSERT INTO users (email, username, password, role) VALUES ('enormadellb@tmall.com', 'schessonb', '$2a$04$4EU0dQYqqvcN7Ld5VtnaduxyizT4WUOrDKRPme/nE6V3NyfmUSUyC', 'teacher');
INSERT INTO users (email, username, password, role) VALUES ('tnanglec@digg.com', 'csurmanwellsc', '$2a$04$ogqdbGRqD1cPRXzhmyABu.C8Q9Cc030i57C88sM6h.PSx3bu57gkG', 'student');
INSERT INTO users (email, username, password, role) VALUES ('jtrenchd@imageshack.us', 'lcunninghamd', '$2a$04$9Gez1Dl2Ba0UtQOsSjSn0ekeOWtzfQ5WfAsukWh0tdF0sIY3WSE16', 'student');
INSERT INTO users (email, username, password, role) VALUES ('tsineye@fotki.com', 'ycostleye', '$2a$04$sXhZLk3//ZBkjJvYdnpo2ek.JfxAkucZBIJtKw3uFAKNVqJzAiFfm', 'student');
INSERT INTO users (email, username, password, role) VALUES ('gburnallf@mapquest.com', 'rcastlesf', '$2a$04$93NMIzDRDAD9DKKmdUVqPufjG5uH3SNnON1cwPIjiaypPorJXJ/Bm', 'student');
INSERT INTO users (email, username, password, role) VALUES ('sgiamittig@lycos.com', 'rhelmg', '$2a$04$UZTJ1QqAx0T6PNRTlLNtku7kcj50ARFhUqh7ArAzmOvhlaOQenVtS', 'student');
INSERT INTO users (email, username, password, role) VALUES ('wshakesbyh@columbia.edu', 'dsooth', '$2a$04$nIyU2.VvrSbJ9PCHO5I/8eo/taGNFaCbhmFx6ePKyL0N5kQbEs0hK', 'student');
INSERT INTO users (email, username, password, role) VALUES ('kjigglei@devhub.com', 'bjaxoni', '$2a$04$AD7mOjMDXP6qkwRlkYB2HOumPUPfuvGzAKmqgL85jxnEdqMU0fENS', 'teacher');
INSERT INTO users (email, username, password, role) VALUES ('abenitj@constantcontact.com', 'gpoupardj', '$2a$04$5nbZM1R8SoTgXH6bg0/yQu3TZyaCQ1bUD/HHHrLf71E5nc3KvxN46', 'teacher');


CREATE TABLE IF NOT EXISTS assignments (
	id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
	description TEXT,
	dueDate DATE NOT NULL,
  createdBy INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (createdBy)
      REFERENCES users (id)
);

INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Suspendisse potenti.', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '2024-06-07', 2);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Proin at turpis a pede posuere nonummy.', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '2024-06-14', 18);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Donec semper sapien a libero.', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', '2024-06-14', 16);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Praesent blandit.', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', '2024-06-11', 15);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('In hac habitasse platea dictumst.', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', '2024-06-15', 19);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Nulla facilisi.', 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', '2024-06-12', 19);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Donec posuere metus vitae ipsum.', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', '2024-06-15', 18);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', '2024-06-11', 5);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Etiam justo.', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '2024-06-13', 2);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Vivamus in felis eu sapien cursus vestibulum.', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '2024-06-04', 5);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Fusce consequat.', 'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.', '2024-06-03', 18);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Nam dui.', 'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.', '2024-06-02', 15);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', '2024-06-08', 5);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', 'Phasellus in felis. Donec semper sapien a libero. Nam dui.', '2024-06-07', 8);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Duis mattis egestas metus.', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', '2024-05-27', 16);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Maecenas rhoncus aliquam lacus.', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '2024-05-31', 5);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Cras in purus eu magna vulputate luctus.', 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', '2024-06-04', 2);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('In eleifend quam a odio.', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', '2024-06-12', 2);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Etiam faucibus cursus urna.', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', '2024-05-27', 2);
INSERT INTO assignments (title, description, dueDate, createdBy) VALUES ('Pellentesque eget nunc.', 'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', '2024-06-11', 19);

--

CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
	assignmentId INT,
	studentId INT,
	submissionDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	content TEXT,
	grade INT,
	feedback TEXT,
  FOREIGN KEY (assignmentId)
        REFERENCES assignments (id) ON DELETE  SET NULL,
    FOREIGN KEY (studentId)
        REFERENCES users (id) ON DELETE  SET NULL
);
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (20, 3, '2024-06-07', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 72, 'eget tempus vel pede morbi');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (19, 4, '2024-06-14', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.', 31, 'congue etiam justo etiam');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (18, 7, '2024-06-14', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 20, 'odio consequat varius integer');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (17, 9, '2024-06-11', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 8, 'suspendisse potenti cras in purus eu');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (16, 6, '2024-06-15', 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 49, 'cras in purus eu');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (15, 20, '2024-06-12', 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 13, 'vestibulum ante ipsum primis in');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (14, 14, '2024-06-15', 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 24, 'non ligula pellentesque');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (13, 12, '2024-06-11', 'In congue. Etiam justo. Etiam pretium iaculis justo.', 39, 'purus eu magna vulputate luctus cum');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (12, 13, '2024-06-13', 'Fusce consequat. Nulla nisl. Nunc nisl.', 97, 'mauris eget massa tempor convallis');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (11, 11, '2024-06-04', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 50, 'odio condimentum id');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (10, 10, '2024-06-03', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 72, 'ante vivamus tortor duis mattis');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (9, 11, '2024-06-02', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 82, 'ut volutpat');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (8, 12, '2024-06-08', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 47, 'sit amet diam in');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (7, 9, '2024-06-07', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 7, 'ante ipsum primis in faucibus orci');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (6, 9, '2024-05-27', 'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 61, 'duis bibendum morbi non quam nec');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (5, 7, '2024-05-31', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 0, 'sit amet');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (4, 3, '2024-06-04', 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 17, 'eget massa tempor');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (3, 2, '2024-06-12', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 6, 'porttitor pede justo eu massa donec');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (2, 9, '2024-05-27', 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 30, 'morbi ut odio cras');
INSERT INTO submissions (assignmentId, studentId, submissionDate, content, grade, feedback) VALUES (1, 20, '2024-06-11', 'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.', 12, 'consequat varius integer');